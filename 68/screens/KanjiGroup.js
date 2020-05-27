/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import firebase from '../config/firebase';
import WordsListItem from '../components/WordListItem';

import imgProfile from '../assets/userProfile.png';
import imgAdd from '../assets/add.png';

const db = firebase.firestore();
export default class kanjiGroup extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('kanjiGroupName'),
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
            <TouchableOpacity onPress={() => { navigation.navigate('FavoriteKanjiScreen'); }}>
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

  componentDidMount = () => {
    const docRef = db.collection('kanjiProject').doc('data');
    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        this.setState({ lsGroup: data.kanjiGroup });
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  render() {
    const { navigation } = this.props;
    const { lsGroup } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={lsGroup}
          renderItem={(obj, index) => (
            <WordsListItem
              kanji={obj}
              key={index}
              navigation={navigation}
              isMyKanji={navigation.getParam('myKanji') === true}
            />
          )}
          keyExtractor={(obj, index) => `${index}`}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8
  },
});
