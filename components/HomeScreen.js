/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, View, Image, StatusBar} from 'react-native';
import firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';

export default class HomeScreen extends Component {

  render() {
    return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar hidden/>
      <Image style={styles.logo} source={require('../assets/splash-screen-small.png')}/>

      <Text style={styles.title}>日本語が簡単です</Text>

      <View style={{marginTop: 30}}>
        <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#F4442E'}]}
          onPress= { () => {
            this.props.navigation.navigate('Words');
          }}
        >
          <Text style={{color: 'white', fontWeight: '600'}}>Từ vựng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#F7B32B'}]} onPress={() => {this.props.navigation.navigate('Kanji');}}>
          <Text style={{color: 'white', fontWeight: '600'}}>Kanji</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#2C2C54'}]} onPress={() => {this.props.navigation.navigate('Quiz');}}>
          <Text style={{color: 'white', fontWeight: '600'}}>Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, {backgroundColor: 'black'}]}
          onPress={() => {
            this.props.navigation.navigate('Account');
          }}
        >
          <Text style={{color: 'white', fontWeight: '600'}}>Tài khoản</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>);
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
    fontSize: 20,
    fontWeight: '300',
  },
  menuButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 200,
    height: 50,
    borderRadius: 5,
  },
  logo: {
    marginBottom: 20,
    marginTop: 20,
    width: 300,
    height: 100,
  }
});
