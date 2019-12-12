/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import {SearchBar, Overlay} from 'react-native-elements';

const colorArr = ['#f0e68c', '#e6e6fa', '#add8e6', '#d3d3d3', '#778899'];

const restaurantList = [
  {
    type: 'Italian',
    name: 'DiMaggio',
  },
  {
    type: 'Greek',
    name: 'Athena',
  },
];

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class Vocabulary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: restaurantList,
      error: null,
      value: '',
    };
    this.arrayholder = [];
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = restaurantList.filter(item => {
      console.log(item.type);
      const itemData = `${item.name.toUpperCase()} ${item.type.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });

    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type..."
        value={this.state.value}
        onChangeText={text => this.searchFilterFunction(text)}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            extraData={this.state}
            data={this.state.data}
            renderItem={({item}) => (
              <Text>
                {item.name} {item.type}
              </Text>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 30,
    flex: 80,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: 320,
    height: 470,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    opacity: 0.5,
    backgroundColor: 'black',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
