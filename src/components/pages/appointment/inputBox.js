import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default class inputBox extends Component {

    constructor() {
        super()
        this.state= {
            text: '',
            isValid: true,
            isFirst: true,
        }
    }

    
    _textChange(value) {
        this.setState({
            text: value,
            isValid: true,
            isFirst: false,
        })
        console.log(value)
    }

    _checking(text) {
        if (text != '') {
            switch (this.props.placeholder) {
                case '姓': {
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    if (reg.test(this.state.text)) {
                        this.props.setValue('familyName', this.state.text)
                        this.setState({
                            isValid: true,
                        })
                    } else {
                        this.setState({
                            isValid: false,
                        })
                    }
                    break
                }
                case '名': {
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    if (reg.test(this.state.text)) {
                        this.props.setValue('firstName', this.state.text)
                    } else {
                        this.setState({
                            isValid: false,
                        })
                    }
                    break
                }
            }
        } else {
            this.setState({
                isValid: true,
            })
        }
    }

    render() {
        const { placeholder, setValue, width, value } = this.props
        console.log(value)
        return (
            <TextInput
                placeholder={placeholder}
                value={this.state.isFirst ? value : this.state.text}
                onChangeText={(value) => this._textChange(value)}
                onEndEditing={() => this._checking(this.state.text)}
                style={[styles.inputbox, { width: width, borderColor: this.state.isValid ? '#bbbbbb' : '#ff3b30' }]}
            />
        )
    }
    
}

const styles = StyleSheet.create({
    inputbox: {
        height: 52,
        fontSize: 16,
        borderColor: '#bbbbbb',
        borderWidth: 2,
        color: '#6a9ae3',
        textAlign: 'center',
        borderRadius: 6,
        marginRight: 10,
    },

})





