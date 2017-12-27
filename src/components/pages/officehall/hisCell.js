import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

const WIDTH = 0

export default function hisCell (props) {
  const { item, linkPage, navigation, dismissModal } = props
  return (
    <TouchableOpacity style={styles.hisCell} activeOpacity={0.8} onPress={() => {dismissModal(); navigation.navigate(linkPage)}}>
      <Text style={{ alignSelf: 'flex-start', color: '#878787',}}>{item}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  hisCell: {
    height: 31,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'flex-start',
    padding: 15,
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  }

})
