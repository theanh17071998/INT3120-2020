/* eslint-disable no-console */
import React from 'react';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import {
  ActivityIndicator,
  StyleSheet, View, Button, Dimensions
} from 'react-native';
import firebase from 'firebase';

import Login from '../components/Login';

const db = firebase.firestore();

const deviceWidth = Dimensions.get('window').width;
const screen = (percent) => (deviceWidth * percent) / 100;
console.ignoredYellowBox = [
'Setting a timer'
];
export default class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Login',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#006265',
    },
    headerMode: 'none',
    navigationOptions: { headerVisible: false }
  });


  constructor(props) {
    super(props);
    this.state = {
      // ready: false,
      loadding: true,
    };
  }


  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.navigation.getParam('logout') !== currentState.logout) {
      return ({
        stateLogin: !newProps.navigation.getParam('logout')
      });
    }
    return null;
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { navigation } = this.props;
        navigation.replace('Main', { author: user.uid });
      } else {
        this.setState({ loadding: false });
      }
    });
  }

  signInWithGoogleAsync = async () => {
    this.setState({ loadding: true });

    try {
      const result = await Google.logInAsync({
        androidClientId: '376767086525-ufioo6rnbc890repj2b87c8tt0nqgml3.apps.googleusercontent.com',
        iosClientId: '376767086525-kgcvdp051mf3qe35na2cbg5vsipmd6e7.apps.googleusercontent.com',
        scopes: ['profile'],
      });
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken,
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
          .then((data) => {
            const { navigation } = this.props;
            navigation.replace('Main', { author: data.user.uid });
            db.collection('level').doc(data.user.uid).set({
              levelName: 'Kanji của bạn',
              author: data.user.uid
            }, { merge: true })
              .then(() => {
                console.log('Document successfully written!');
              })
              .catch((error) => {
                console.error('Error writing document: ', error);
              });
          })
          .catch((data) => console.log(data));
      }
      this.setState({ loadding: false });
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  logInFacebook = async () => {
    this.setState({ loadding: true });
    try {
      await Facebook.initializeAsync('2936194473145634');
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
          .then((data) => {
            const { navigation } = this.props;
            navigation.replace('Main', { author: data.user.uid });
            db.collection('level').doc(data.user.uid).set({
              levelName: 'Kanji của bạn',
              author: data.user.uid
            }, { merge: true })
              .then(() => {
                console.log('Document successfully written!');
              })
              .catch((error) => {
                console.error('Error writing document: ', error);
              });
          })
          .catch((err) => console.log(err));
      } else {
        this.setState({ loadding: false });
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }

  ComponentIndicator = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )

  render() {
    const { loadding } = this.state;
    if (loadding === true) return (<this.ComponentIndicator />);
    return (
      <View>
        <Login>
          <View style={styles.button}>
            <Button
              onPress={this.logInFacebook}
              title="Tiếp tục đăng nhập bằng Facebook"
              color="#4267b2"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={this.signInWithGoogleAsync}
              title="Tiếp tục đăng nhập bằng Google"
              color="#e73232"
            />
          </View>
        </Login>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: screen(5),
    width: screen(80),
    marginLeft: screen(10),
  },
  header: {
    height: 30,
    backgroundColor: '#006265',
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
