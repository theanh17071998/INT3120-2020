/* eslint-disable no-console */
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import rightArrow from '../assets/right-arrow.png';
import imgEdit from '../assets/edit.png';
import WordItem from './WordItem';

export default function WordListItem(props) {
  const { kanji, isMyKanji } = props;
  // console.log(kanji);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{kanji ? kanji.item.groupName : 'Kanji'}</Text>
          {
            isMyKanji
              ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    const { navigation } = props;
                    const userId = navigation.getParam('userId');
                    console.log(kanji.item.id);
                    props.navigation.navigate('FavoriteKanjiScreen',
                      {
                        userId,
                        kanjiGroupId: kanji.item.id,
                        kanjiGroupData: kanji.item,
                        edit: true
                      });
                  }}
                >
                  <Image source={imgEdit} style={styles.editImage} />
                </TouchableOpacity>
              ) : <View />
          }
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate('KanjiLearning',
                {
                  kanjiGroup: kanji,
                  kanjiLearningName: kanji.groupName
                });
            }}
          >
            <Image source={rightArrow} style={styles.rightArrowImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          {
              kanji.item ? kanji.item.listKanji.map((object, index) => (
                <WordItem
                  onPress={() => {
                    props.navigation.navigate('KanjiDetail', { id: object.id });
                  }}
                  key={index.toString()}
                  text={object.kanji}
                />
              )) : <Text />
            }
        </View>
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
    borderRadius: 3,
    borderWidth: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8
  },
  title: {
    flex: 7,
    fontSize: 16,
    color: '#006265'
  },
  editImage: {
    flex: 1,
    width: 20,
    height: 20,
    marginRight: 20,
    resizeMode: 'stretch',
  },
  rightArrowImage: {
    flex: 1,
    width: 20,
    height: 18,
    resizeMode: 'stretch',
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
