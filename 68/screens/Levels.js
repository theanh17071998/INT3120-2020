import React from 'react';
import {
  StyleSheet,
  FlatList,
  View
} from 'react-native';

import CategoryListItem from '../components/CategoryListItem';

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
      categories: [
        { id: 1, name: 'Sơ Cấp 1' },
        { id: 2, name: 'Sơ Cấp 2' },
        { id: 3, name: 'Tiền Trung Cấp 1' },
        { id: 4, name: 'Tiền Trung Cấp 2' },
        { id: 5, name: 'Kanji của bạn' }
      ]
    };
  }

  render() {
    const { navigation } = this.props;
    const { categories } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryListItem
              level={item}
              onPress={() => navigation.navigate('KanjiGroup', {
                kanjiGroupName: item.name,
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 30
  }
});
