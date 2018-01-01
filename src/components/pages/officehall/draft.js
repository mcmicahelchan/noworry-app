import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default function draft(props) {
    const { state, type, process, navigation, linkPage } = props

    return (
        <TouchableOpacity style={styles.draftContainer} onPress={() => navigation.navigate(linkPage)} activeOpacity={0.7}>
            <Text style={styles.draftType}>{type}</Text>
            <Text style={styles.draftState}>{state}</Text>
            <Progress.Bar progress={process} width={100} color='#4380FC' borderWidth={0} unfilledColor='#e3e4e5' />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    draftContainer: {
        height: 87,
        width: 117,
        borderRadius: 8,
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 0,
        borderColor: 'white',
        marginLeft: 8,
        marginRight: 8,
        alignItems: 'center',
        padding: 10,
    },
    draftType: {
        fontSize: 25,
        width: 100,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#64708e',
    },
    draftState: {
        fontSize: 16,
        width: 100,
        marginBottom: 10,
        color: '#9a9b9c',
    }

})
