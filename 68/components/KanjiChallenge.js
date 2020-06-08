import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
 const screen = (percent) => deviceWidth * percent / 100;

function KanjiChallenge({
  kanji, isAnswer, setTrueQuestion, nextQuestion
}) {
  const [status, setStatus] = useState('default');
  const onPress = () => {
    if (isAnswer) {
      setStatus('blue');
      setTrueQuestion();
    } else {
      setStatus('red');
    }
    setTimeout(() => { setStatus('default'); nextQuestion(); }, 300);
  };
  console.log(kanji)
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles[status]}>
        <Text style={styles.text}>{kanji}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  red: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    height: screen(23*82/100),
    width: screen(23*82/100),
    backgroundColor: 'red',
    borderRadius: 3
  },
  blue: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    height: screen(23*82/100),
    width: screen(23*82/100),
    backgroundColor: 'blue',
    borderRadius: 3
  },
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    height: screen(23*82/100),
    width: screen(23*82/100),
    backgroundColor: 'white',
    borderRadius: 3
  },
  text: {
    color: '#006265',
    fontSize: 20,
  }
});
export default KanjiChallenge;
