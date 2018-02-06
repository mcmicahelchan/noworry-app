import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function error (props) {
  const { title  } = props
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4e8eb'}}>
      <Image source={require('../../../app-assets/404.png')}  />
      <Text style={{ color: '#677384', fontSize: 20, textAlign: 'center', marginTop: 10 }}>暂未开发</Text>
    </View>
  )
}

