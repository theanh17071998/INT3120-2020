import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import KanjiFlashCard from '../components/KanjiFlashCard';

export default class KanjiFlashCards extends React.Component {
  static navigationOptions = () => ({
    title: 'Kanji cơ bản 1',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#006265',
    },
  });
  componentDidMount = () => {
    

  }

  render() {
    const { navigation } = this.props;
    const listKanji = navigation.getParam('listKanji');
    return (
      <ScrollView
        horizontal
      >
        <View style={styles.container}>
          {
            listKanji.map((kanji, i) => (<KanjiFlashCard key={i.toString()} kanji={kanji} />))
          }
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingRight: 14,
  },
});
