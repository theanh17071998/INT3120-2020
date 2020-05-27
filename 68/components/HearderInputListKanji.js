/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Image,
  Text,
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';
import rightArrow from '../assets/right-arrow.png';
import imgEdit from '../assets/edit.png';

export default function HearderInputListKanji() {
  const [isModalInput, setIsModalInput] = useState(false);
  const ModalInputKanji = () => (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      visible={isModalInput}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={{ backgroundColor: 'gray' }}>
        <View style={styles.modalView}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setIsModalInput(!isModalInput);
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
  return (
    <View style={styles.header}>
      <ModalInputKanji />
      <View style={styles.title}>
        <TextInput style={styles.input} placeholder="Nhập tên nhóm kanji" />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setIsModalInput(true);
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
