import React, {Component} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import googleLogo from '../assets/Google.png';
import facebookLogo from '../assets/Facebook.png';
import Login from './Login';

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
  }

  componentDidMount() {
    SplashScreen.hide();
    setTimeout(() => this.animate(), 700);
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
    ]).start();
  }

  render() {
    const titlePadding = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [35, 0],
    });

    return (
      <SafeAreaView style={styles.fullScreen}>
        <Animated.Text style={{paddingBottom: titlePadding}}>
          <Text style={styles.title}>Japle</Text>
        </Animated.Text>
        <Animated.View style={[styles.centered, {opacity: this.animatedValue}]}>
          <Text style={styles.signInText}>Welcome back.</Text>
        </Animated.View>
        {buttonArr.map(value => {
          const brand = value === 0 ? 'Google' : 'Facebook';
          const logo = value === 0 ? googleLogo : facebookLogo;
          return (
            <Animated.View
              key={value}
              style={[
                styles.centered,
                {
                  opacity: this.movingAnimValue[value],
                },
              ]}>
              <TouchableOpacity style={[styles.signUpButton]}>
                <Image style={styles.logo} source={logo} />
                <Text>{`Sign up with ${brand}`}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <Animated.View style={{opacity: this.signInFadeAnimValue}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              margin: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text>Already have an account?</Text>
            <Text style={{color: '#1e90ff'}}>Sign in</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

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
    width: 200,
    height: 40,
  },
  signInText: {
    marginTop: 10,
    marginBottom: 50,
  },
});
