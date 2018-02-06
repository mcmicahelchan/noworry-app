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
} from 'react-native';

//inspect lines
const guideline = 0;
const {width, height} = Dimensions.get('window');

export default class Receiver extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }


  render() {
    return (
      <View style={styles.section}>
        <View style={styles.bubble}>
          <View style={styles.rectangle}>
            <Text style={styles.font}>{this.props.text}</Text>
          </View>
          <View style={styles.triangleContainer}>
            <View style={styles.triangle}></View>
          </View>
        </View>
        <Image style={styles.favition} source={require('./pic3.png')}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  favition: {
    height: 40,
    width: 40,

  },
  section: {
    borderColor: 'black',
    borderWidth: guideline,
    width: width -48,
    flexDirection: 'row',
    marginLeft: 32,
    marginRight: 14,
    marginBottom: 22,
    // flex: 1,
    justifyContent: 'flex-end',
  },
  bubble: {
    borderColor: 'yellow',
    borderWidth: guideline,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  triangleContainer: {
    borderColor: 'green',
    borderWidth: guideline,
    width: 15,
    paddingRight: 8,

  },
  triangle: {
    width: 0,
    height: 0,
    marginTop: 10,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderRightColor: '#F2F3F7',
    borderTopColor: '#F2F3F7',
    borderLeftColor: '#FFFFFF',
    borderBottomColor: '#F2F3F7',
  },
  rectangle: {
    justifyContent: 'flex-end',
    borderColor: 'blue',
    borderWidth: guideline,
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

});