import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default function btdSection(props) {
    const { sectionName, children } = props

    return (
        <View style={styles.section} >
            <Text style={styles.title}>{sectionName}</Text>
            <View style={styles.allBtdContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 12,
        marginBottom: 20,
    },
    title: {
        marginTop: 8,
        marginBottom: 6,
        fontSize: 22,
        color: '#949494',
        fontWeight: 'bold',
    },
    allBtdContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

})
