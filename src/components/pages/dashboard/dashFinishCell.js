import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress'

const WIDTH = 0

export default function dashDraftCell(props) {
  const { title, link, navigation, process, width, date } = props
  

  return (
    <TouchableOpacity style={[styles.dashCell, {width: width - 40}]}>
      <View style={styles.rect}></View>
      <View style={styles.dashInfo}>
        <Text style={{ color: '#60708B', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ color: '#9E9E9E' }}>有效期至{date}</Text>
        <Progress.Bar progress={process} width={width - 80} color='#6999FD' borderWidth={0} unfilledColor='#e3e4e5' />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
 
  dashCell: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 20,
    marginRight: 20,
    // borderColor: 'red',
    // borderWidth: 1,
   
    // shadowColor: 'grey',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    // elevation: 1,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 30,
    alignItems: 'center',
     borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  dashInfo: {
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    flex: 1,
    height: 80
  },
  rect: {
    backgroundColor: '#509DDD',
    height: 16,
    width: 10,
  }
})
