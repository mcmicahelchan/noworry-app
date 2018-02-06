import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Dimensions, Image, TouchableOpacity, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'

import { modify } from '../../../actions/userActions'

import Carousel from 'react-native-snap-carousel'
import Ionicons from 'react-native-vector-icons/Ionicons'

import FileCell from './fileCell'
import InputBox from './inputBox'
import LocationCard from './locationCard'

const WIDTH = 0
const { height, width } = Dimensions.get('window');

import { addFamilyName, addFirstName, addID } from '../../../actions/appointActions'



class location extends Component {
    
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
            locationInfo:[{name: '广州天河分局', distance: 1.2, add: '广州市天河区瘦狗岭路613号', time: '8:30-12:30', tel: '020-81828282'},
                          { name: '广州海珠分局', distance: 2.8, add: '广州市天河区瘦狗岭路613号', time: '8:30-12:30', tel: '020-81828282' },
                          { name: '广州珠海分局', distance: 5.3, add: '广州市天河区瘦狗岭路613号', time: '8:30-12:30', tel: '020-81828282' },
                            { name: '广州天河分局', distance: 8.3, add: '广州市天河区瘦狗岭路613号', time: '8:30-12:30', tel: '020-81828282' },
                            { name: '广州海珠分局', distance: 9.7, add: '广州市天河区瘦狗岭路613号', time: '8:30-12:30', tel: '020-81828282' },
                            { name: '广州珠海分局', distance: 18.1, add: '广州市天河区瘦狗岭路613号', time: '8:30-12:30', tel: '020-81828282' }],
            activeIndex: -1,
            canJump: false,
            showText: false,

        }
    }
    
    goBack(where) {
        this.props.navigation.goBack(where)
    }

    select(index) {
        console.log('select')
        this.setState({
            activeIndex: index,
            showText: false,
            canJump: true,
        })
    }

    jumpToNextPage() {
        if (this.state.canJump) {
            this.props.navigation.navigate('calendar', { goBackKey: this.props.navigation.state.params.goBackKey })
        } else {
            this.setState({
                showText: true
            })
        }
    }

    
    render() {
        const { title } = this.state
        console.log(this.props.navigation.state.key)
        return (
            <View style={styles.container}>
                <View style={styles.indicatorContainer}>
                    <View style={styles.noColorCircle}>
                        <Text >1</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >2</Text>
                    </View>
                    <View style={styles.colorCircle}>
                        <Text style={{ color: 'white' }}>3</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >4</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >5</Text>
                    </View>
                </View>

                <Text style={styles.title}>我们为您推荐如下受理单位</Text>
                {this.state.showText? <Text style={{color: '#aa1a1f', marginBottom: 10}}>请选择其中一个受理单位</Text> : null}
                
                <View style={styles.bodyContainer}>
                    <TouchableOpacity style={styles.activeBtd} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={30} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={styles.shadowContainer}>
                    <ScrollView 
                        style={styles.filesContainer} 
                        contentContainerStyle={{justifyContent: 'flex-start',alignItems: 'center'}}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment='end'
                        contentInset={{top: 0, left: 0, bottom: 40, right: 0}}
                    >
                        {this.state.locationInfo.map((data,index) => {
                            console.log(this.state.activeIndex)
                            if (index == this.state.activeIndex) {
                                return (
                                    <LocationCard select={(number) => this.select(number)} active={true} key={index} num={index} name={data.name} distance={data.distance} add={data.add} time={data.time} tel={data.tel} />
                                )
                            } else {
                                return (
                                    <LocationCard select={(number) => this.select(number)} active={false} key={index} num={index} name={data.name} distance={data.distance} add={data.add} time={data.time} tel={data.tel} />
                                )
                            }
                            
                        })}
                    </ScrollView>
                    </View>
                    <TouchableOpacity activeOpacity={this.state.canJump ? 0.7 : 1} style={this.state.canJump ? styles.activeBtd : styles.inactvieBtd} onPress={() => this.jumpToNextPage()}>
                        <Ionicons name={'ios-arrow-forward'} size={30} style={{ color: 'white' }} />
                    </TouchableOpacity>
                </View>
            </View>
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
    filesContainer: {
        flex: 1,
        borderColor: 'orange',
        borderWidth: WIDTH,
        paddingTop: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
       
    },
    inputPageContainer: {
        flex: 1,
        borderColor: 'orange',
        borderWidth: WIDTH,
        paddingTop: 30,
        paddingLeft: 40,
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
        backgroundColor: '#6999FD',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 35,
    },

    inactiveLocationCard: {
        height: 125,
        width: 263,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        padding: 14,
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(location)