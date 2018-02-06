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
import ConfirmCell from './confirmCell'

const WIDTH = 0
const { height, width } = Dimensions.get('window');

import { addFamilyName, addFirstName, addID } from '../../../actions/appointActions'
import { add } from '../../../actions/dashActions'


class confirm extends Component {
    
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
            calendarInfo: [{date: 15, day: '周一', vacant: [12, 20, 11, 3, 12, 4]},
                            {date: 16, day: '周二', vacant: [20, 20, 2, 5, 9, 4]}, 
                            {date: 17, day: '周三', vacant: [12, 20, 11, 4, 12, 5]}, 
                            {date: 18, day: '周四', vacant: [20, 20, 20, 8, 7, 12]}, 
                            {date: 19, day: '周五', vacant: [12, 20, 10, 2, 1, 20]},
                            {date: 20, day: '周六', vacant: [12, 20, 11, 12, 4, 12]}, 
                            {date: 21, day: '周日', vacant: [12, 20, 11, 20, 12, 17]},],

            activeIndex: {dateIndex: 2, timeIndex: -1},
            selectDayIndex: 2,
        }
    }
    
    goBack(where) {
        this.props.navigation.goBack(where)
    }

    backToIndex() {
        this.props.add('港澳通行证')
        return this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'index' })
                    ]
                }));

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
                    <View style={styles.noColorCircle}>
                        <Text >3</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >4</Text>
                    </View>
                    <View style={styles.colorCircle}>
                        <Text style={{ color: 'white' }}>5</Text>
                    </View>
                </View>

                <Text style={styles.title}>确认所有信息，您就预约成功了</Text>
                {this.state.showText? <Text style={{color: '#aa1a1f', marginBottom: 10}}>请选择其中一个受理单位</Text> : null}
                
                <View style={styles.bodyContainer}>
                    <TouchableOpacity style={styles.activeBtd} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={30} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={styles.centerContainer}>
                        <View style={styles.shadowContainer} >
                            <ScrollView
                                style={styles.scroll}
                                showsVerticalScrollIndicator={true}
                                snapToAlignment='end'
                                contentContainerStyle={{ paddingBottom: 30 }}
                                contentInset={{ top: 0, left: 0, bottom: 20, right: 0 }}
                            >
                                <View style={styles.section}>
                                    <View style={styles.sectionTitle}><Text style={{ color: '#8fb8fd', fontSize: 18, fontWeight: 'bold'}}>个人信息</Text></View>
                                    <ConfirmCell title='姓' value={this.props.info.familyName} />
                                    <ConfirmCell title='名' value={this.props.info.firstName} />
                                    <ConfirmCell title='身份证号' value={this.props.info.id} />
                                    <ConfirmCell title='性别' value={this.props.info.gender} />
                                    <ConfirmCell title='出生地' value={this.props.info.bdp} />
                                    <ConfirmCell title='家庭住址' value={this.props.info.add} />
                                    <ConfirmCell title='联系电话' value={this.props.info.phone} />
                                    <ConfirmCell title='身份' value={this.props.info.utype} />
                                </View>
                                <View style={[styles.section,{marginBottom: 10, borderBottomWidth: 0}]}>
                                    <View style={styles.sectionTitle}><Text style={{ color: '#8fb8fd', fontSize: 18, fontWeight: 'bold' }}>受理时间地点</Text></View>
                                    <ConfirmCell title='时间' value='12月14日（周二）09:30-10:30' />
                                    <ConfirmCell title='地点' value='广州天河区出入境办事厅' />
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={styles.confirmBtd} onPress={() => this.backToIndex()}>
                            <Text style={{color: 'white', fontSize: 18}}>确认</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0} style={[styles.inactvieBtd, {opacity: 0}]}>
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
        flexDirection: 'row',
        borderColor: 'orange',
        borderWidth: WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        overflow: 'hidden'
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
    confirmBtd: {
        height: 40,
        backgroundColor: '#6999FD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#6999FD',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    centerContainer: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        borderColor: 'red',
        borderWidth: WIDTH,
        paddingTop: 30,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: 'white',
        borderRadius: 10,

    },
    section: {
        borderBottomWidth: 1,
        borderColor: '#b9b9b9',
        marginBottom: 20,
    },
    sectionTitle: {
        borderLeftWidth: 4,
        borderColor: '#8fb8fd',
        height: 22,
        paddingLeft: 10,
        justifyContent: 'center',
        marginBottom: 6,
    },
    sectionCell: {
        height: 46,
        borderBottomWidth: 0.5,
        borderColor: '#b9b9b9',
        justifyContent: 'center',
        paddingLeft: 14,
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
        add: bindActionCreators(add, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(confirm)