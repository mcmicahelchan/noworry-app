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
} from 'react-native';

import Thumbnail from '../../Thumbnail';

export default class Sender extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  _renderContent(type) {
    switch(type) {
      //如果客服类型是纯文字
      case 1: {
        return (
        <Text style={styles.font}>{this.props.text}</Text>
        )
      }  
      //如果客服类型是可选择问题
      case 2: {
        return this.props.questions.map((item, index) => {
          if (item == '港澳通行证') {
              return (
                <TouchableOpacity key={index} onPress={() => { this.props.navigation.navigate('info') }}>
                  <Text style={styles.sendOptionText}>{item}</Text>
                </TouchableOpacity>)
          } else {
              return (
                  <TouchableOpacity key={index} onPress={() => { this.props.sendByClick(item) }}>
                    <Text style={styles.sendOptionText}>{item}</Text>
                  </TouchableOpacity>)
          }
      })
    }   
      //如果客服类型是图片
      case 3: {
        return (
        <Thumbnail
          source={this.props.img}
          style={styles.thumbnail}
        />)
      }
            // return <Image style={styles.favition} source={require('../../../assets/common/mine/logo.png')}/>   
      default:
          break
    }
  }

  render() {
    return (
          <View style={styles.section}>
            <Image style={styles.favition} source={require('./pic2.png')}/>
            <View style={styles.bubble}>
              <View style={styles.triangleContainer}>
                <View style={styles.triangle}></View>
              </View>
              <View style={styles.rectangle}>
                {this._renderContent(this.props.type)}
              </View>
            </View>
          </View>
    );
  }
}


const styles = StyleSheet.create({
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
    flex:1,
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
    // width: 270,
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

  ml9: {
    marginLeft: 9,
  },
  sendOptionText: {
    color: '#4380FC',
    fontSize: 18,
    lineHeight: 31,
  },
  pic: {
    width:180,
    height:50,
  },
  thumbnail:{
    width: 180,
    height: 180,
  }

});