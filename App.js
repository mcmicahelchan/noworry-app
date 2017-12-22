/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Dashboard from './src/components/pages/dashboard/dashboard'
import Mine from './src/components/pages/mine/mine'
import Officehall from './src/components/pages/officehall/officehall'
import Error from './src/components/pages/error'

let TABSTATE = '任务'
let HEADER_INVISIBLE = true

function changeTabTitle (op) {
  if (op == 1) {
    TABSTATE = '任务'
    HEADER_INVISIBLE = true
  } else {
    if (op == 2) {
      TABSTATE = '办事大厅'
      HEADER_INVISIBLE = true
    } else {
      TABSTATE = '我的'
      HEADER_INVISIBLE = false
    }
  }
}

// highlight
var highlightTab = (tabName, focused) => {
  var footerHeight
  if (focused) {
    footerHeight = 1
  } else {
    footerHeight = 0
  }

  var styles = StyleSheet.create({
    tab: {
      flexGrow: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-end'
    },
    labelFooter: {
      height: footerHeight
    }
  })

  return (
    <View style={styles.tab}>
      <Text>
        {tabName}
      </Text>
      <View style={styles.labelFooter} />
    </View>
  )
}

const Maintab = TabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: '任务',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={26} style={focused ? { color: '#8fb9fd' } : {color: '#7b7b7d'}} />
      ),
      labelStyle: {
        fontSize: 20
      },
      tabBarOnPress: ({scene, jumpToIndex}) => {
        changeTabTitle(1)
        jumpToIndex(scene.index)
      }
    }
  },
  Officehall: {
    screen: Officehall,
    navigationOptions: {
      tabBarLabel: '办事大厅',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} size={26} style={focused ? { color: '#8fb9fd' } : {color: '#7b7b7d'}} />
      ),
      labelStyle: {
        fontSize: 20
      },
      tabBarOnPress: ({scene, jumpToIndex}) => {
        changeTabTitle(2)
        jumpToIndex(scene.index)
      }
    }

  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={focused ? 'ios-person' : 'ios-person-outline'} size={26}  style={focused ? { color: '#8fb9fd' } : {color: '#7b7b7d'}}/>
      ),
      tabBarOnPress: ({scene, jumpToIndex}) => {
        changeTabTitle(3)
        jumpToIndex(scene.index)
      }
    }
  }
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 13,
      paddingBottom: 2
    },
  activeTintColor: '#8fb9fd',
  inactiveTintColor: '#7b7b7d',
}
})

const Main = StackNavigator({
  index: {
    screen: Maintab,
    navigationOptions: ({ navigation }) => {
      if (HEADER_INVISIBLE) {
        return {
          title: TABSTATE,
          headerMode: 'none',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#8fb9fd'
          },
          headerTitleStyle: {
            fontSize: 22
          }
        }
      } else {
        return {
          header: null
        }
      }
    }
  },
  error: {
    screen: Error,
    navigationOptions: ({ navigation }) => {
      return {
        title: '此路不通',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#8fb9fd', borderBottomWidth: 0
        },
        headerTitleStyle: {
          fontSize: 22
        }
      }
    }
  }
})

export default class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Main />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
