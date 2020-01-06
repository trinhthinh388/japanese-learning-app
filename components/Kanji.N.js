import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  sliderWidth,
  itemWidth,
  slideHeight,
} from '../components/SliderEntry.style';
import styles from './SliderEntry.style';

export default class KanjiN extends Component {
  state = {
    slider1ActiveSlide: 0,
    data: [
      {
        hiragana: 'わたし',
        kanji: '私',
        meaning: 'Tôi',
        amhan: 'Tư',
      },
      {
        hiragana: 'わたしたち',
        kanji: '私達',
        meaning: 'Chúng tôi',
        amhan: 'Tư Đạt',
      },
      {
        hiragana: 'あなた',
        kanji: '貴方',
        meaning: '(Anh, chị, cậu) Người mình đang nói chuyện',
        amhan: 'Quý Phương',
      },
      {
        hiragana: 'あのひと',
        kanji: 'あの人',
        meaning: 'Người đó',
        amhan: 'Nhân',
      },
      {
        hiragana: 'みなさん',
        kanji: '皆さん',
        meaning: 'Mọi người',
        amhan: 'Giai',
      },
      {
        hiragana: 'ほん',
        kanji: '本',
        meaning: 'Sách',
        amhan: 'Bản',
      },
      {
        hiragana: 'じしょ',
        kanji: '辞書',
        meaning: 'Từ điển',
        amhan: 'Từ Thư',
      },
      {
        hiragana: 'しんぶん',
        kanji: '新聞',
        meaning: 'Báo',
        amhan: 'Tân Văn',
      },
      {
        hiragana: 'てちょう',
        kanji: '手帳',
        meaning: 'Sổ tay',
        amhan: 'Thủ Trương',
      },
      {
        hiragana: 'ざっし',
        kanji: '雑誌',
        meaning: 'Tạp chí',
        amhan: 'Tạp Chí',
      },
      {
        hiragana: 'とけい',
        kanji: '時計',
        meaning: 'Đồng hồ',
        amhan: 'Thời Kế',
      },
      {
        hiragana: 'かさ',
        kanji: '傘',
        meaning: 'Cái ô',
        amhan: 'Tản',
      },
      {
        hiragana: 'つくえ',
        kanji: '机',
        meaning: 'Cái bàn',
        amhan: 'Kỷ',
      },
      {
        hiragana: 'きょうしつ',
        kanji: '教室',
        meaning: 'Lớp học',
        amhan: 'Giáo Thất',
      },
      {
        hiragana: 'しょくどう',
        kanji: '食堂',
        meaning: 'Nhà ăn',
        amhan: 'Thực Đường',
      },
      {
        hiragana: 'かいぎしつ',
        kanji: '会議室',
        meaning: 'Phòng họp',
        amhan: 'Hội Nghị Thất',
      },
      {
        hiragana: 'うけつけ',
        kanji: '受付',
        meaning: 'Bộ phận tiếp tân',
        amhan: 'Thụ Phó',
      },
      {
        hiragana: 'へや',
        kanji: '部屋',
        meaning: 'Căn phòng',
        amhan: 'Bộ Ốc',
      },
      {
        hiragana: 'くに',
        kanji: '国',
        meaning: 'Đất nước',
        amhan: 'Quốc',
      },
      {
        hiragana: 'かいしゃ',
        kanji: '会社',
        meaning: 'Công ty',
        amhan: 'Hội xã',
      },
    ],
  };

  _renderItemWithParallax = ({item, index}, parallaxProps) => {
    return (
      // eslint-disable-next-line prettier/prettier
      <TouchableOpacity activeOpacity={1} style={[styles.slideInnerContainer]}>
        <View style={[styles.shadow, {shadowOffset: {width: 0, height: 3}}]} />
        <View
          style={[
            styles.imageContainer,
            styles.imageContainerEven,
            {position: 'relative'},
          ]}>
          <View
            style={[
              styles.textContainer,
              styles.textContainerEven,
              {backgroundColor: '#A63D40'},
            ]}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 50,
              textAlign: 'center',
              marginTop: 60,
              marginBottom: 30,
            }}>
            {item.kanji}
          </Text>
          <Text
            style={{
              color: '#01295F',
              fontSize: 30,
              textAlign: 'center',
              margin: 30,
            }}>
            {item.hiragana}
          </Text>
          <Text
            style={{
              color: '#CEE7E6',
              fontSize: 20,
              textAlign: 'center',
              margin: 20,
            }}>
            {item.meaning}
          </Text>
          <Text
            style={{
              color: '#CEE7E6',
              fontSize: 20,
              textAlign: 'center',
              margin: 20,
            }}>
            {item.amhan}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Carousel
            layout={'tinder'}
            ref={c => (this._slider1Ref = c)}
            slideStyle={{height: slideHeight}}
            data={this.state.data}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={0}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.3}
            // inactiveSlideShift={20}
            containerCustomStyle={{marginTop: 15, overflow: 'visible'}}
            contentContainerCustmomStyle={{paddingVertical: 10}}
            loop={false}
            loopClonesPerSide={2}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
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
              this.props.navigation.navigate('Kanji');
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
