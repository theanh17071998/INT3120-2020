import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';

import { Context } from '../screens/FavoriteKanjiScreen/context';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const heightScreen = (percent) => (percent * deviceHeight) / 100;

const screen = (percent) => (deviceWidth * percent) / 100;
export default function FavoriteKanji() {
  return (
    <View style={styles.modal}>
      <Text style={styles.title}>
        Tạo Kanji của riêng bạn
      </Text>
      <View style={styles.contentInput}>
        <Text style={styles.titleInput}>
          Hán tự
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập hán tự của bạn"
        />
      </View>
      <View style={styles.contentInput}>
        <Text style={styles.titleInput}>
          Nghĩa Hán-Việt
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập nghĩa hán việt"
        />
      </View>
      <View style={styles.contentInput}>
        <Text style={styles.titleInput}>
          Âm on
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập âm on"
        />
      </View>
      <View style={styles.contentInput}>
        <Text style={styles.titleInput}>
          Âm kun
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Nhập âm kun"
        />
      </View>
      <View style={styles.contentInput}>
        <Text style={styles.titleInput}>
          Ví dụ cách sử dụng
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.textInput}
          placeholder="Ví dụ"
        />
      </View>
      <View style={{ marginTop: screen(3), }}>
        <Context.Consumer>
          {
            ({ setStateModal, stateModal }) => (
              <>
                <TouchableOpacity
                  style={styles.button}
                >
                  <Button
                    title="Lưu lại"
                    color="#006265"
                    raised
                    onPress={() => {
                      setStateModal(!stateModal);
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Button
                    title="Hủy"
                    color="#fd6363"
                    raised
                    onPress={() => {
                      setStateModal(!stateModal);
                    }}
                  />
                </TouchableOpacity>
              </>
            )
        }
        </Context.Consumer>


      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    height: heightScreen(80),
    width: screen(100),
  },
  container: {
    alignItems: 'center',
    padding: 16,
    elevation: 4,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 11,
    borderWidth: 0,
    flexDirection: 'row',

  },
  title: {
    fontSize: 19,
    color: '#006265',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: screen(3),
    marginBottom: screen(5)
  },
  ImageChallenge: {
    width: 30,
    height: 30,
    marginLeft: '2%'
  },
  contentInput: {
    marginHorizontal: 40,
    color: '#006265',
    marginBottom: screen(3)
  },
  textInput: {
    borderColor: '#006265',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  titleInput: {
    color: '#006265',
    fontSize: 17,
    marginBottom: 3,
  },
  button: {
    marginTop: screen(1),
    width: screen(80),
    marginLeft: screen(10),
  }
});
