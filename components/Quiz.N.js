import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import * as Progress from 'react-native-progress';

export default class QuizN extends Component {
  constructor(props) {
    super(props);
    this.decreaseOpacity = new Animated.Value(1);
    this.increaseOpacity = new Animated.Value(0);
    this.state = {
      startTest: false,
      indeterminate: true,
      progress: 0,
      timeOut: false,
      correct: 0,
      currentQuestion: 0,
      interval: null,
      data: [],
    };
  }

  interval_obj = null;

  componentDidMount() {
    this.setState({
      data: [
        {
          question: 'A:　あのひとはタムさんですか。 B:　はい、（　　　　）。',
          answer: [
            'タムです',
            'タムさんです',
            'タムさんじゃありません',
            'タムじゃありません',
          ],
          correctanswer: 'タムさんです',
        },
        {
          question: 'A:　ランさんはエンジニアですか。 B:　はい、（　　　　）。',
          answer: [
            'エンジニアです',
            'ランさんです',
            'エンジニアじゃありません',
            'ランさんじゃありません',
          ],
          correctanswer: 'エンジニアです',
        },
        {
          question:
            'A:   マイさんは（　　　　）ですか。  B:   よんじゅうごさいです。',
          answer: ['なん', 'だれ', 'どこ', 'なんさい'],
          correctanswer: 'なんさい',
        },
        {
          question: 'A:　あのひとはだれですか。  B: 　（　　　　）です。',
          answer: ['ズンさん', 'いしゃ', 'はたち', 'ベト'],
          correctanswer: 'ズンさん',
        },
        {
          question: 'A: このかさは（     ）のですか。B:ミンさんのです。',
          answer: ['なん', 'だれ', 'どこの', 'ミンさん'],
          correctanswer: 'だれ',
        },
        {
          question: 'HAI DUONG（       ）きました。',
          answer: ['は', 'の', 'から', 'も'],
          correctanswer: 'から',
        },
        {
          question:
            'A: それは（                　　）ざっしですか B: じどうしゃのざっしです。',
          answer: ['だれの', 'どこの', 'どの', 'なんの'],
          correctanswer: 'なんの',
        },
        {
          question:
            'あれ（                ）にほんごのもりのコンピューターです。',
          answer: ['は', 'の', 'コンピューターは', 'と'],
          correctanswer: 'は',
        },
        {
          question: 'ここは（                  ）です。',
          answer: ['きょうしつ', 'くつ', 'わたしの', 'きょうし'],
          correctanswer: 'きょうしつ',
        },
        {
          question:
            ' A: SAMSUNGは（                   ）のかいしゃですか。 B: でんしのかいしゃです。',
          answer: ['なん', 'どこ', 'だれ', 'いくら'],
          correctanswer: 'なん',
        },
      ],
    });
  }

  animate1() {
    Animated.timing(this.decreaseOpacity, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.setState({startTest: true});
      this.timerTick();
    });
  }

  animate2() {
    Animated.timing(this.increaseOpacity, {
      toValue: 1,
      duration: 800,
    }).start(() => {
      this.setState({startTest: true});
      this.timerTick();
    });
  }

  timerTick() {
    let progress = 0;
    this.setState({progress});
    setTimeout(() => {
      this.setState({indeterminate: false});
      this.interval_obj = setInterval(() => {
        progress += 1 / 600;
        this.setState({progress});
        if (progress > 1 || this.state.timeOut === true) {
          clearInterval(this.interval_obj);
          this.setState({timeOut: true});
          this.animate2();
        }
      }, 1000);
    }, 0);
  }

  onAnswerTouchHandler(answer, correct) {
    if(answer === correct){
      this.setState({correct: this.state.correct + 1});
    }
    if (this.state.currentQuestion < this.state.data.length - 1) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
      });
    } else {
      this.setState({
        timeOut: true,
      });
    }
  }

  renderQuestion(data) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: dim.height * 0.1}}>
          <Progress.Pie style={{margin: 20}} progress={this.state.progress} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: dim.height * 0.8,
          }}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{data.question}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.answerContainer}
              onPress={() => {
                this.onAnswerTouchHandler(data.answer[0], data.correctanswer);
              }}>
              <Text>{data.answer[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerContainer}
              onPress={() => {
                this.onAnswerTouchHandler(data.answer[1], data.correctanswer);
              }}
            >
              <Text>{data.answer[1]}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.answerContainer}
              onPress={() => {
                this.onAnswerTouchHandler(data.answer[2], data.correctanswer);
              }}
            >
              <Text>{data.answer[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerContainer}
              onPress={() => {
                this.onAnswerTouchHandler(data.answer[3], data.correctanswer);
              }}
            >
              <Text>{data.answer[3]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: dim.height * 0.1}}>
          <Text style={{fontSize: 25, fontWeight: '900'}}>{this.state.currentQuestion + 1}/{this.state.data.length}</Text>
        </View>
      </View>
    );
  }

  startPage() {
    return (
      <Animated.View
        style={{alignItems: 'center', opacity: this.decreaseOpacity}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trắc nghiệm từ vựng và chữ Hán</Text>
        </View>

        <Text style={styles.questionNumber}>
          Số câu hỏi: {this.state.data.length}
        </Text>
        <Text style={styles.questionNumber}>Thời gian: 10 phút</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingVertical: 20,
            backgroundColor: '#FE4A49',
            paddingHorizontal: 30,
            borderRadius: 10,
            marginVertical: 20,
            borderColor: '#FE4A49',
          }}
          onPress={() => {
            this.animate1();
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '500'}}>
            Bắt đầu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            backgroundColor: '#66cdaa',
            borderColor: '#66cdaa',
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('Quiz');
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '500'}}>
            Quay lại
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  finishPage() {
    return (
      <Animated.View
        style={{alignItems: 'center', opacity: this.increaseOpacity}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bạn đã hoàn thành bài kiểm tra</Text>
        </View>

        <Text style={styles.questionNumber}>
          Kết quả: {this.state.correct}/{this.state.data.length}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingVertical: 20,
            backgroundColor: '#FE4A49',
            paddingHorizontal: 30,
            borderRadius: 10,
            marginVertical: 20,
            borderColor: '#FE4A49',
          }}
          onPress={() => {
            this.setState({timeOut: false, currentQuestion: 0, correct: 0});
            this.animate1();
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '500'}}>
            Thử lại
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            backgroundColor: '#66cdaa',
            borderColor: '#66cdaa',
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('Quiz');
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '500'}}>
            Quay lại
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        {this.state.startTest
          ? this.state.timeOut
            ? this.finishPage()
            : this.renderQuestion(this.state.data[this.state.currentQuestion])
          : this.startPage()}
      </SafeAreaView>
    );
  }
}

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
  titleContainer: {
    width: dim.width * 0.9,
    backgroundColor: '#F4A259',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  title: {
    color: 'whitesmoke',
    fontWeight: '600',
    fontSize: 25,
    textAlign: 'center',
    borderRadius: 20,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 10,
  },
  questionContainer: {
    width: dim.width * 0.9,
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
  },
  answerContainer: {
    width: dim.width * 0.4,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
