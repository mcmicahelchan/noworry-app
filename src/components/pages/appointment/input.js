import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Picker, TextInput, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { modify } from '../../../actions/userActions'

import Carousel from 'react-native-snap-carousel'
import { Dropdown } from 'react-native-material-dropdown'

import FileCell from './fileCell'
import InputBox from './inputBox'
import InputBoxMul from './inputBoxMul'

const WIDTH = 0
const { height, width } = Dimensions.get('window');

import { addFamilyName, addFirstName, addID, addPhone, addAdd, addBDP, addGender, addUType } from '../../../actions/appointActions'

const backAction = NavigationActions.back({
    key: 'id-1514975351207-1'
})


class input extends Component {
    
    static navigationOptions = ({ navigation }) => {
        const { goBack } = navigation
        console.log(navigation)
        return {
            title: '大家好',
            headerLeft: <TouchableOpacity onPress={() => { console.log('hi'); navigation.goBack(navigation.state.params.goBackKey) }} style={{ marginLeft: 10 }}>
                <Ionicons name={'ios-arrow-back'} size={30} style={{ color: 'white', marginLeft: 10, marginRight: 10 }} />
            </TouchableOpacity>,
        }
    }

    

    
    constructor() {
        super()
        this.state = {
            index: [1,0,0,0,0],
            data: [{ name: '1' }, { name: '2', }, { name: '3' }, { name: '4' }, { name: '5' }],
            title: ['这是您要准备的资料', '现在，请填写您的信息', '我们为您推荐如下受理单位', '现在，请选择您的办理时间', '最后，请确认一下您的所有信息'],
            toJudegeNull: false,
            canJump: false
        }
    }

    _setValue(type, value) {
        console.log('wtf')
        switch(type) {
            case 'familyName': {
                this.props.addFamilyName(value)
                break
            }
            case 'firstName': {
                this.props.addFirstName(value)
                break
            }
            case 'id': {
                console.log('here')
                this.props.addID(value)
                break
            }
            case 'phone': {
                console.log('here')
                this.props.addPhone(value)
                break
            }
            case 'add': {
                console.log('here')
                this.props.addAdd(value)
                break
            }
            case 'bdp': {
                console.log('here')
                this.props.addBDP(value)
                break
            }
        }
    }

    _renderLowerIndicator(index) {
        for (let i=1; i <= 5; i++) {
            if (index == i) {
                return(
                    <View style={styles.colorDot} />
                )
            } else {
                return (
                    <View style={styles.noColorDot} />
                )
            }
        }
    }

    _setIndex(slideIndex) {
        let newIndex = []
        for (let i = 0; i < 5; i++) {
            if (i == slideIndex) {
                newIndex[i] = 1
            } else {
                newIndex[i] = 0
            }
        }
        this.setState({
            index: newIndex,
        })
    }

    onSelect(value, label) {
        this.props.addUType(value)
    }

    jumpToNextPage() {
        console.log(this.state.canJump)
        if (this.state.canJump) {
            this.props.navigation.navigate('location', { goBackKey: this.props.navigation.state.params.goBackKey })
        } else {
            this.setState({
                toJudegeNull: true
            })
        }
    }

    componentWillMount() {
        let isValid = true
        console.log(this.props.info)
        if (this.props.info.firstName != '' && this.props.info.familyName != '' && this.props.info.add != '' && this.props.info.bdp != '' && this.props.info.gender != '' && this.props.info.phone != '' && this.props.info.utype != '') {
            this.setState({
                canJump: true,
            })
            console.log('set it to true')
        } else {
            this.setState({
                canJump: false,
            })
        }

        console.log(this.state.canJump)

    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('componentWillReceiveProps',nextProps)
        let isValid = true
        if (nextProps.info.firstName != '' && nextProps.info.familyName != '' && nextProps.info.add != '' &&nextProps.info.bdp != '' && nextProps.info.gender != '' && nextProps.info.phone != '' && nextProps.info.utype != '') {
            this.setState({
                canJump: true,
                
            })
            console.log('set it to true')
        } else {
            this.setState({
                canJump: false,
            })
        }
        console.log('can it jump', this.state.canJump)
    }

    render() {
        const { title } = this.state
        let userTypeOption = [
            {
                value: '在读',
            },{
            value: '在职',
        }, {
            value: '无业',
        }]

        let genderOption = [
        {
            value: '男',
        }, {
            value: '女',
        }, {
            value: '人妖',
        }]
        console.log(this.props)
        console.log(Platform.OS)
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={Platform.OS == 'ios' ? 60 : -500}>
                <KeyboardAvoidingView style={styles.indicatorContainer}>
                    <View style={styles.noColorCircle}>
                        <Text >1</Text>
                    </View>
                    <View style={styles.colorCircle}>
                        <Text style={{ color: 'white' }} >2</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >3</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >4</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >5</Text>
                    </View>
                </KeyboardAvoidingView>

                <Text style={styles.title}>现在，请填写您的信息</Text>
                
                <View style={styles.bodyContainer}>
                    <TouchableOpacity style={styles.activeBtd} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={30} style={{color:'white'}} />
                    </TouchableOpacity>
                    
                    <View style={styles.shadowContainer}>
                        <ScrollView 
                            style={styles.inputPageContainer}
                            showsVerticalScrollIndicator={true}
                            snapToAlignment='end'
                            contentContainerStyle={{ paddingBottom: 30}}
                            contentInset={{top: 0, left: 0, bottom: 20, right: 0}}
                        >
                            <View style={styles.inputSection}>
                                <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>姓名</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <InputBox null={this.state.toJudegeNull} placeholder='姓' width={74} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.familyName} />
                                    <InputBox null={this.state.toJudegeNull} placeholder='名' width={138} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.firstName} />
                                </View>
                            </View>
                            <View style={styles.inputSection}>
                                <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>性别</Text>
                                <Dropdown
                                    animationDuration={0}
                                    data={genderOption}
                                    containerStyle={styles.selector}
                                    labelHeight={0}
                                    fontSize={18}
                                    pickerStyle={{}}
                                    value={this.props.info.gender == '' ? '请选择您的性别' : this.props.info.gender}
                                    rippleInsets={{ top: 0, bottom: 0 }}
                                    onChangeText={(value, index, data) => { this.props.addGender(value) }}
                                />
                            </View>
                            <View style={styles.inputSection}>
                                <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>家庭住址</Text>
                                <InputBoxMul  placeholder='家庭住址' width={221} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.add} />
                            </View>
                            <View style={styles.inputSection}>
                                <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>身份证号</Text>
                                <InputBox null={this.state.toJudegeNull} placeholder='身份证号' width={221} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.id} />
                            </View>
                            <View style={styles.inputSection}>
                                <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>身份</Text>
                                <Dropdown
                                    animationDuration={0}
                                    data={userTypeOption}
                                    containerStyle={styles.selector}
                                    labelHeight={0}
                                    fontSize={18}
                                    pickerStyle={{}}
                                    value={this.props.info.utype == '' ? '请选择您的身份' : this.props.info.utype}
                                    rippleInsets={{ top: 0, bottom: 0}}
                                    onChangeText={(value, index, data) => {this.props.addUType(value)}}
                                />
                                
                            </View>
                            <View style={styles.inputSection}>
                                <Text  style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>联系电话</Text>
                                <InputBox null={this.state.toJudegeNull} placeholder='联系电话' width={221} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.phone} />
                            </View>
                            <View style={styles.inputSection}>
                                <Text  style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>出生地</Text>
                                <InputBox null={this.state.toJudegeNull} placeholder='出生地' width={221} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.bdp} />
                            </View>
                        </ScrollView>
                    </View>

                    <TouchableOpacity activeOpacity={this.state.canJump ? 0.7 : 1} style={this.state.canJump ? styles.activeBtd : styles.inactvieBtd} onPress={() => this.jumpToNextPage()}>
                        <Ionicons name={'ios-arrow-forward'} size={30} style={{ color: 'white' }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: WIDTH,
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    slide: {
        borderColor: 'red',
        borderWidth: WIDTH,
    },
    item: {
        width: width - 80,
        height: 464,
        borderColor: 'green',
        borderWidth: WIDTH,
        shadowColor: 'grey',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // elevation: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    carouselContainer: {
        height: 484,
        borderColor: 'green',
        borderWidth: 0,
        marginBottom: 10,
        marginTop: 15,
    },
    colorDot: { 
        height: 10, 
        width: 10, 
        borderRadius: 5, 
        borderColor: '#949494', 
        borderWidth: 0.5,
        backgroundColor: '#6999FD'
    },
    noColorDot: { 
        height: 10, 
        width: 10, 
        borderRadius: 5, 
        borderWidth: 0.5,
        borderColor: '#949494', 
    },
    indicatorContainer: {
        height: 35,
        width: 140,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: WIDTH,
        justifyContent: 'space-between',  
    },
    upperIndicatorContainer: {
        borderColor: 'green',
        borderWidth: WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        height: 25,
        width: 25,
        borderRadius: 16,
        borderColor: '#e9e9e9',
        borderWidth: 1.5,
        backgroundColor: '#6999FD',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    noColorCircle: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        borderWidth: 1.5,
        borderColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputPageContainer: {
        flex: 1,
        borderColor: 'red',
        borderWidth: WIDTH,
        paddingTop: 30,
        paddingLeft: 40,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    inputbox: {
        height:52,
        fontSize: 16,
        borderColor: '#bbbbbb',
        borderWidth: 2,
        color: '#6a9ae3',
        textAlign: 'center',
        borderRadius: 6,
        marginRight: 10,
    
    },
    inputSection: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    bodyContainer: {
        borderColor: 'yellow',
        borderWidth: WIDTH,
        marginBottom: 15,
        width: width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    activeBtd: {
        width: 37,
        height: 181,
        backgroundColor: '#6999FD',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 35,
    },
    inactvieBtd: {
        width: 37,
        height: 181,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 35,
    },
    shadowContainer: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    selector: {
        width: 221,
        height: 52,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',

    }


})


function mapStateToProps(state) {
    return {
        info: state.appoint,
    };
}

function mapDispatchProps(dispatch) {
    return {
        addFamilyName: bindActionCreators(addFamilyName, dispatch),
        addFirstName: bindActionCreators(addFirstName, dispatch),
        addID: bindActionCreators(addID, dispatch),
        addPhone: bindActionCreators(addPhone, dispatch),
        addAdd: bindActionCreators(addAdd, dispatch),
        addBDP: bindActionCreators(addBDP, dispatch),
        addUType: bindActionCreators(addUType, dispatch),
        addGender: bindActionCreators(addGender, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(input)