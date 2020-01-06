import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry from '../components/SliderEntry';
import {
  sliderWidth,
  itemWidth,
  slideHeight,
} from '../components/SliderEntry.style';
import styles, {colors} from '../components/index.style';
import n5 from '../assets/kanji5.jpg';
import n4 from '../assets/kanji4.jpg';
import n3 from '../assets/kanji3.jpg';
import n2 from '../assets/kanji2.jpg';
import n1 from '../assets/kanji1.jpg';

export default class Kanji extends Component {
  state = {
    slider1ActiveSlide: 0,
  };

  _renderItemWithParallax = ({item, index}, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        navigation={this.props.navigation}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  };

  render() {
    const menu = [
      {
        title: 'N5',
        destination: 'KanjiN',
        locked: false,
        illustration: n5,
      },
      {
        title: 'N4',
        destination: 'KanjiN',
        locked: true,
        illustration: n4,
      },
      {
        title: 'N3',
        destination: 'KanjiN',
        locked: true,
        illustration: n3,
      },
      {
        title: 'N2',
        destination: 'KanjiN',
        locked: true,
        illustration: n2,
      },
      {
        title: 'N1',
        destination: 'N1',
        locked: true,
        illustration: n1,
      },
    ];

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar hidden={true} />
        <View
          style={[
            styles.container,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Carousel
            ref={c => (this._slider1Ref = c)}
            slideStyle={{height: slideHeight}}
            data={menu}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={0}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.3}
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustmomStyle={styles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
          />
          <Pagination
            dotsLength={menu.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={colors.gray}
            dotStyle={styles.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: '#66cdaa',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('MainScreen');
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
