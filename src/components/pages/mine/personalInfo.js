import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, Button, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView, Animated } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { modify } from '../../../actions/userActions'
import Cell from './cell'
import Error from '../error'
import BasicInfo from './basicInfo'

const WIDTH = 0

const { height, width } = Dimensions.get('window');
class personalInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation
    console.log(navigation)
    return {
      headerRight:<TouchableOpacity style={{marginRight:10,}} onPress={() => navigation.navigate('error')}>
        <Text style={{color: 'white', fontSize: 16}}>OCR识别</Text>
      </TouchableOpacity>
    }
  }
  
  constructor () {
    super()
    this.state = {
      userFavict: '../../../../app-assets/mine/fav.png',
      tab: [{ title: '基本信息' }, { title: '户籍信息'}, { title: '出入境信息'}, { title: '智能信息' }],
      onPage: 0,
      indicatorLeftMargin: new Animated.Value(0),
      photos: null,
    }
  }

  indicatorSlide(page) {
    Animated.parallel([
      // 随时间变化而执行的动画类型
      Animated.spring(
        this.state.indicatorLeftMargin,                      // 动画中的变量值
        {
          toValue: page * (width / 4),
        },
      ),
    ]).start();
  }

  renderBody() {
    switch(this.state.onPage) {
      case 0: {
        return (
          <BasicInfo/>
        )
      }
      default: {
        return (
          <Error />
        )
      }
    }
  }


  render () {
    
    const {user, modify} = this.props
    const { username, userPhone, userFavict } = this.state
    return (
      <View style={styles.container}>
          <View style={styles.headerBar}>
          <View style={{flexDirection: 'row', height: 43}}>
            {this.state.tab.map((data, index) => {
              if (index == this.state.onPage) {
                return (
                  <TouchableOpacity activeOpacity={0.9} style={[styles.tab]} key={index} onPress={() => { this.setState({ onPage: index }); this.indicatorSlide(index); }}>
                    <Text style={{ color: '#8fb8fd', fontSize: 16 }}>{data.title}</Text>
                  </TouchableOpacity >
                )
              } else {
                return (
                  <TouchableOpacity activeOpacity={0.9} style={styles.tab} key={index} onPress={() => { this.setState({ onPage: index }); this.indicatorSlide(index); }}>
                    <Text style={{ color: '#677384', fontSize: 16 }}>{data.title}</Text>
                  </TouchableOpacity >
                )
              }
            })}
          </View>
          
          <View style={styles.indicatorContainer}>
            <Animated.View style={[styles.indicator, {marginLeft: this.state.indicatorLeftMargin}]} />
          </View>
          </View>
          <View style={styles.bodyContainer}>
          {this.renderBody()}
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: WIDTH,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flexDirection: 'column',
    height: 45,
    borderColor: '#dedede',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingTop: 12,
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  indicatorContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: width,
    height: 2,
  },
  indicator: {
    height: 2,
    backgroundColor: '#8fb8fd',
    width: width/4,
    borderRadius: 2,
  }
  

})


function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchProps(dispatch) {
  return {
    modify: bindActionCreators(modify, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(personalInfo)