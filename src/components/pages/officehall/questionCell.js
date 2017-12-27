import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

const WIDTH = 0

export default function questionCell(props) {
    const { question, navigation, linkPage, style, num, dismissModal } = props
    return (
        <TouchableOpacity style={[styles.qustionCell, style]} onPress={() => { dismissModal(); navigation.navigate(linkPage) }}>
            <Text style={styles.question}>{num}. {question}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    question: {
        height: 41,
        lineHeight: 41,
        borderColor: '#f3f3f3',
        borderBottomWidth: 0.8,
        color: '#878787',
    },
    qustionCell: {
        borderColor: '#f3f3f3',
        borderBottomWidth: 1,
    }

})









