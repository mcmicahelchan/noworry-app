import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Dimensions, ScrollView } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons'

const WIDTH = 0

const { height, width } = Dimensions.get('window');

export default class dashboard extends Component {
    constructor() {
        super()
        this.state = {
            text: 'good',
            AnimMargin: new Animated.Value(510),
            
        }
    }

    toTheTop() {
        if (this.state.AnimMargin._value == 510) {
            Animated.spring(
                this.state.AnimMargin,                      // 动画中的变量值
                {
                    toValue: 10,
                },
            ).start()
        } else {
            Animated.spring(
                this.state.AnimMargin,                      // 动画中的变量值
                {
                    toValue: 510,
                },
            ).start() 
        }
        console.log(this.state.AnimMargin)
        
    }

    render() {
        const { AnimMargin } = this.state
        return(
            <View style={styles.outsideContainer}>
                <Animated.View style={{ marginTop: AnimMargin}}>
                    <View style={[styles.dashContainer]}>
                        <TouchableOpacity style={styles.titleSection} activeOpacity={1} onPress={() => this.toTheTop()}>
                            <View style={styles.insideTitleContainer}>
                                <Ionicons name={'ios-search'} size={32} style={{ color: '#8eb3fd', marginTop: 2, marginRight: 6 }} />
                                <Text style={{ fontSize: 20, color: '#5f656a' }}>护照</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.dashBodyContainer}>
                            <ScrollView style={styles.dashScroll}>
                                
                            </ScrollView>
                            <View style={styles.dashFooter}>
                                <Text>+</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
                <Animated.View style={{ marginTop: AnimMargin }}>
                    <View style={[styles.dashContainer]}>
                        <TouchableOpacity style={styles.titleSection} activeOpacity={1} onPress={() => this.toTheTop()}>
                            <View style={styles.insideTitleContainer}>
                                <Ionicons name={'ios-search'} size={32} style={{ color: '#8eb3fd', marginTop: 2, marginRight: 6 }} />
                                <Text style={{ fontSize: 20, color: '#5f656a' }}>护照</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.dashBodyContainer}>
                            <ScrollView style={styles.dashScroll}>

                            </ScrollView>
                            <View style={styles.dashFooter}>
                                <Text>+</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    outsideContainer: {
        borderWidth: WIDTH,
        borderColor: 'black',
        flex: 1,
        backgroundColor: '#fafafa',
    },
    dashContainer: {
        borderWidth: WIDTH,
        borderColor: 'red',
        height: height-180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,

    },
    titleSection: {
        borderWidth: WIDTH,
        borderColor: 'red',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    insideTitleContainer: {
        borderColor: '#999999',
        borderBottomWidth: 1.4,
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        marginBottom: 20,
    },
    dashBodyContainer: {
        borderWidth: WIDTH,
        borderColor: 'blue',
        flex:1,
        marginLeft: 25,
        marginRight: 25,
    },
    dashScroll: {
        borderWidth: WIDTH,
        borderColor: 'red',
        flex: 1,
    },
    dashFooter: {
        height: 60,
    }
})