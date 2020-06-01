import React from 'react';
import {
  StyleSheet,
  FlatList,
  View, 
  Dimensions
} from 'react-native';
import firebase from '../config/firebase';
import CategoryListItem from '../components/CategoryListItem';

const deviceWidth = Dimensions.get('window').width;
const screen = (percent) => ((deviceWidth * percent) / 100);


const db = firebase.firestore();
export default class Levels extends React.Component {
  static navigationOptions = {
    title: 'Chọn Level',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#006265',
    },
    headerTintColor: '#006265',
    //navigationOptions: { header: { visible: false } }
  };

  constructor(props) {
    super(props);
    this.state = {
      level: [
        // {
        //   id: '0',
        //   levelName: 'Sơ cấp 1',
        // },
        // {
        //   id: '1',
        //   levelName: 'Sơ cấp 1',
        // },
        // {
        //   id: '2',
        //   levelName: 'Tiền trung cấp 1',
        // },
        // {
        //   id: '3',
        //   levelName: 'Tiền trung cấp 1',
        // },
        // {
        //   id: '4',
        //   levelName: 'kanji của bạn',
        // },
      ]
    };
  }

  componentDidMount= async () => {
    const docRef = db.collection('level');
    const docDefault = docRef.where('author', '==', 'default').get();
    const docUser = docRef.where('author', '==', 'SOhMkuLepvX7dFbkXDZZ7oVzbYN2').get();
    const [
      levelDefault,
      levelUser
    ] = await Promise.all([docDefault, docUser]);
    this.setState({
      level: [...levelDefault.docs, ...levelUser.docs].map((result) => (result.data()))
    });
  }

  render() {
    const { navigation } = this.props;
    const { level } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={level}
          renderItem={({ item, index }) => (
            <CategoryListItem
              levelName={item.levelName}
              onPress={() => navigation.navigate('KanjiGroup', {
                levelName: item.levelName,
                myKanji: (index === 4)
              })}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={styles.container}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: screen(2),
    paddingRight: screen(2),
    paddingTop: screen(4.6)
  }
});
