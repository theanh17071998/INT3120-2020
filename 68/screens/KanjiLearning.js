import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';

import menu from '../assets/menu.png';
import flashcard from '../assets/wallet.png';
import test from '../assets/test.png';
import challenge1 from '../assets/mission.png';
import challenge2 from '../assets/top.png';
import KanjiLearn from '../components/KanjiLearn';
import ProgressComponent from '../components/ProgressComponent';

const db = firebase.firestore();

export default class KanjiLearning extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('kanjiLearningName'),
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
      listKanji: [],
      isLoadding: true,
      images: [
        { id: 1, url: menu, name: 'Kanji chi tiết' },
        { id: 2, url: flashcard, name: 'Học với flashcards' },
        { id: 3, url: test, name: 'Luyện tập qua bài test' },
        { id: 4, url: challenge1, name: 'Thử thách kanji 1' },
        { id: 5, url: challenge2, name: 'Thử thách kanji 2' }
      ]
    };
  } 

  componentDidMount = () => {
    const { navigation } = this.props;
    const groupKanji = navigation.getParam('kanjiGroup');
    const listkanjiGetFireBase = groupKanji.listKanji.map((kanji) => db.collection('kanji').doc(kanji.id).get());
    Promise.all(listkanjiGetFireBase).then((lsKanji) => {
      this.setState({
        listKanji: lsKanji.map( listKanji => listKanji.data()),
        isLoadding: false,
      })
    });
  }

  ComponentIndicator = () => (
    <View style={[styles.containerIndicator, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )

  render() {
    const { images, listKanji, isLoadding } = this.state;
    const { navigation } = this.props;
    if (isLoadding)
      return( <this.ComponentIndicator />);
    return (
      <View>
        <View style={styles.persen}>
          <View style={{ width: '80%', marginTop: 20 }}>
            <ProgressComponent propsStyle={{
              bar: {
                height: 10,
                backgroundColor: 'rgb(0, 98, 101)',
              },
              progress: {
                width: `${90}%`,
                height: 10,
                backgroundColor: '#fff',
              }
            }}
            />
          </View>
          <Text style={styles.number}>90%</Text>
        </View>
        <View style={styles.container}>
          <KanjiLearn image={images[0]} onPress={() => navigation.navigate('KanjiGroupDetail', { listKanji })} />
          <KanjiLearn image={images[1]} onPress={() => navigation.navigate('KanjiFlashCards', { listKanji })} />
          <KanjiLearn image={images[2]} onPress={() => navigation.navigate('KanjiTests', { listKanji })} />
          <KanjiLearn image={images[3]} onPress={() => navigation.navigate('KanjiChallenge1', { listKanji })} />
          <KanjiLearn image={images[4]} onPress={() => navigation.navigate('KanjiChallenge1', { listKanji })} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: '3%',
    marginHorizontal: 8
  },
  ImagePersen: {
    width: 13,
    height: 13,
    marginTop: 25,
  },
  persen: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    marginRight: 2,
    marginTop: 10,
    color: '#006265',
    fontSize: 16
  },
  loadBar: {
    marginTop: '0%',
    marginLeft: '23%',
    width: 190,
    height: 16,
    borderRadius: 15,
  },
  containerIndicator: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
