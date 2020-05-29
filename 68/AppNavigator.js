import {
  createStackNavigator
} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import Levels from './screens/Levels';
import KanjiGroup from './screens/KanjiGroup';
import ProfileScreen from './screens/ProfileScreen';
import KanjiLearning from './screens/KanjiLearning';
import KanjiDetail from './screens/KanjiDetail';
import KanjiGroupDetail from './screens/KanjiGroupDetail';
import KanjiChallenge1 from './screens/KanjiChallenge1';
import KanjiFlashCards from './screens/KanjiFlashCards';
import KanjiTests from './screens/KanjiTests';
import FavoriteKanjiScreen from './screens/FavoriteKanjiScreen';

const Appnavigator = createStackNavigator({
  Levels: {
    screen: Levels
  },
  FavoriteKanjiScreen: {
    screen: FavoriteKanjiScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  },
  KanjiGroup: {
    screen: KanjiGroup
  },
  KanjiLearning: {
    screen: KanjiLearning
  },
  KanjiDetail: {
    screen: KanjiDetail
  },
  KanjiGroupDetail: {
    screen: KanjiGroupDetail
  },
  KanjiChallenge1: {
    screen: KanjiChallenge1
  },
  KanjiFlashCards: {
    screen: KanjiFlashCards
  },
  KanjiTests: {
    screen: KanjiTests
  }
});
const RootStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen
    },
    Main: {
      screen: Appnavigator,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
export default RootStack;
