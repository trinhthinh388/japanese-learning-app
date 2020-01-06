/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHome, faSpellCheck, faTasks, faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faWeebly} from '@fortawesome/free-brands-svg-icons';
import Icon from 'react-native-ionicons';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {SearchBar} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import Intro from './components/Intro';
import HomeScreen from './components/HomeScreen';
import Vocabulary from './components/Vocabulary';
import Kanji from './components/Kanji';
import KanjiN from './components/Kanji.N';
import Quiz from './components/Quiz';
import QuizN from './components/Quiz.N';
import Grammar from './components/Grammar';
import Test from './components/Test';
import Account from './components/Account';
import VocabularyN5 from './components/Vocabulary.N5';

export default class App extends Component {

    render() {
      return <AppContainer/>;
    }
}


const mainNavigator = createStackNavigator({
    Intro: {
        screen: Intro,
    },
    MainScreen: {
        screen: HomeScreen,
    },
    Words: {
        screen: Vocabulary,
    },
    N5: {
        screen: VocabularyN5,
    },
    Kanji: {
        screen: Kanji,
    },
    KanjiN: {
        screen: KanjiN
    },
    Quiz: {
        screen: Quiz,
    },
    QuizN: {
        screen: QuizN,
    },
    Account: {
        screen: Account,
        navigationOptions: {
            gesturesEnabled: true,
        }
    }
}, 
{
    defaultNavigationOptions: {
        header: null,
        gesturesEnabled: false,
    },
    initialRouteName: 'Intro',
    
});





const AppContainer = createAppContainer(mainNavigator);