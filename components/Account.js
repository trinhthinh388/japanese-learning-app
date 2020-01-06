import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        uid: '',
        email: '',
        fullname: '',
        profilePictureURL: '',
        phoneNumber: '',
        level: [
          {
            N5: true,
            N4: false,
            N3: false,
            N2: false,
            N1: false,
          },
        ],
      },
      idUser: '',
      loading: false,
    };
  }

  ref = firebase.firestore().collection('users');

  onTextChangeHandler = () => {};

  checkExist = addingUser => {
    let signedUser = null;
    this.ref.get().then(docs => {
      docs.forEach(doc => {
        let {uid} = doc.data();
        if (uid === addingUser.uid) {
          signedUser = doc.data();
          this.setState({
            idUser: doc.id,
            user: signedUser,
          });
        }
      });

      if (signedUser) {
      } else {
        this.ref.add(this.state.user);
      }
    });
  };

  saveUserData = async () => {
    await this.ref.doc(this.state.idUser).update(this.state.user);
    this.setState({loading: false});
  };

  getUserDataFromGoogle = async () => {
    await firebase.auth().onAuthStateChanged(async user => {
      const signedInUser = {
        uid: user.uid,
        email: user.email,
        fullname: user.displayName,
        profilePictureURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      };
      this.checkExist(signedInUser);
    });
  };

  componentDidMount() {
    this.getUserDataFromGoogle();
  }

  render() {
    return (
      <SafeAreaView style={styles.fullscreen}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                this.state.user.profilePictureURL === ''
                  ? 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
                  : this.state.user.profilePictureURL,
            }}
          />
        </View>
        <View style={styles.inforContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.info}>{this.state.user.email}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Tên</Text>
            <TextInput
              style={styles.info}
              onChangeText={text => {
                const cloneUser = this.state.user;
                cloneUser.fullname = text;
                this.setState({
                  user: cloneUser,
                });
              }}>
              {this.state.user.fullname}
            </TextInput>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Số điện thoại</Text>
            <TextInput
              style={styles.info}
              onChangeText={text => {
                const cloneUser = this.state.user;
                cloneUser.phoneNumber = text;
                this.setState({
                  user: cloneUser,
                });
              }}>
              {this.state.user.phoneNumber}
            </TextInput>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Hoạt động</Text>
          </View>

          {this.state.loading === false ? (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  Keyboard.dismiss();
                  this.setState({loading: true});
                  await this.saveUserData();
                  Alert.alert('', 'Lưu thông tin thành công', [
                    {
                      text: 'OK',
                      onPress: () => {
                        return;
                      },
                    },
                  ]);
                }}>
                <Text style={styles.buttonText}>Lưu thông tin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#F4442E'}]}
                onPress={async () => {
                  Keyboard.dismiss();
                  this.setState({loading: true});
                  firebase
                    .auth()
                    .signOut()
                    .then(() => this.setState({loading: false}));
                  this.props.navigation.navigate('Intro');
                }}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Progress.CircleSnail
              style={{marginTop: 20}}
              color={['red', 'green', 'blue']}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 20,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 360,
    width: dim.width * 0.3,
    height: dim.width * 0.3,
  },
  inforContainer: {
    flex: 80,
    alignItems: 'center',
  },
  textContainer: {
    width: dim.width,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
    borderColor: 'rgba(204, 204, 204, .2)',
  },
  title: {
    padding: 5,
    fontWeight: '200',
  },
  info: {
    padding: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#66cdaa',
    width: dim.width * 0.4,
    height: dim.width * 0.1 + 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500'
  },
});
