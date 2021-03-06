/* eslint-disable no-mixed-operators */
import * as React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

import Speaker from '../components/Speaker';
import KanjiPanel from '../components/KanjiPanel';

const db = firebase.firestore();

const deviceWidth = Dimensions.get('window').width;
const screen = (percent) => deviceWidth * percent / 100;
class DetailsScreen extends React.Component {
    static navigationOptions = () => ({
      title: 'Kanji cơ bản 1',
      headerTitleAlign: 'center',

      headerTitleStyle: {
        textAlign: 'center',
        color: 'white',
      },
      headerTintColor: 'white',
      headerStyle: {
        height: 100,
        backgroundColor: '#006265',
        borderBottomWidth: 0,
        elevation: 0,
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
    });

    constructor(props) {
      super(props);
      this.state = {
        kanjiDetail: {},
        isLoadding: true,
      };
    }

    componentDidMount = () => {
      const { navigation } = this.props;
      const id = navigation.getParam('id');
      db.collection('kanji').doc(id).get().then((kanji) => {
        this.setState({ kanjiDetail: kanji.data(), isLoadding:false });
	  });
    }

    ComponentIndicator = () => (
      <View style={[styles.containerIndicator, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )

    render() {
      const  { isLoadding } = this.state;
      const { exampleArray, listOn, listKun, amOnList, kanji, hanViet  } = this.state.kanjiDetail;
      console.log(exampleArray)
      if(isLoadding)
       return(
        <this.ComponentIndicator />
      );
      return (
        <ScrollView>
          <View style={styles.bottomHeader} />
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <KanjiPanel kanji={kanji}/>
            <View style={styles.KanjiPanelDetail}>
              <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <View>
                  <Text style={{ width: 80, color: 'red' }}>Âm Kun</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {
                    listKun.map((kunItem, index) => (
                      <View key={index.toString()}>
                        <Text style={styles.styleLabel}>{kunItem}</Text>
                      </View>
                    ))
                  }

                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <View>
                  <Text style={{ width: 80, color: 'red' }}>Âm On</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {
                    listOn.map((onItem, index) => (
                      <View key={index.toString()}>
                        <Text style={styles.styleLabel}>{onItem}</Text>
                      </View>
                    ))
                  }

                </View>
              </View>

              <View style={{ marginTop: 30, marginLeft: 10 }}>
                <View>
                  <Text style={{ color: 'red' }}>
                    Ví Dụ
                  </Text>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 10, }}>
                  {
                    exampleArray.map((exampleItem, index) => (
                      <View style={{ flex: 1, marginBottom: 10 }} key={index.toString()}>
                        <Text style={{ color: '#006265', fontSize: 12 }}>{exampleItem.hira}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                          <Text style={{ color: '#006265', flex: 6, fontSize: 30, height:40, lineHeight:36, paddingTop:0 }}>{exampleItem.ja}</Text>
                          <Text style={{ color: '#006265', flex: 8 }}>{exampleItem.vi}</Text>
                          <Speaker Text={exampleItem.ja} />

                        </View>
                      </View>
                    ))
                  }
                </View>

              </View>
            </View>
          </View>
        </ScrollView>

      );
    }
}

const styles = StyleSheet.create({
  bottomHeader: {
    backgroundColor: '#006265',
    height: 20,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',

  },

  centerAlighElement: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  KanjiPanelDetail: {
    width: '90%',
    marginTop: 20,
    paddingHorizontal: 8,
    paddingTop: 15,
    marginBottom: 20,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  styleLabel: {
    borderRadius: 10,
    minWidth: 40,
    textAlign: 'center',
    marginLeft: 10,
    backgroundColor: '#006265',
    color: 'white'
  },
  containerIndicator: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
export default DetailsScreen;
