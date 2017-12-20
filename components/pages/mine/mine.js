import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Cell from './cell'

const WIDTH = 0

export default class mine extends Component {
  constructor () {
    super()
    this.state = {
      text: 'good',
      username: '美丽的用户',
      userPhone: '13900001234',
      userFavict: '../../../app-assets/mine/fav.png'
    }
  }

  render () {
    console.log(this.props.navigation)
    const { username, userPhone, userFavict } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerInfo}>
          <View style={styles.infoContainer}>
            <Image source={require('../../../app-assets/mine/fav.png')} style={styles.fav} />
            <View style={styles.infoText}>
              <Text style={styles.name}>
                {username}
              </Text>
              <Text style={styles.phone}>
                {userPhone}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btdContainer} onPress={() =>this.props.navigation.navigate('error')}>
            <Ionicons name={'md-create'} size={26} style={{ color: 'white' }} />
          </TouchableOpacity>
        </View>

        <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='个人信息库' icon='md-person' iconColor='#ffcc00' linkPage='error' isLast={true} />
        </View>
        <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='我的草稿箱' icon='md-document' iconColor='#8fb9fd' linkPage='error' isLast={false} />
            <Cell navigation={this.props.navigation}  title='我的办理历史' icon='md-time' iconColor='#8fb9fd' linkPage='error' isLast={true} />
        </View>
        <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='设置' icon='md-cog' iconColor='#aaaaaa' linkPage='error' isLast={true} />
        </View>
         <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='关于App' icon='md-alert' iconColor='#8fb9fd' linkPage='error' isLast={true} />
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
  },
  headerInfo: {
    borderColor: 'green',
    borderWidth: WIDTH,
    height: 145,
    backgroundColor: '#8fb9fd',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 55,
  },
  fav: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8

  },
  phone: {
    fontSize: 14,
    color: 'white'
  },
  btdContainer: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    width: 70,
    height: 70,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40
  },
  infoText: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    marginLeft: 18
  },
  cellsContainer: {
    borderColor: '#dedede',
    borderWidth: 0.5,
    marginTop: 20,
    paddingBottom: 1,
  },

})
