import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function nodash (props) {
  const { title  } = props
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <Image source={require('../../../app-assets/nodash.png')} style={{height: 150, width: 150}}  />
      <Text style={{ color: '#677384', fontSize: 20, textAlign: 'center', marginTop: 10}}>暂时没有相关业务</Text>
    </View>
  )
}

