import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  DatePickerIOS,
  ListView,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';

import Sender from './sender';
import Receiver from './receiver';

const guideline = 0;
const {height,width} = Dimensions.get('window');



export default class RobotChat extends Component {
  constructor() {
    super();
    this.state = {
        date: new Date(),
        //这里存放所有的信息
        //=====================================================
        //【text】是文字内容
        //【cus】是一个标记为，0是用户，1是客服
        //【type】标记客服的内容类型，【0】代表第一条欢迎信息或者用户的信息，【1】是纯文字，【2】是可点击问题，【3】是图片。
        //【question】用来装客服返回的问题
        //【imgSrc】用来装在图片的URI
        //=====================================================
      Msgs: [],
      keyboard: false,
      welcomeQuestion: ["信息填写相关", "选择业务相关","邮寄服务相关"],
      scrollviewHeight: height - 107,
      scrollviewContentHeight: 100,
    };
  }

  parseMinute(min) {
    return min / 10 > 1 ? min: ('0' + min);
  }

  reply(type, temp) {
    switch(type) {
      case 0: {
        temp.push({text: '信息填写需要非常准确哦，不能够错误，所以这一步非常重要！', cus:0, imgSrc: '', type:1, question: null})
        this.setState({
          Msgs: temp,
        }); 
        break; 
      }
      case 1: {
        temp.push({text: '', cus:0, imgSrc: '', type:2, questions: ['港澳通行证', '台湾通行证']})
        this.setState({
          Msgs: temp,
        });
        break;  
      }
      default: {
        temp.push({text: '不好意思～小陈听不懂你的话哦～', cus:0, imgSrc: '', type:1, questions: null})
        this.setState({
          Msgs: temp,
        });
        break; 
      }
    }
  }

  sendText = (text) => {
    console.log('sendText');
    var temp = this.state.Msgs;
    if (text != '' && text != undefined) {
      temp.push({text: text, cus:1, imgSrc: '', type:0, question: null});
      this.setState({
        Msgs: temp,
        text: '',
      });
      if (text == '信息填写相关') {
        setTimeout(() => this.reply(0, temp), 300)
      } else if (text == '通行证') {
        setTimeout(() => this.reply(1, temp), 300)
      } else {
        setTimeout(() => this.reply(404, temp), 300)
      }
        
      
    }
  }

  sendByClick = (text) => {
    console.log('sendbyclick',text);
    this.sendText(text);
  }


  render() {
    const {text,Msgs,scrollviewHeight} = this.state;
    console.log(this.state.date.getMonth())
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={Platform.OS == 'ios' ? 60 : -480}>
          <ScrollView
            ref = {component => this._scrollview = component}
            keyboardShouldPersistTaps={true}
            keyboardDismissMode='on-drag'
            onContentSizeChange={(contentWidth, contentHeight)=>
            { console.log(contentHeight); this.setState({ scrollviewContentHeight: contentHeight - 320 }); if (contentHeight > scrollviewHeight) { this._scrollview.scrollTo({ y: Platform.OS == 'ios' ? contentHeight - scrollviewHeight: contentHeight - scrollviewHeight + 20, animated: true})};console.log(contentHeight, scrollviewHeight);}}
            style={styles.scrollContainer}
            contentInset={{ top: 0, left: 0, bottom: 20, right: 0 }}>
            <Text style={styles.timeStamp}>
              {this.state.date.getMonth()+1 + '月' + this.state.date.getDate() + '日  ' + this.state.date.getHours() + ':'
              + this.parseMinute(this.state.date.getMinutes())}
            </Text>

            <View style={styles.section}>
              <Image style={styles.favition} source={require('./pic2.png')}/>
              <View style={styles.bubble}>
                <View style={styles.triangleContainer}>
                  <View style={styles.triangle}></View>
                </View>
                <View style={styles.rectangle}>
                  <Text style={styles.font}>{welcomeText}</Text>
                  <View style={styles.selectSec}>
                    <Text style={styles.font}>{optionText1}</Text>
                    {this.state.welcomeQuestion.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} onPress={() => {this.sendByClick(item)}}>
                          <Text style={styles.sendOptionText}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>


            {Msgs.map((item, index) => {
              if (item.cus) {
                  return <Receiver key={index} text={item.text}/>
              } else {
                console.log(typeof item.type);
                switch (item.type) {
                    case 1:
                        return <Sender key={index} text={item.text} type={1} />
                    case 2:
                        return <Sender navigation={this.props.navigation} sendByClick={(text) => this.sendByClick(text)} key={index} questions={item.questions} type={2} />
                    case 3:
                        return <Sender key={index} img={item.imgSrc} type={3}/>
                    default:
                         break
                }
              }})}

          </ScrollView>
          <View ref="kkk" style={styles.inputContainer}>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              returnKeyType="send"
              blurOnSubmit={false}
              onFocus={() => { console.log('focus'); this._scrollview.scrollTo({ y: Platform.OS == 'ios' ? this.state.scrollviewContentHeight + 50 : this.state.scrollviewContentHeight + 3000}); this.setState({ scrollviewHeight: height - 367 }) }}
              onBlur={() => {this.setState({ scrollviewHeight: height - 107 })}}
              onSubmitEditing={() => { this.sendText(text);}}
            />
            <TouchableOpacity
              style={styles.sendBtd}
              onPress={() => {this.sendText(text)}}
            >
              <Text style={styles.sendText}>发送</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>

  )
  }
}

const welcomeText = "您好，我是您的智能客服，很高兴为您服务！大部分的问题我都会哦，您可以直接向我提问，例如：" + "\n" +
  "■ 驾照补办\n" +
  "■ 办理签注";

const optionText1 = "您可能想问:";
const optionText2 = "注册与认证相关";

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: guideline,
    flex: 1,
    width: width,
    backgroundColor: '#F2F3F7',
  },
  scrollContainer: {
    flex:1,
    borderColor: 'green',
    // borderWidth: 2,
  },
  timeStamp: {
    color: '#999999',
    fontSize: 13,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  favition: {
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF',
    marginRight:3,
  },
  section: {
    // borderColor: 'black',
    // borderWidth: 2,
    flexDirection: 'row',
    marginLeft: 14,
    marginRight: 27,
    marginBottom: 22,
    flex: 1,
  },
  bubble: {
    // borderColor: 'yellow',
    // borderWidth: 2,
    flexDirection: 'row',
  },
  triangleContainer: {
    // borderColor: 'green',
    // borderWidth: 1,

    width: 16,
  },
  triangle: {
    width: 0,
    height: 0,
    marginTop: 10,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderRightColor: '#FFFFFF',
    borderTopColor: '#F2F3F7',
    borderLeftColor: '#F2F3F7',
    borderBottomColor: '#F2F3F7',
  },
  rectangle: {
    // borderColor: 'blue',
    // borderWidth: 2,
    width: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 17,
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
  },
  font: {
    fontFamily: 'PingFang-SC-Medium',
    fontSize: 18,
    color: '#242424',
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: 'normal',
  },
  btdContainer: {
    // borderColor: 'blue',
    // borderWidth: 1,
    height: 57,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EDF1',
  },
  inputContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: 50,
    backgroundColor: '#6999FD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btd: {
    width: 168,
    height: 45,
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderColor: '#BBBBBB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 14,
  },
  ml9: {
    marginLeft: 9,
  },
  inputBox: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: 282,
    height: 36,
    borderRadius: 6,
    borderColor: '#E4E4E4',
    borderWidth: 0.5,
    paddingLeft: 10,
    lineHeight: 37,
  },
  sendText: {
    fontSize: 18,
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 'normal',
    color: 'white',
  },
  sendBtd: {
    marginLeft: 21,
  },
  selectSec: {

    // borderStyle:'dashed',
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
    width: 240,
    borderTopColor: '#E6E6E6',
  },
  sendOptionText: {
    color: '#4380FC',
    fontSize: 18,
    lineHeight: 31,
  },



});