import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default class inputBoxMul extends Component {

    constructor() {
        super()
        this.state = {
            text: '',
            isValid: true,
            isFirst: true,
            isNull: false,
        }
    }


    _textChange(value) {
        this.setState({
            text: value,
            isValid: true,
            isFirst: false,
            isNull: false,
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
                case '身份证号': {
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    if (reg.test(this.state.text)) {
                        this.props.setValue('id', this.state.text)
                    } else {
                        this.setState({
                            isValid: false,
                        })
                    }
                    break
                }
                case '联系电话': {
                    var reg = /(^\d{11}$)/;
                    if (reg.test(this.state.text)) {
                        this.props.setValue('phone', this.state.text)
                    } else {
                        this.setState({
                            isValid: false,
                        })
                    }
                    break
                }
                case '出生地': {
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    if (reg.test(this.state.text)) {
                        this.props.setValue('bdp', this.state.text)
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
                isNull: true,
            })
            switch (this.props.placeholder) {
                case '姓': {
                    this.props.setValue('familyName', this.state.text)
                    break
                }
                case '名': {
                    this.props.setValue('firstName', this.state.text)
                    break
                }
                case '身份证号': {
                    this.props.setValue('id', this.state.text)
                    break
                }
                case '联系电话': {
                    this.props.setValue('phone', this.state.text)
                    break
                }
                case '出生地': {
                    this.props.setValue('bdp', this.state.text)
                    break
                }
            }
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.null == true) {
            if (this.state.isValid == true && this.state.text == '') {
                this.setState({
                    isNull: true,
                })
            }
        }
    }

    componentDidMount() {
        this.setState({
            text: this.props.value
        })
    }

    render() {
        const { placeholder, setValue, width, value } = this.props
        console.log(value)

        return (
            <View>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor='#B1C6E6'
                    underlineColorAndroid='transparent'
                    value={this.state.isFirst ? value : this.state.text}
                    onChangeText={(value) => this._textChange(value)}
                    onEndEditing={() => this._checking(this.state.text)}
                    multiline={true}
                    style={[styles.inputbox, { width: width, borderColor: (this.state.isValid && !this.state.isNull) || (!this.state.isValid && this.state.isNull) ? '#bbbbbb' : '#aa1a1f' }]}
                />
                {this.state.isValid ? null : <Text style={{ marginTop: 5, color: '#aa1a1f' }}>请填入正确的{placeholder}</Text>}
                {(!this.state.isNull) ? null : <Text style={{ marginTop: 5, color: '#aa1a1f' }}>请填入{placeholder}</Text>}
            </View>

        )
    }

}

const styles = StyleSheet.create({
    inputbox: {
        height: 64,
        fontSize: 18,
        borderColor: '#bbbbbb',
        borderWidth: 2,
        color: 'black',
        textAlign: 'center',
        borderRadius: 6,
        marginRight: 10,
        padding: 10,
    },

})





