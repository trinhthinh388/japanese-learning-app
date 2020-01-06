import React, {Component} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import googleLogo from '../assets/Google.png';
import facebookLogo from '../assets/Facebook.png';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';

const buttonArr = [0, 1];

export default class Intro extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.movingAnimValue = [];
    this.signInFadeAnimValue = new Animated.Value(0);
    buttonArr.forEach(value => {
      this.movingAnimValue[value] = new Animated.Value(0);
    });
    this.state = {
      logedIn: false,
      logging: true,
    };
  }

  googleAuth = async () => {
    try {
      await GoogleSignin.configure({
        scopes: [],
        webClientId:
          '934422948842-ssvtofhtb8v2fjk9g6pj8hetn16o6ll1.apps.googleusercontent.com',
        offlineAccess: true,
        hostedDomain: '',
        loginHint: '',
        forceConsentPrompt: true,
        accountName: '',
      });

      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      return true;
    } catch (error) {
      console.log(error);
      alert('Đăng nhập thất bại.');
      return false;
    }
  };

  UserAuth = () => {
    setTimeout(() => {
      this.animate();
    }, 700);
  };

  componentDidMount() {
    SplashScreen.hide();
    this.UserAuth();
  }

  animate() {
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.parallel(
        buttonArr
          .map(value => {
            return Animated.timing(this.movingAnimValue[value], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            });
          })
          .concat([
            Animated.timing(this.signInFadeAnimValue, {
              toValue: 1,
              duration: 500,
            }),
          ]),
      ),
    ]).start(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({logging: true});
        if (user) {
          this.setState({logedIn: true});
          this.props.navigation.navigate('MainScreen');
        }
        this.setState({logging: false});
      });
    });
  }

  render() {
    const titlePadding = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [35, 0],
    });

    const progressCircleSnail = () => {
      return (
        <Progress.CircleSnail size={45} color={['red', 'green', 'blue']} />
      );
    };

    return (
      <SafeAreaView style={styles.fullScreen}>
        <Animated.Text style={{paddingBottom: titlePadding}}>
          <Text style={styles.title}>Japle</Text>
        </Animated.Text>
        <Animated.View style={[styles.centered, {opacity: this.animatedValue}]}>
          <Text style={styles.signInText}>Mừng bạn đã trở lại.</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.centered,
            {
              opacity: this.movingAnimValue[1],
            },
          ]}>
          {this.state.logging ? (
            progressCircleSnail()
          ) : (
            <View>
              <TouchableOpacity
                style={[styles.signUpButton]}
                onPress={async () => {
                  this.setState({logging: true});
                  let result = await this.googleAuth();
                  this.setState({logging: false});
                  if (result) {
                    this.setState({logedIn: true});
                    this.props.navigation.navigate('MainScreen');
                  }
                }}>
                <Image style={styles.logo} source={googleLogo} />
                <Text>{'Đăng nhập bằng tài khoản Google'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.signUpButton]}>
                <Image style={styles.logo} source={facebookLogo} />
                <Text>{'Đăng nhập bằng tài khoản Facebook'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const dim = Dimensions.get('window');

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCentered: {},
  centered: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Abril Fatface',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  signUpButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0e68c',
    borderWidth: 0.5,
    borderColor: '#f0e68c',
    borderRadius: 5,
    margin: 10,
    width: dim.width * 0.7,
    height: 40,
  },
  signInText: {
    marginTop: 10,
    marginBottom: 50,
  },
});
