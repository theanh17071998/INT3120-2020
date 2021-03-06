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
  };

  constructor(props) {
    super(props);
    this.state = {
      level: []
    };
  }

  componentDidMount= async () => {
    const docRef = db.collection('level');
    const { navigation } = this.props;
    const idGroup = navigation.getParam('author');
    const docDefault = docRef.where('author', '==', 'default').get();
    const docUser = docRef.where('author', '==', idGroup).get();
    const [
      levelDefault,
      levelUser
    ] = await Promise.all([docDefault, docUser]);
    this.setState({
      level: [...levelDefault.docs, ...levelUser.docs]
        .map((result) => ({ id: result.id, ...result.data() }))
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
                userId: item.id,
                index,
                myKanji: (index <= 4)
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
