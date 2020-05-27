import React from 'react';
import {
  // StyleSheet,
  View,
} from 'react-native';

import FavoriteKanji from '../components/FavoriteKanji';
import FormInputListKanji from './../components/FormInputListKanji'

export default class FavoriteKanjiScreen extends React.Component {
  static navigationOptions = {

    title: 'Kanji của bạn',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#006265',
    },
  };

  render() {
    return (
      <View>
        <FormInputListKanji/>
        <FavoriteKanji />
      </View>
    );
  }
}
