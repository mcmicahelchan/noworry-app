import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View} from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'

export default class mine extends Component {
    constructor() {
        super()
        this.state = {
            text: 'good'
        }
    }

    render() {
        return(
            <Text>mine</Text>
        )
    }
}