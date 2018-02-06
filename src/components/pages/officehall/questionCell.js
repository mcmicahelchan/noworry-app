import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

const WIDTH = 0

export default function questionCell(props) {
    const { question, navigation, linkPage, style, num, dismissModal } = props
    return (
        <TouchableOpacity style={[styles.qustionCell, style]} onPress={() => { dismissModal(); navigation.navigate(linkPage) }}>
            <Text style={styles.question}><Text style={{ color: '#6999FD'}}>{num}.</Text> {question}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    question: {
        borderColor: '#f3f3f3',
        fontSize: 16,

    },
    qustionCell: {
        borderColor: '#f3f3f3',
        borderBottomWidth: 1,
        height: 41,
        justifyContent: 'center',
    }

})









