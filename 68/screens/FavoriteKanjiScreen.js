import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import WordItem from '../components/WordItem'; // dung o show list kanji

import HearderInputListKanji from '../components/HearderInputListKanji';

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

  constructor(props) {
    super(props);
    this.state = {
      nameKanjiGroup: '',
      listKanji: []
    };
  }

  render() {
    const { nameKanjiGroup, listKanji } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <HearderInputListKanji nameKanjiGroup={nameKanjiGroup} />
        <View style={styles.listKanji}>
          {
            listKanji.map((kanji, index) => (
              <WordItem
                key={index.toString()}
                text={kanji.kanji}
                object={kanji}
                navigation={navigation}
              />
            ))
          }
        </View>
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
});
