import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Animated, Easing } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'

export default class dashboard extends Component {
    constructor() {
        super()
        this.state = {
            text: 'good',
            fadeAnim: new Animated.Value(0),
            marginAnim: new Animated.Value(10),
        }
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(
                this.state.fadeAnim,                      // 动画中的变量值
                {
                    toValue: 1,
                    duration: 2000,
                },
            ),                            // 随时间变化而执行的动画类型
            Animated.decay(
                this.state.marginAnim,                      // 动画中的变量值
                {
                    toValue: 200,
                },
            ), 
        ]).start();                                  // 开始执行动画
    }

    render() {
        return(
            <Animated.View style={{ opacity: this.state.fadeAnim, marginLeft: this.state.marginAnim }}>
                <Text>dashboard</Text>
            </Animated.View>
        )
    }
}