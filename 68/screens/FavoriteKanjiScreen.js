import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import WordItem from '../components/WordItem';

import HearderInputListKanji from '../components/HearderInputListKanji';
import Provider, { Context } from './FavoriteKanjiScreen/context';


export default class FavoriteKanjiScreen extends React.Component {
  static navigationOptions = {
    title: 'Thêm nhóm kanji',
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
    const { navigation } = this.props;
    return (
      <Provider>
        <View style={styles.container}>
          <HearderInputListKanji />
          <View style={styles.listKanji}>
            <Context.Consumer>
              {({ stateListKanji }) => stateListKanji.map((kanji, index) => (
                <WordItem
                  key={index.toString()}
                  text={kanji.kanji}
                  object={kanji}
                  navigation={navigation}
                />
              ))}
            </Context.Consumer>
          </View>
        </View>
      </Provider>
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
});
