import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default function cardCell(props) {
    const { date, type, process, navigation, linkPage } = props
    if (process == 0) {
        return (
            <TouchableOpacity style={styles.draftContainer} onPress={() => navigation.navigate(linkPage)} activeOpacity={0.7}>
                <Text style={styles.draftType}>{type}</Text>
                <Text style={styles.draftState}>{date} 已过期</Text>
                <Progress.Bar progress={process} width={120} color='#6999FD' borderWidth={0} unfilledColor='#e3e4e5' />

            </TouchableOpacity>
        )
    } else {
       return (
            <TouchableOpacity style={styles.draftContainer} onPress={() => navigation.navigate(linkPage)} activeOpacity={0.7}>
                <Text style={styles.draftType}>{type}</Text>
                <Text style={[styles.draftState, {color: '#6999FD'}]}>至 {date}</Text>
                <Progress.Bar progress={process} width={120} color='#6999FD' borderWidth={0} unfilledColor='#e3e4e5' />

            </TouchableOpacity>
        ) 
    }
    
}

const styles = StyleSheet.create({
    draftContainer: {
        height: 89,
        width: 146,
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
        padding: 10,
        marginBottom: 20,
    },
    draftType: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#60708B',
        
    },
    draftState: {
        fontSize: 14,
        width: 120,
        marginBottom: 10,
        color: '#9E9E9E',
        textAlign: 'left'
    }

})
