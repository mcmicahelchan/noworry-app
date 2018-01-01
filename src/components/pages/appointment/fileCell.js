import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default function fileCell(props) {
    const { title, item } = props

    return (
        <View style={styles.fileCell}>
            <View style={styles.fileHeaderContainer}>
                <Text style={{ color: '#B0B0B0', fontWeight: 'bold' }}>·  {title}  ·</Text>
            </View>
            <View style={styles.fileBodyContainer}>
                {item.map((data, index) => {
                    return (
                        <View style={styles.fileItemContainer}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#4380FC', marginRight: 10 }} />
                            <Text style={{ fontWeight: 'bold' }}>{data}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fileCell: {
        marginLeft: 27,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderColor: 'red',
        borderWidth: WIDTH,
        marginBottom: 20,
    },
    fileHeaderContainer: {
        paddingBottom: 4,
        borderColor: '#cccccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    fileItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
    }

})
