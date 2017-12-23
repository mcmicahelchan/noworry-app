import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import * as Progress from 'react-native-progress'

import Draft from './draft'
import Option from './option'
import Indicator from './indicator'

const WIDTH = 0
const { height, width } = Dimensions.get('window');
console.log(height)
let scrollheight = height==568 ? height+340 : height

export default class officehall extends Component {
  constructor () {
    super()
    this.state = {
      text: 'good'
    }
  }


  render () {
    console.log(height)
    return (
      <ScrollView style={styles.container } 
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      showsVerticalScrollIndicator={false}
        onContentSizeChange={(w, h) => { 
          scrollheight = h
          console.log('i am here')
           }}>
        <TouchableOpacity style={styles.searchBar} activeOpacity={1} >
          <Ionicons name={'ios-search'} size={18} style={{ color: '#dedede', marginTop: 2, marginRight: 6 }} />
          <Text style={styles.searchText}>搜索</Text>
        </TouchableOpacity>
      <View style={styles.viceContainer}>
          <TouchableOpacity style={styles.swipeContainer} activeOpacity={0.8}>
            <Text style={styles.header}>出入境业务</Text>
            <View style={styles.indicatorContainer}>
              <Indicator state='填写资料' type={1} date='11月24日' />
              <View style={styles.line}></View>
              <Indicator state='扫描' type={1} date='12月3日' />
              <View style={styles.line}></View>
              <Indicator state='审核中' type={2} date='12月3日' />
              <View style={styles.line}></View>
              <Indicator state='快递' type={3} date='12月3日' />
            </View>
          </TouchableOpacity>
          <View style={styles.draftboxContainer}>
            <View style={styles.draftboxHeaderContainer}>
              <Text style={styles.draftboxHeaderText}>草稿箱</Text>
              <Ionicons name={'md-create'} size={22} style={{ color: 'grey', marginTop: 5 }} />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.draftsScroll}
              contentContainerStyle={{ alignItems: 'center' }}
              pagingEnabled={true}
            >
              <Draft navigation={this.props.navigation} state='信息录入中' process={0.37} type='通行证' linkPage='error' />
              <Draft navigation={this.props.navigation} state='信息录入中' process={0.27} type='入台证' linkPage='error' />
              <Draft navigation={this.props.navigation} state='信息校验' process={0.87} type='身份证' linkPage='error' />
              <Draft navigation={this.props.navigation} state='信息录入中' process={0.69} type='未命名' linkPage='error' />

            </ScrollView>


          </View>
          <View style={styles.optionsContainer}>
            <View style={styles.draftboxHeaderContainer}>
              <Text style={styles.draftboxHeaderText}>业务选择</Text>
            </View>
            <View style={styles.businessContainer}>
              <Option style={styles.option} navigation={this.props.navigation} businessType='交管业务' icon='md-car' linkPage='error' />
              <Option style={styles.option} navigation={this.props.navigation} businessType='出入境业务' icon='md-globe' linkPage='abroad' />
              <Option style={styles.option} navigation={this.props.navigation} businessType='户政业务' icon='md-card' linkPage='error' />
              <Option style={styles.option} navigation={this.props.navigation} businessType='监管业务' icon='md-eye' linkPage='error' />
            </View>
          </View>
      </View>
        

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: WIDTH,
    borderColor: 'red',
    flex: 1,
    backgroundColor: 'white',
    
  },
  searchBar: {
    borderWidth: WIDTH,
    borderColor: 'red',
    height: 34,
    marginBottom: 12,
    marginTop: 12,
    width: width - 16,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  searchText: {
    color: '#999999'
  },
  swipeContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    width: width - 16,
    height: 100,
  },
  draftboxContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    height: 135,
    backgroundColor: '#FFFFFF',
    width: width - 16,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0.2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
    // elevation: 1,
  },
  draftboxHeaderContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    flexDirection: 'row',
    height: 30,
    alignItems: 'flex-end',
    paddingLeft: 15,
    paddingRight: 25,
    
  },
  draftboxHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#949494',
    flex:1,
    paddingBottom: 3,
  },
  draftsScroll: {
    borderWidth: WIDTH,
    borderColor: 'red',
    height:80,
    width: width - 30,
  },
  optionsContainer: {
    borderWidth: WIDTH,
    borderColor: 'green',
    backgroundColor: '#FFFFFF',
    width: width - 16,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0.2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
    // elevation: 1,
  },
  businessContainer: {
    borderWidth: WIDTH,
    borderColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#949494',
    marginLeft:15,
    marginBottom: 12,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 4,
    justifyContent:'center',
    alignItems: 'center',
  },
  insideCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: '#8fb9fd'
  },
  indicatorCell: {
    borderWidth: WIDTH,
    borderColor: 'red',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  indicatorText: {
    fontSize: 13,
    color:'#797979',
    marginTop: 2,
  },
  line: {
    width: (width-200) / 4,
    height: 1,
    borderTopWidth: 1.2,
    backgroundColor: 'white',
    marginBottom: 32,
    borderColor: '#999999',

  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viceContainer: {
    borderColor: 'blue',
    borderWidth: WIDTH,
    height: scrollheight-180,
    justifyContent: 'space-between',
  }
  

})
