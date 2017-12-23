import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

function getIndicatorInside(type) {
    switch (type) {
        case 1: {
            return (
                <Ionicons name={'md-checkmark'} size={20} style={{ color: '#8fb9fd', }} />
            )
        }
        case 2: {
            return (
                <View style={styles.insideCircle} />
            )
        }
        case 3: {
            return null
        }
    }
}

export default function indicator(props) {
    const { state, date, type} = props

    switch (type) {
        case 1: {
            return (
                <View style={styles.indicatorCell}>
                    <View style={[styles.circle, styles.circleType3]}>
                         <Ionicons name={'md-checkmark'} size={20} style={{ color: '#8fb9fd', }} />
                    </View>
                    <Text style={styles.indicatorText}>{date}</Text>
                    <Text style={styles.indicatorText} >{state}</Text>
                </View>
            )
        }
        case 2: {
            return (
                <View style={styles.indicatorCell}>
                    <View style={styles.circle}>
                        <View style={styles.insideCircle} />
                    </View>
                    <Text style={[styles.indicatorText, styles.indicatorTextType2]}>{date}</Text>
                    <Text style={[styles.indicatorText, styles.indicatorTextType2]} >{state}</Text>
                </View>
               
            )
        }
        case 3: {
            return (
                <View style={styles.indicatorCell}>
                    <View style={[styles.circle, styles.circleType3]}>
                    </View>
                    <Text style={[styles.indicatorTextType, styles.indicatorTextType3]} >{state}</Text>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    circle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderColor: '#c3c3c3',
        borderWidth: 1,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    insideCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        backgroundColor: '#8fb9fd'
    },
    indicatorCell: {
        borderWidth: WIDTH,
        borderColor: 'red',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    indicatorText: {
        fontSize: 11,
        color: '#c3c3c3',
        marginTop: 2,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorTextType3: {
        marginTop:5,
        marginBottom: 12,
        color: '#c3c3c3', 
        fontSize: 11,
    },
    circleType3: {
        borderColor: '#c3c3c3', 
    },    
    indicatorTextType2: {
        color: '#8fb9fd',
    }

})
