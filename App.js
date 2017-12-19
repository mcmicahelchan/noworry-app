/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View} from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'

import DashBoard from './components/pages/dashboard/dashboard'
import Mine from './components/pages/mine/mine'

const MainTab = TabNavigator({
  Dashboard: {
    screen: 'Dashboard'
  },
  OfficeHall: {
    screen: 'OfficeHall'
  },
  Mine: {
    screen: 'Mine'
  }
})

const MainStack = StackNavigator({
  MainTab: {
    screen: 'MainTab'
  }
})

export default MainStack
