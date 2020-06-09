/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import firebase from '../config/firebase';
import WordsListItem from '../components/WordListItem';

import imgProfile from '../assets/userProfile.png';
import imgAdd from '../assets/add.png';

// const { height } = Dimensions.get('window');

const db = firebase.firestore();
export default class kanjiGroup extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('levelName'),
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#006265',
    },
    headerRight: () => (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        {
          navigation.getParam('myKanji') ? (
            <TouchableOpacity onPress={() => {
              navigation.navigate('FavoriteKanjiScreen',
                {
                  userId: navigation.getParam('userId')
                });
            }}
            >
              <Image source={imgAdd} style={{ width: 30, height: 30, marginRight: 10 }} />
            </TouchableOpacity>
          ) : <View />
        }
        <TouchableOpacity onPress={() => { navigation.navigate('ProfileScreen'); }}>
          <Image source={imgProfile} style={{ width: 30, height: 30, marginRight: 10 }} />
        </TouchableOpacity>
      </View>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      lsGroup: []
    };
  }

  fetchAPI = () => {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId');
    const index = navigation.getParam('index');
    const query = db.collection('kanjiGroups').where('author', '==', index === 4 ? userId : index.toString());
    const lsGroup = [];
    query.get()
      .then((data) => {
        data.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          lsGroup.push({ id: doc.id, ...doc.data() });
          // console.log(doc.id, ' => ', doc.data());
        });
        lsGroup.sort((a, b) => (a.index - b.index));
        this.setState({ lsGroup });
      });
  }

  componentDidMount = async () => {
    this.fetchAPI();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchAPI();
      }
    );
  }
  componentWillUnmount = () => {
    this.willFocusSubscription.remove();
  }

  render() {
    const { navigation } = this.props;
    const { lsGroup } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={lsGroup}
            renderItem={(group, index) => (
              <WordsListItem
                kanjiGroup={group}
                navigation={navigation}
                isMyKanji={navigation.getParam('myKanji') === true}
              />
            )}
            keyExtractor={(group) => `${group.id}`}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
