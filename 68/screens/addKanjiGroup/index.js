/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet, Button,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  // Dimensions
} from 'react-native';
import firebase from 'firebase';

import WordItem from '../../components/WordItem';

import ModalInputKanji from './component/FormFavoriteKanji';
import imgEdit from '../../assets/edit.png';
// import rightArrow from '../../assets/right-arrow.png';

const db = firebase.firestore();
// const deviceWidth = Dimensions.get('window').width;
// const screen = (percent) => (deviceWidth * percent) / 100;

export default class FavoriteKanjiScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') ? 'Cập nhật nhóm kanji' : 'Thêm nhóm kanji',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#006265',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      modeEdit: false,
      groupName: '',
      isModal: false,
      listKanji: [],
      lsKanjiDetail: [],
      currentData: undefined,
      index: -1,
      order: -1,
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    if (navigation.getParam('edit') === true && navigation.getParam('kanjiGroupData') !== undefined) {
      // console.log("edit banj owi");
      // const { kanjiId } = navigation.getParam('kanjiId');
      const kanjiGroup = navigation.getParam('kanjiGroupData');
      const listKanji = kanjiGroup.listKanji.map((kanji) => (
        db.collection('kanji').doc(kanji.id).get()
      ));

      Promise.all(listKanji).then((lsKanji) => {
        this.setState({
          modeEdit: true,
          groupName: kanjiGroup.groupName,
          listKanji: kanjiGroup.listKanji,
          author: kanjiGroup.author,
          lsKanjiDetail: lsKanji.map((kanji) => ({ ...kanji.data() })),
          index: kanjiGroup.index,
          order: kanjiGroup.order,
        });
      });
    }
  }

  setIsModal= (isModal) => {
    this.setState({ isModal });
  }

  addKanji = (kanji, kanjiDetail) => {
    const { listKanji, lsKanjiDetail, } = this.state;
    let id = '';
    db.collection('kanji').add(kanjiDetail).then((res) => {
      id = res.id;
      this.setState({
        listKanji: [...listKanji, { id, ...kanji }],
        lsKanjiDetail: [...lsKanjiDetail, kanjiDetail],
        isModal: false,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  editKanji = (kanji, KanjiDetail) => {
    const { listKanji, lsKanjiDetail, currentData } = this.state;
    db.collection('kanji').doc(listKanji[currentData.index].id).set({
      ...lsKanjiDetail[currentData.index], ...KanjiDetail
    }).then((res) => {
      console.log(res);
      this.setState({
        listKanji: [
          ...listKanji.slice(0, currentData.index),
          { ...listKanji[currentData.index], ...kanji },
          ...listKanji.slice(currentData.index + 1)
        ],
        lsKanjiDetail: [
          ...lsKanjiDetail.slice(0, currentData.index),
          { ...lsKanjiDetail[currentData.index], ...KanjiDetail },
          ...lsKanjiDetail.slice(currentData.index + 1)
        ],
        isModal: false,
      });
    })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteKanji = () => {
    const { listKanji, lsKanjiDetail, currentData } = this.state;
    console.log(currentData);
    db.collection('kanji').doc(listKanji[currentData.index].id).delete().then(() => {
      console.log('dele kanji');
      this.setState({
        listKanji: [
          ...listKanji.slice(0, currentData.index),
          ...listKanji.slice(currentData.index + 1)
        ],
        lsKanjiDetail: [
          ...lsKanjiDetail.slice(0, currentData.index),
          ...lsKanjiDetail.slice(currentData.index + 1),
        ],
        isModal: false,
      });
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  ApiAddKanjiGroup = () => {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId');
    const {
      listKanji, groupName,
    } = this.state;
    this.setState({ currentData: undefined });

    // const lsKanjiRef = lsKanjiDetail.map((kanjiDetail) =>
    //   db.collection('kanji').add(kanjiDetail));

    db.collection('kanjiGroups').add({
      groupName,
      author: userId,
      index: new Date().getTime(),
      order: new Date().getTime(),
      listKanji
    }).then((res) => {
      navigation.goBack();
      console.log(res.id);
    }).catch((err) => {
      console.log(err);
    });
  }

  ApiEditKanjiGroup = () => {
    const { navigation } = this.props;
    const kanjiGroupId = navigation.getParam('kanjiGroupId');
    // const userId = navigation.getParam('userId');
    const {
      listKanji, groupName, author, index, order
    } = this.state;
    console.log(`id ${kanjiGroupId}`);
    // const lsKanjiRef = lsKanjiDetail.map((kanjiDetail, i) =>
    //  (db.collection('kanji').doc(listKanji[i].id).set(kanjiDetail)));
    db.collection('kanjiGroups').doc(kanjiGroupId).set({
      groupName,
      listKanji,
      order,
      index,
      author,
    }).then(() => {
      console.log('Document successfully written! ');
    })
      .catch((err) => {
        console.log(err);
      });
  }

  openModalAddKanji = () => {
    this.setState({
      currentData: undefined,
      isModal: true,
    });
  }

  openModalEditKanji = (index) => {
    const { lsKanjiDetail } = this.state;
    this.setState({
      currentData: { ...lsKanjiDetail[index], message: 'Sửa chữ kanji', index },
      isModal: true,
    });
  }

  render() {
    // console.log(this.state.lsKanjiDetail);
    const {
      groupName, isModal, listKanji, lsKanjiDetail, currentData, modeEdit
    } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <ModalInputKanji
                currentData={currentData}
                isModal={isModal}
                setIsModal={this.setIsModal}
                addKanji={this.addKanji}
                addGroupKanji={this.addGroupKanji}
                editKanji={this.editKanji}
                deleteKanji={this.deleteKanji}
              />
              <View style={styles.title}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tên nhóm kanji"
                  value={groupName}
                  onChangeText={(value) => this.setState({ groupName: value })}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.openModalAddKanji}
              >
                <Image source={imgEdit} style={styles.editImage} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listItem}>
            {
              listKanji.map((kanji, index) => (
                <WordItem
                  // eslint-disable-next-line react/jsx-no-bind
                  onPress={this.openModalEditKanji.bind(this, index)}
                  key={index.toString()}
                  kanji={lsKanjiDetail[index]}
                  text={kanji.kanji.toString()}
                />
              ))
            }
          </View>

        </View>

        {
          modeEdit === true
            ? (
              <View style={styles.button}>
                <Button
                  onPress={this.ApiEditKanjiGroup}
                  title="Cập nhật"
                  color="#4267b2"
                />
              </View>
            ) : (
              <View style={styles.button}>
                <Button
                  onPress={this.ApiAddKanjiGroup}
                  title="Thêm nhóm kanji"
                  color="#4267b2"
                />
              </View>
            )
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginBottom: 12,
    borderWidth: 0,
    marginTop: 10
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    marginHorizontal: 8,
  },
  title: {
    flex: 7,
    fontSize: 16,
    color: '#006265'
  },
  rightArrowImage: {
    flex: 1,
    width: 20,
    height: 18,
    resizeMode: 'stretch',
  },
  editImage: {
    flex: 1,
    width: 20,
    height: 20,
    marginRight: 20,
    resizeMode: 'stretch',
  },
  input: {
    color: '#006265',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8
  },
});
