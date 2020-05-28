/* eslint-disable no-console */
import React from 'react';
import {
  Image,
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import rightArrow from '../assets/right-arrow.png';
import imgEdit from '../assets/edit.png';
import FavoriteKanji from './FavoriteKanji';
import { Context } from '../screens/FavoriteKanjiScreen/context';


export default function HearderInputListKanji() {
  const ModalInputKanji = () => (
    <Context.Consumer>
      {
        ({ stateModal }) => (
          <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            visible={stateModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <KeyboardAwareScrollView style={{ backgroundColor: 'gray' }}>
              <View style={styles.modalView}>
                <FavoriteKanji />
              </View>
            </KeyboardAwareScrollView>
          </Modal>
        )
      }
    </Context.Consumer>
  );
  return (
    <Context.Consumer>
      {
      ({ stateNameKanjiGroup, setNameKanjiGroup, setStateModal }) => (
        <View style={styles.header}>
          <ModalInputKanji />
          <View style={styles.title}>


            <TextInput
              style={styles.input}
              placeholder="Nhập tên nhóm kanji"
              value={stateNameKanjiGroup}
              onChangeText={(value) => setNameKanjiGroup(value)}
            />


          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setStateModal(true);
            }}
          >
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
      )
      }
    </Context.Consumer>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  input: {
    color: '#006265',
    fontSize: 16,
  },
  title: {
    flex: 7,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});
