import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, Button, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView, Animated } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { add } from '../../../actions/dashActions'
import Error from '../error'
import Nodash from '../nodash'
import Dashdraft from './dashDraft'
import AllDash from './allDash'
import DashAppointed from './dashAppointed'
import DashDeliver from './dashDeliver'
import DashFinish from './dashFinish'

const WIDTH = 0
const TAB_NUM = 5
let COUNT = [0, 0, 0, 0]

const { height, width } = Dimensions.get('window');
class dashboard extends Component {

    static navigationOptions = ({ navigation }) => {
        console.log(navigation)
        return {
            headerRight: <TouchableOpacity onPress={() => navigation.navigate('abroad')} style={{ borderColor: 'red', borderWidth: WIDTH, width: 60, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 40, marginBottom: 6 }}>+</Text>
            </TouchableOpacity>,
            headerLeft: <TouchableOpacity onPress={() => navigation.navigate('robot')} style={{ borderColor: 'red', borderWidth: WIDTH, width: 60, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../../app-assets/icon-service.png')} />
            </TouchableOpacity>,
        }
    }

    constructor() {
        super()
        this.state = {
            userFavict: '../../../../app-assets/mine/fav.png',
            tab: [{ title: '全部' }, { title: '填写中' }, { title: '已预约' }, { title: '运送中' }, { title: '已完成' }],
            onPage: 0,
            indicatorLeftMargin: new Animated.Value(0),
            photos: null,
        }
    }

    componentWillMount() {
        console.log(this.props.dash)
        this.props.dash.forEach((data, index) => {
            COUNT[data.state] = COUNT[data.state] + 1
        })
        console.log(COUNT)
    }

    indicatorSlide(page) {
        Animated.parallel([
            // 随时间变化而执行的动画类型
            Animated.spring(
                this.state.indicatorLeftMargin,                      // 动画中的变量值
                {
                    toValue: page * (width / TAB_NUM),
                },
            ),
        ]).start();
    }

    renderBody() {
        switch (this.state.onPage) {
            case 0: {
                if (COUNT[0] == 0 && COUNT[1] == 0 && COUNT[2] == 0 && COUNT[3] == 0 ) {
                    return (
                        <Nodash />
                    )
                } else {
                    return (
                        <AllDash />
                    )
                } 
            }
            case 1: {
                if (COUNT[0] == 0) {
                    return (
                        <Nodash />
                    )
                } else {
                    return (
                        <Dashdraft />
                    )
                } 
                
            }
            case 2: {
                if (COUNT[1] == 0) {
                    return (
                        <Nodash />
                    )
                } else {
                    return (
                        <DashAppointed />
                    )
                } 
            }
            case 3: {
                if (COUNT[2] == 0) {
                    return (
                        <Nodash />
                    )
                } else {
                    return (
                        <DashDeliver />
                    )
                }
            }
            case 4: {
                if (COUNT[3] == 0) {
                    return (
                        <Nodash />
                    )
                } else {
                    return (
                        <DashFinish />
                    )
                }
            }
            default: {
                return (
                    <Nodash />
                )
            }
        }
    }


    render() {

        const { dash } = this.props
        const { username, userPhone, userFavict } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <View style={{ flexDirection: 'row', height: 43 }}>
                        {this.state.tab.map((data, index) => {
                            if (index == this.state.onPage) {
                                return (
                                    <TouchableOpacity activeOpacity={0.9} style={[styles.tab]} key={index} onPress={() => { this.setState({ onPage: index }); this.indicatorSlide(index); }}>
                                        <Text style={{ color: '#8fb8fd', fontSize: 16 }}>{data.title}</Text>
                                    </TouchableOpacity >
                                )
                            } else {
                                return (
                                    <TouchableOpacity activeOpacity={0.9} style={styles.tab} key={index} onPress={() => { this.setState({ onPage: index }); this.indicatorSlide(index); }}>
                                        <Text style={{ color: '#677384', fontSize: 16 }}>{data.title}</Text>
                                    </TouchableOpacity >
                                )
                            }
                        })}
                    </View>

                    <View style={styles.indicatorContainer}>
                        <Animated.View style={[styles.indicator, { marginLeft: this.state.indicatorLeftMargin }]} />
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    {this.renderBody()}
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
        backgroundColor: '#FFFFFF',
    },
    headerBar: {
        flexDirection: 'column',
        height: 45,
        borderColor: '#dedede',
        borderBottomWidth: 1,
    },
    tab: {
        flex: 1,
        paddingTop: 12,
        alignItems: 'center',
    },
    bodyContainer: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    indicatorContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: width,
        height: 2,
        borderWidth:0,
        padding: 0,
    },
    indicator: {
        height: 2,
        borderWidth: 0,
        backgroundColor: '#8fb8fd',
        width: width / TAB_NUM,
        borderRadius: 2,
    }


})


function mapStateToProps(state) {
    return {
        dash: state.dash,
    };
}

function mapDispatchProps(dispatch) {
    return {
        add: bindActionCreators(add, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(dashboard)