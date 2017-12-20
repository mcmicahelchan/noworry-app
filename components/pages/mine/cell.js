import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

const WIDTH = 0

export default function cell (props) {
  const { title, linkPage, icon, navigation, iconColor, isLast } = props
  cellInsideContainer = isLast ? styles.cellInsideContainerWithoutBottom : styles.cellInsideContainer

  return (
    <TouchableOpacity style={styles.cell} onPress={() => navigation.navigate(linkPage)}>
      <View style={cellInsideContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={26} style={{ color: iconColor }} />
        </View>
        <Text style={styles.cellText}>
          {title}
        </Text>
        <View style={styles.forwardContainer}>
          <Ionicons name={'ios-arrow-forward'} size={26} style={{ color: 'grey' }} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    height: 44,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  forwardContainer: {
    borderColor: 'black',
    borderWidth: WIDTH,
    flexDirection: 'row',
    flex: 1,
    marginRight: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cellInsideContainer: {
    borderColor: '#dedede',
    flex: 1,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  cellInsideContainerWithoutBottom: {
    flex: 1,
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  cellText: {
    marginLeft: 10,
    fontSize: 15
  },
  iconContainer: {
    borderColor: 'black',
    borderWidth: WIDTH,
    width: 30,
    paddingLeft: 2,
  }

})
