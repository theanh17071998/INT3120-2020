/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  YellowBox
} from 'react-native';
import rightArrow from '../assets/right-arrow.png';
import imgEdit from '../assets/edit.png';

import WordItem from './WordItem';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
console.disableYellowBox = true;
export default function FormInputListKanji(props) {
  const [isEditKanjiGroupName, setIsKanjiGroupName] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          {
                isEditKanjiGroupName ? <View><TextInput /></View> : <Text onPress={() => setIsKanjiGroupName(true)} style={styles.title}>kanji group name</Text>
          }


          <TouchableOpacity activeOpacity={0.5}>
            <Image source={imgEdit} style={styles.editImage} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
            }}
          >
            <Image source={rightArrow} style={styles.rightArrowImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          {/*
              kanji ? kanji.item.kanjiList.map((object, index) => (
                <WordItem
                  key={index.toString()}
                  text={object.kanji}
                  object={object}
                  navigation={props.navigation}
                />
              )) : <Text />*/
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginBottom: 12,
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
