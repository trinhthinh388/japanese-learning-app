/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Progress from 'react-native-progress';

export default class Login extends Component {
  state = {
    emailLabel: 'Your email',
    buttonLabel: 'Continue',
    isPressed: false,
    showLoader: false,
    text: '',
  };

  render() {
    const buttonBackground = this.state.showLoader ? 'transparent' : '#66cdaa';

    const buttonPress = () => {
      if (this.state.showLoader) {
        return <Progress.CircleSnail color={['#66cdaa']} />;
      } else {
        return <Text style={styles.buttonText}>{this.state.buttonLabel}</Text>;
      }
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.fullScreen}>
          <Text style={styles.title}>Sign in with email</Text>
          <Text style={styles.signInText}>
            Enter the email address associated with your account.
          </Text>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 20,
              color: '#808080',
            }}>
            {this.state.emailLabel}
          </Text>
          <TextInput
            secureTextEntry={this.state.isPressed}
            style={styles.inputEmail}
            value={this.state.text}
            onChangeText={text => this.setState({text})}
          />
          <TouchableOpacity
            style={[styles.signInButton, {backgroundColor: buttonBackground}]}
            onPress={() => {
              if (this.state.buttonLabel === 'Continue') {
                this.setState({
                  isPressed: !this.state.isPressed,
                  buttonLabel: 'Sign in',
                  emailLabel: 'Your password',
                  text: '',
                });
              } else {
                this.setState({
                  showLoader: true,
                });
                setTimeout(() => {
                  this.props.navigation.navigate('MainScreen');
                }, 200);
              }
            }}>
            {buttonPress()}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 30,
            }}
            onPress={() => {
              this.props.navigation.navigate('Intro');
            }}>
            <Text>Don't have an account?</Text>
            <Text style={{color: '#1e90ff'}}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}
            onPress={() => {
              console.log('Recover password.');
            }}>
            <Text style={{color: '#1e90ff'}}>Forgot your password?</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Abril Fatface',
  },
  inputEmail: {
    width: '80%',
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    fontSize: 16,
  },
  inputPassword: {
    width: '80%',
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    fontSize: 16,
  },
  signInText: {
    marginTop: 10,
    width: '60%',
    textAlign: 'center',
    fontSize: 16,
  },
  signInButton: {
    width: 100,
    height: 50,
    backgroundColor: 'mediumaquamarine',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
