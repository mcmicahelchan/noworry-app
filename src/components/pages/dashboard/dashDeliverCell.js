import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Animated } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress'

const WIDTH = 0

export default class dashDeliverCell extends Component {

  constructor() {
    super()
    this.state = {
      isOpen: false,
      AnimHeight: new Animated.Value(80),
    }
  }

  slideDown() {
    this.setState({
      isOpen: true,
    })
    Animated.parallel([
      // 随时间变化而执行的动画类型
      Animated.spring(
        this.state.AnimHeight,                      // 动画中的变量值
        {
          toValue: 180,
          speed: 1,
          // duration: 600,
        },
      ),
    ]).start();  
  }

  slideUp() {
    this.setState({
      isOpen: false,
    })
    Animated.parallel([
      // 随时间变化而执行的动画类型
      Animated.spring(
        this.state.AnimHeight,                      // 动画中的变量值
        {
          toValue: 80,
          // duration: 600,
        },
      ),
    ]).start();  
  }

  render() {
    const { title, link, navigation, process, width, date, add } = this.props
    return (
      <Animated.View style={[styles.dashCell, { width: width - 40, height: this.state.AnimHeight }]}>
        <TouchableOpacity activeOpacity={1} onPress={() => {this.slideDown()}} style={{overflow: 'hidden', flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderColor: 'purple', borderWidth: WIDTH, height: this.state.isOpen? 180: 80}}> 
              <View style={[styles.rect,]} />
              <View style={{flex: 1, alignSelf: 'flex-start', overflow: 'hidden', borderColor: 'green', borderWidth: WIDTH, height: this.state.isOpen? 180: 80}}>
                    <View style={styles.dashInfo}>
                      <View style={{ flexDirection: 'row', flex: 1, width: width-74 }}>
                        <Text style={{ color: '#60708B', fontSize: 20, fontWeight: 'bold', flex: 1 }}>{title}</Text>
                        <Text style={{ color: '#6999FD', fontSize: 15, fontWeight: 'bold', marginRight: 15, marginTop: 5, }}>快件到达【大学城分拨中心】</Text>
                      </View>
                      <View style={{flexDirection: 'row', borderColor: 'black', borderWidth: WIDTH}}>
                        <Text style={{ color: '#9E9E9E', fontSize: 16, flex: 1 }}>预计{date}送达</Text>
                        <View>{this.state.isOpen? <Ionicons name={'ios-arrow-down'} size={22} style={{ color: 'white', marginRight:  15  }} /> :  <Ionicons name={'ios-arrow-down'} size={22} style={{ color: '#D1D1D1', marginRight:  15  }} />}</View> 
                      </View>
                    </View>
                    {this.state.isOpen 
                    ?<View style={styles.infoContainer}>
                        <View style={styles.titleCell}>
                            <Text style={{color: 'black', lineHeight: 18}}>快递单号：110401400184</Text>
                        </View>
                        <View style={styles.titleCell}>
                            <Text style={{color: 'black', lineHeight: 18}}>物流公司：顺丰速运</Text>
                        </View>
                    </View>
                    :null}
                    {this.state.isOpen 
                    ?<TouchableOpacity onPress={() => this.slideUp()} style={{height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Ionicons name={'ios-arrow-up'} size={22} style={{ color: '#D1D1D1', marginRight:  15  }} />
                    </TouchableOpacity>
                    :null}
                    

              </View>
                     
        </TouchableOpacity>
      </Animated.View>
    )
  }
  
}

const styles = StyleSheet.create({
 
  dashCell: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    // borderColor: 'red',
    // borderWidth: 1,
   
    // shadowColor: 'grey',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    // elevation: 3,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 30,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  dashInfo: {
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    height: 80,
    alignSelf: 'flex-start',
    borderColor: 'red',
    borderWidth: WIDTH,
    
  },
  rect: {
    backgroundColor: '#8083AE',
    height: 16,
    width: 10,
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  infoContainer: {
    flex: 1,
    borderColor: 'red',
    borderWidth: WIDTH,
    paddingLeft: 20,
    paddingRight: 70,
    paddingTop: 10,
  },
  titleCell: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  textCell: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
  }
})
