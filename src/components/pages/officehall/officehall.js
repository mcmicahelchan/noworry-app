import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import * as Progress from 'react-native-progress'

import Draft from './draft'
import Option from './option'

const WIDTH = 0

const { height, width } = Dimensions.get('window');

export default class officehall extends Component {
  constructor () {
    super()
    this.state = {
      text: 'good'
    }
  }


  render () {
    console.log('good')
    return (
      <ScrollView style={styles.container} 
      contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}
      showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.searchBar} activeOpacity={1} >
          <Ionicons name={'ios-search'} size={18} style={{ color: '#dedede', marginTop: 2,marginRight: 6 }} />
          <Text style={styles.searchText}>搜索</Text>
        </TouchableOpacity>
        <View style={styles.swipeContainer}>
          <Swiper style={styles.wrapper} 
          showsButtons={false} 
          showsPagination={true} 
          height={78} width={width - 16} 
          activeDotStyle={{height:3,width:6}} 
          dotStyle={{height:2,width:4}} 
          paginationStyle={{position:'absolute', bottom: 2}}
          removeClippedSubviews={false}>
            <View style={styles.slide1}>
              <Image source={require('../../../../app-assets/officehall/banner_1.png')} style={styles.pic} />
            </View>
            <View style={styles.slide2}>
              <Image source={require('../../../../app-assets/officehall/banner_2.png')} style={styles.pic} />
            </View>
            <View style={styles.slide3}>
              <Image source={require('../../../../app-assets/officehall/banner_3.png')} style={styles.pic} />
            </View>
          </Swiper>
        </View>
        <View style={styles.draftboxContainer}>
          <View style={styles.draftboxHeaderContainer}>
              <Text style={styles.draftboxHeaderText}>草稿箱</Text>
              <Ionicons name={'md-create'} size={22} style={{ color: 'grey',marginTop: 5 }} />
          </View>
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.draftsScroll}
            contentContainerStyle={{alignItems: 'center'}}
            pagingEnabled={true}
          >
            <Draft navigation={this.props.navigation} state='信息录入中' process={0.37} type='通行证' linkPage='error'/>
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
            <Option style={styles.option} navigation={this.props.navigation} businessType='交管业务' icon='ios-search' linkPage='error'/> 
            <Option style={styles.option} navigation={this.props.navigation} businessType='出入境业务' icon='ios-search' linkPage='error' /> 
            <Option style={styles.option} navigation={this.props.navigation} businessType='户政业务' icon='ios-search' linkPage='error' /> 
            <Option style={styles.option} navigation={this.props.navigation} businessType='监管业务' icon='ios-search' linkPage='error' /> 
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
  banner: {
    borderWidth: WIDTH,
    borderColor: 'red',
    height: 125, 
    marginLeft: 15,
    marginRight: 15,
  },
  pic: {
    width: width - 16,
    height: 78,
  },
  swipeContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    width: width - 16,
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  draftboxContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    height: 145,
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
    height: 40,
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
    borderColor: 'black',
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: width - 16,
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  option: {
    marginTop: 20,
  }
  

})
