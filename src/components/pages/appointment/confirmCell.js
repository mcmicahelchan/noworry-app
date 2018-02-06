import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default class confirmCell extends Component {

    constructor() {
        super()
        this.state= {
            text: '',
            isValid: true,
            isFirst: true,
            isNull: false,
        }
    }

    render() {
        const { title, value } = this.props
        
        return (
            
                <View style={styles.sectionCell}>
                    <Text style={{ color: '#bababa', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{title}</Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>{value}</Text>
                </View>
            
        )
    }
    
}

const styles = StyleSheet.create({
    sectionCell: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.6,
        borderColor: '#ececec',
        justifyContent: 'center',
        paddingLeft: 14,
    }

})





