/* eslint-disable no-throw-literal */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const heightScreen = (percent) => (percent * deviceHeight) / 100;
const screen = (percent) => (deviceWidth * percent) / 100;

export default function FormFavoriteKanji(props) {
  const [kanji, setKanji] = useState('');
  const [hanViet, setHanViet] = useState('');
  const [amOn, setAmOn] = useState('');
  const [amKun, setAmKun] = useState('');
  const [example, setExample] = useState('');
  const [current, setcurrent] = useState(undefined);

  const { isModal, setIsModal } = props;
  const reset = () => {
    setKanji('');
    setHanViet('');
    setAmOn('');
    setAmKun('');
    setExample('');
  };

  const { currentData } = props;
  if (current !== currentData) {
    setcurrent(currentData);
    if (currentData !== undefined) {
      setKanji(currentData.kanji);
      setHanViet(currentData.hanViet);
      setAmOn(currentData.amOn);
      setAmKun(currentData.amKun);
      setExample(currentData.example);
      setcurrent(currentData);
    } else {
      setcurrent(currentData);
    }
  }
  const { deleteKanji } = props;
  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      visible={isModal}
      onRequestClose={() => {
        Alert.alert('Thông Báo', 'Bạn thực sự không muốn lưu thay đổi của mình ?',
          [
            {
              text: 'Thoát',
              onPress: () => setIsModal(false),
              style: 'cancel'
            },
            {
              text: 'Ở lại',
              onPress: () => console.log('Cancel Pressed'),
            }
          ]);
      }}
    >
      <KeyboardAwareScrollView style={{ backgroundColor: 'gray' }}>

        <View style={styles.modal}>
          <Text style={styles.title}>{currentData === undefined ? 'Tạo kanji của riêng bạn' : currentData.message}</Text>
          <View style={styles.body}>
            <View style={styles.contentInput}>
              <Text style={styles.titleInput}>Hán tự</Text>
              <TextInput
                style={styles.textInput}
                // defaultValue={props.currentData.kanji}
                value={kanji}
                onChangeText={(value) => setKanji(value)}
                placeholder="Nhập hán tự của bạn"
              />
            </View>
            <View style={styles.contentInput}>
              <Text style={styles.titleInput}>Nghĩa Hán-Việt</Text>
              <TextInput
                style={styles.textInput}
                value={hanViet}
                onChangeText={(value) => setHanViet(value)}
                placeholder="Nhập nghĩa hán việt"
              />
            </View>
            <View style={styles.contentInput}>
              <Text style={styles.titleInput}>Âm on</Text>
              <TextInput
                style={styles.textInput}
                value={amOn}
                onChangeText={(value) => setAmOn(value)}
                placeholder="Nhập âm on ngăn cách nhau bởi dấu phẩy"
              />
            </View>
            <View style={styles.contentInput}>
              <Text style={styles.titleInput}>Âm kun</Text>
              <TextInput
                style={styles.textInput}
                value={amKun}
                onChangeText={(value) => setAmKun(value)}
                placeholder="Nhập âm kun ngăn cách nhau bởi dẩu phẩy"
              />
            </View>
            <View style={styles.contentInput}>
              <Text style={styles.titleInput}>Ví dụ cách sử dụng</Text>
              <TextInput
                multiline
                numberOfLines={4}
                value={example}
                onChangeText={(value) => setExample(value)}
                style={styles.textInput}
                placeholder="Ví dụ: chữ tiếng hán|nghĩa tiếng việt|chữ hiragana"
              />
            </View>
            <View style={{ marginTop: screen(1), flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button}>
                <Button
                  title="Lưu lại"
                  color="#006265"
                  raised
                  onPress={() => {
                    const exam = example.split('|');
                    let dataExam = {};
                    try {
                      if (kanji.length !== 1) throw 1;
                      if (exam === undefined) throw 1;
                      dataExam = {
                        ja: exam[0].concat().toLowerCase(),
                        vi: exam[1].concat().toLowerCase(),
                        hira: exam[2].concat().toLowerCase(),
                      };
                    } catch (err) {
                      const errMes = err === 1 ? 'Trường hán tự chỉ được chứa 1 kí tự chữ hán !' : 'Dữ liệu nhập vào trường ví dụ chưa hợp lệ! Xin vui lòng nhập lại.';
                      Alert.alert('Thông Báo', errMes,
                        [
                          {
                            text: 'OK',
                            onPress: () => console.log('Cancel Pressed'),
                          }
                        ]);
                      setExample('');
                      dataExam = {};
                      return;
                    }

                    if (current === undefined) {
                      props.addKanji({
                        kanji
                      },
                      {
                        kanji,
                        hanViet,
                        amOn,
                        amKun,
                        example,
                        exampleObj: dataExam,
                      });
                      reset();
                    } else {
                      props.editKanji({
                        kanji
                      },
                      {
                        kanji,
                        hanViet,
                        amOn,
                        amKun,
                        example,
                        exampleObj: dataExam,
                      });
                    }

                    // setIsModal(false);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Button
                  title="Hủy"
                  color="#000"
                  raised
                  onPress={() => {
                    Alert.alert('Thông Báo', 'Bạn thực sự không muốn lưu thay đổi của mình ?',
                      [
                        {
                          text: 'Thoát',
                          onPress: () => setIsModal(false),
                          style: 'cancel'
                        },
                        {
                          text: 'Ở lại',
                          onPress: () => console.log('Cancel Pressed'),
                        }
                      ]);
                  }}
                />
              </TouchableOpacity>
              {
                currentData === undefined ? <View /> : (
                  <TouchableOpacity style={styles.button}>
                    <Button
                      title="Xóa"
                      color="#fd6363"
                      raised
                      onPress={deleteKanji}
                    />
                  </TouchableOpacity>
                )
              }

            </View>
          </View>
        </View>

      </KeyboardAwareScrollView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    marginTop: heightScreen(5),
    height: heightScreen(90),
    width: screen(100),
  },
  container: {
    alignItems: 'center',

    elevation: 4,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 11,
    borderWidth: 0,
    flexDirection: 'row',
  },
  title: {
    backgroundColor: '#006265',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: heightScreen(7),
    margin: 20,
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: heightScreen(1),
  },
  body: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: heightScreen(75),
    margin: 20,
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 0,
    paddingTop: heightScreen(1),
    marginBottom: screen(2),
  },
  ImageChallenge: {
    width: 30,
    height: 30,
    marginLeft: '2%',
  },
  contentInput: {
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    color: '#006265',
    marginBottom: screen(3),
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
    flex: 1,
    marginTop: screen(2),
    // borderRadius: 40,
    marginHorizontal: '5%',
  },
});
