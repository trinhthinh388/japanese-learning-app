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
import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import Vocabulary from './components/Vocabulary';
import Grammar from './components/Grammar';
import Test from './components/Test';

export default class App extends Component {

    render() {
      return <AppContainer/>;
    }
}


const vocabularyStackHeader = createStackNavigator({
    Home: {
        screen: Vocabulary,
    }
}, { defaultNavigationOptions: {
        title: 'Japle',
        headerStyle: {
        height: 60
        },
        headerTintColor: 'black',
        headerTitleStyle: {
        fontFamily: 'Abril Fatface',
        fontSize: 30
        },
        headerRight: () => (
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', margin: 20}} onPress={() => console.log('poe')}>
                <FontAwesomeIcon style={{color: 'black'}} icon={faUser} size={25}/>
            </TouchableOpacity>
        ),
        headerLeft: null,
        gesturesEnabled: false,
    }
});

const grammarStackHeader = createStackNavigator({
    Home: {
        screen: Grammar,
    }
    
}, {defaultNavigationOptions: {
    title: 'Japle',
    headerStyle: {
    height: 60
    },
    headerTintColor: 'black',
    headerTitleStyle: {
    fontFamily: 'Abril Fatface',
    fontSize: 30
    },
    headerRight: () => (
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', margin: 20}} onPress={() => console.log('poe')}>
            <FontAwesomeIcon style={{color: 'black'}} icon={faUser} size={25}/>
        </TouchableOpacity>
    ),
    headerLeft: null,
    gesturesEnabled: false,
}});

const homeStackHeader = createStackNavigator({
    Home: {
        screen: HomeScreen,
    }  
}, {defaultNavigationOptions: {
    title: 'Japle',
    headerStyle: {
    height: 60
    },
    headerTintColor: 'black',
    headerTitleStyle: {
    fontFamily: 'Abril Fatface',
    fontSize: 30
    },
    headerRight: () => (
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', margin: 20}} onPress={() => console.log('poe')}>
            <FontAwesomeIcon style={{color: 'black'}} icon={faUser} size={25}/>
        </TouchableOpacity>
    ),
    headerLeft: null,
    gesturesEnabled: false,
}});

const testStackHeader = createStackNavigator({
    Home: {
        screen: Test,
    }
    
}, {
    defaultNavigationOptions: {
        title: 'Japle',
        headerStyle: {
        height: 60
        },
        headerTintColor: 'black',
        headerTitleStyle: {
        fontFamily: 'Abril Fatface',
        fontSize: 30
        },
        headerRight: () => (
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', margin: 20}} onPress={() => console.log('poe')}>
                <FontAwesomeIcon style={{color: 'black'}} icon={faUser} size={25}/>
            </TouchableOpacity>
        ),
        headerLeft: null,
        gesturesEnabled: false,
    }
});

const appBottomNavigator = createBottomTabNavigator({
    Home: {
        screen: homeStackHeader,
    },
    Vocabulary: {
        screen: vocabularyStackHeader,
    },
    Grammar: {
        screen: grammarStackHeader,
    },
    Test: {
        screen: testStackHeader,
    }
}, {
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        style: {backgroundColor: 'black'},
        activeTintColor: 'white',
        inactiveTintColor: '#696969',
    },
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            switch(routeName){
                case 'Home': {iconName = faHome; break;}
                case 'Vocabulary': {iconName = faWeebly; break;}
                case 'Grammar': {iconName = faSpellCheck; break;}
                case 'Test': {iconName = faTasks; break;}
            }
            return <FontAwesomeIcon style={{color: tintColor}} icon={iconName} size={25}/>;
        }
    }),
}
);

appBottomNavigator.navigationOptions = ({navigation}) => ({
    headerShown: false,
});


const appNavigator = createStackNavigator({
    Intro: {
        screen: Intro,
        navigationOptions: {
            headerShown: false
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    MainScreen: {
        screen: appBottomNavigator,
    },
}, {initialRouteName: 'Intro'} );


const AppContainer = createAppContainer(appNavigator);