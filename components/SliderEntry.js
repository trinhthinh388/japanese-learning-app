import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../components/SliderEntry.style';

const style = StyleSheet.create({
  icon: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {illustration, locked},
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={illustration}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
          locked ? styles.lock : {},
        ]}
        style={[styles.image]}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={illustration} style={[styles.image]} />
    );
  }

  render() {
    const {
      data: {title, locked, destination},
      navigation,
    } = this.props;

    const uppercaseTitle = title ? (
      <Text style={[styles.title, styles.titleEven, locked ? styles.lockTitle : {}]} numberOfLines={2}>
        {!locked ? title : 'Locked'}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          if (!locked) {
            navigation.navigate(destination);
          }
        }}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            styles.imageContainerEven,
            {position: 'relative'},
          ]}>
          {this.image}
          <View style={[styles.textContainer, styles.textContainerEven]}>
            {uppercaseTitle}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
