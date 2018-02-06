import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default class locationCard extends Component {

    constructor() {
        super()
        this.state = {
            text: '',
            isValid: true,
            isFirst: true,
            isNull: false,
        }
    }


   
    render() {
        const { name, distance, add, time, tel, key, num, active, select } = this.props
        if (active) {
            return (
                <TouchableOpacity style={styles.activeLocationCard} onPress={() => select(num)}>
                    <View style={styles.locationCardHeader}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{num+1}.{name}</Text>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>距您<Text style={{ color: '#ffba21', fontSize: 16, fontWeight: 'bold' }}>{distance}</Text>km</Text>
                    </View>
                    <View style={styles.locationCardBody}>
                        <View style={styles.locationCardLocation}>
                            <Ionicons name={'md-locate'} size={20} style={{ color: 'white' }} />
                            <Text style={{ color: 'white', fontSize: 15, marginLeft: 4 }}>{add}</Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>办公时间：{time}</Text>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>电话：{tel}</Text>

                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.inactiveLocationCard} onPress={() => select(num)}>
                    <View style={styles.locationCardHeader}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{num+1}.{name}</Text>
                        <Text style={{ color: '#8d8d8d', fontSize: 16, fontWeight: 'bold' }}>距您<Text style={{ color: '#ffba21', fontSize: 16, fontWeight: 'bold' }}>{distance}</Text>km</Text>
                    </View>
                    <View style={styles.locationCardBody}>
                        <View style={styles.locationCardLocation}>
                            <Ionicons name={'md-locate'} size={20} style={{ color: '#6999FD' }} />
                            <Text style={{ color: '#8d8d8d', fontSize: 15, marginLeft: 4 }}>{add}</Text>
                        </View>
                        <Text style={{ color: '#8d8d8d', fontSize: 15, marginLeft: 20 }}>办公时间：{time}</Text>
                        <Text style={{ color: '#8d8d8d', fontSize: 15, marginLeft: 20 }}>电话：{tel}</Text>

                    </View>
                </TouchableOpacity>
            )
        }
        
    }

}

const styles = StyleSheet.create({
    inactiveLocationCard: {
        height: 125,
        width: 263,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        padding: 14,
        marginBottom: 20
    },
    activeLocationCard: {
        height: 125,
        width: 263,
        borderRadius: 8,
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#6999FD',
        shadowColor: '#6999FD',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    locationCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    locationCardLocation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationCardBody: {
        justifyContent: 'space-between',
        flex: 1,
        marginTop: 5,
    }

})





