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



class calendar extends Component {
    
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


    

    jumpToNextPage() {
        if (this.state.canJump) {
            this.props.navigation.navigate('confirm', { goBackKey: this.props.navigation.state.params.goBackKey })
        } else {
            this.setState({
                showText: true
            })
        }
    }

    changeDay(index) {
        console.log(index)
        this.setState({
            selectDayIndex: index,
            
        })
    }

    changeTime(dayIndex, timeIndex) {
        this.setState({
            activeIndex: {
                dateIndex: dayIndex,
                timeIndex: timeIndex
            },
            canJump: true,
            showText: false,
        })
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
                    <View style={styles.colorCircle}>
                        <Text style={{ color: 'white' }}>4</Text>
                    </View>
                    <View style={styles.noColorCircle}>
                        <Text >5</Text>
                    </View>
                </View>

                <Text style={styles.title}>现在，请选择您的办理时间</Text>
                {this.state.showText? <Text style={{color: '#aa1a1f', marginBottom: 10}}>请选择其中一个受理单位</Text> : null}
                
                <View style={styles.bodyContainer}>
                    <TouchableOpacity style={styles.activeBtd} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={30} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={styles.shadowContainer}>
                    <View 
                        style={styles.filesContainer} 
                        contentContainerStyle={{justifyContent: 'flex-start',alignItems: 'center'}}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment='end'
                        contentInset={{top: 0, left: 0, bottom: 40, right: 0}}
                    >
                      <View style={styles.dateSection}>
                        <TouchableOpacity>
                            <Ionicons name={'ios-arrow-up'} size={30} style={{ color: 'black' }} />
                        </TouchableOpacity>
                        
                            {this.state.calendarInfo.map((data, index) => {
                                    if (index == this.state.selectDayIndex) {
                                        return (
                                            <TouchableOpacity style={{ backgroundColor: '#6899fb' }} onPress={() => this.changeDay(index)} >
                                                <Text style={{ fontSize: 18, color: 'white' }}>{data.day} {data.date}</Text>
                                            </TouchableOpacity>
                                        )
                                    } else {
                                        if (index == this.state.activeIndex.dateIndex) {
                                            return (
                                                <TouchableOpacity style={{ backgroundColor: '#ffcbd3' }} onPress={() => this.changeDay(index)} >
                                                    <Text style={{ fontSize: 18, color: 'white' }}>{data.day} {data.date}</Text>
                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return (
                                                <TouchableOpacity onPress={() => this.changeDay(index)}>
                                                    <Text style={{ fontSize: 18 }}>{data.day} {data.date}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                       
                                    }
                                
                            })}
                            
                        <TouchableOpacity>
                            <Ionicons name={'ios-arrow-down'} size={30} style={{ color: 'black' }} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.timeSection}>
                            <TouchableOpacity style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 0) ? styles.timeCellHightlight:styles.timeCell} onPress={() => this.changeTime(this.state.selectDayIndex, 0)}>
                                    <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 0) ? { fontSize: 16, fontWeight: 'bold', color: 'white' } : { fontSize: 16, fontWeight: 'bold', color: '#6899fb' }}>8:30-9:30  <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 0) ? { color: 'white' } : { color: 'black' }}>({this.state.calendarInfo[this.state.selectDayIndex].vacant[0]}个预约位)</Text></Text>
                            </TouchableOpacity>
                                <TouchableOpacity style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 1) ? styles.timeCellHightlight : styles.timeCell} onPress={() => this.changeTime(this.state.selectDayIndex, 1)}>
                                    <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 1) ? { fontSize: 16, fontWeight: 'bold', color: 'white' } : { fontSize: 16, fontWeight: 'bold', color: '#6899fb' }}>9:30-10:30  <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 1) ? { color: 'white' } : { color: 'black' }}>({this.state.calendarInfo[this.state.selectDayIndex].vacant[1]}个预约位)</Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 2) ? styles.timeCellHightlightMRB30 : styles.timeCellMRB30} onPress={() => this.changeTime(this.state.selectDayIndex, 2)}>
                                    <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 2) ? { fontSize: 16, fontWeight: 'bold', color: 'white' } : { fontSize: 16, fontWeight: 'bold', color: '#6899fb' }}>10:30-11:30  <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 2) ? { color: 'white' } : { color: 'black' }}>({this.state.calendarInfo[this.state.selectDayIndex].vacant[2]}个预约位)</Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 3) ? styles.timeCellHightlight : styles.timeCell} onPress={() => this.changeTime(this.state.selectDayIndex, 3)}>
                                    <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 3) ? { fontSize: 16, fontWeight: 'bold', color: 'white' } : { fontSize: 16, fontWeight: 'bold', color: '#6899fb' }}>14:30-15:30  <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 3) ? { color: 'white' } : { color: 'black' }}>({this.state.calendarInfo[this.state.selectDayIndex].vacant[3]}个预约位)</Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 4) ? styles.timeCellHightlight : styles.timeCell} onPress={() => this.changeTime(this.state.selectDayIndex, 4)}>
                                    <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 4) ? { fontSize: 16, fontWeight: 'bold', color: 'white' } : { fontSize: 16, fontWeight: 'bold', color: '#6899fb' }}>15:30-16:30  <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 4) ? { color: 'white' } : { color: 'black' }}>({this.state.calendarInfo[this.state.selectDayIndex].vacant[4]}个预约位)</Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 5) ? styles.timeCellHightlight : styles.timeCell} onPress={() => this.changeTime(this.state.selectDayIndex, 5)}>
                                    <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 5) ? { fontSize: 16, fontWeight: 'bold', color: 'white' } : { fontSize: 16, fontWeight: 'bold', color: '#6899fb' }}>16:30-17:30  <Text style={(this.state.selectDayIndex == this.state.activeIndex.dateIndex && this.state.activeIndex.timeIndex == 5) ? { color: 'white' } : { color: 'black' }}>({this.state.calendarInfo[this.state.selectDayIndex].vacant[5]}个预约位)</Text></Text>
                                </TouchableOpacity>    
                      </View>  
                    </View>
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
    dateSection: {
        width: 78,
        backgroundColor: '#FFFFFF',
        paddingTop: 22,
        paddingBottom: 22,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRightWidth: 1,
        borderColor: '#dedede',
    },
    timeSection: {
        flex: 1,
        justifyContent: 'center',
    },
    timeCell: {
        height: 49,
        backgroundColor: '#FFFFFF',
        borderColor: '#dedede',
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    timeCellHightlight: {
        height: 49,
        backgroundColor: '#6899fb',
        borderColor: '#dedede',
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    timeCellMRB30: {
        height: 49,
        backgroundColor: '#FFFFFF',
        borderColor: '#dedede',
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
    timeCellHightlightMRB30: {
        height: 49,
        backgroundColor: '#6899fb',
        borderColor: '#dedede',
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(calendar)