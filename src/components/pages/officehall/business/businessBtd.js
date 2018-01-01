import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0
const { height, width } = Dimensions.get('window')

export default function businessBtd(props) {
    const { businessType, icon, navigation, linkPage, line } = props

    return (
        <TouchableOpacity style={line ? styles.btdContainerWithLine : styles.btdContainer} activeOpacity={0.8} onPress={() => navigation.navigate(linkPage)} >
            <Ionicons name={icon} size={34} style={{ color: '#4380FC' }} />
            <Text style={styles.draftType}>{businessType}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btdContainer: {
        borderWidth: WIDTH,
        borderColor: 'red',
        height: 60,
        width: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    draftType: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 2,
        color: '#64708e',

    },
    btdContainerWithLine: {
        borderRightWidth: 0.5,
        borderColor: '#e4e4e4',
        height: 60,
        width: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,

    },

})
