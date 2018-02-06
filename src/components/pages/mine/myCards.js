import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TouchableHighlight, ScrollView, KeyboardAvoidingView, CameraRoll } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { modify } from '../../../actions/userActions'
import Cell from './cell'
import { Dropdown } from 'react-native-material-dropdown'

import FileCell from '../appointment/fileCell'
import InputBox from '../appointment/inputBox'
import InputBoxMul from '../appointment/inputBoxMul'
import CardCell from './cardCell'


import { addFamilyName, addFirstName, addID, addPhone, addAdd, addBDP, addGender, addUType } from '../../../actions/appointActions'

const WIDTH = 0
const { height, width } = Dimensions.get('window')



class myCards extends Component {
    
    static navigationOptions = ({ navigation }) => {
        console.log(navigation)
        return {
            headerRight: <TouchableOpacity onPress={() => navigation.navigate('abroad')}  style={{borderColor: 'red', borderWidth: WIDTH,width: 60, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 40, marginBottom: 6}}>+</Text>
                         </TouchableOpacity>,
        }
    }
    
    constructor() {
        super()
        this.state = {
           
        }
    }

   
    render() {
        return (
           <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <View style={styles.sectionTitle}><Text style={{ color: '#8fb8fd', fontSize: 18, fontWeight: 'bold' }}>失效证件</Text></View>
                    <View style={styles.cardsContainer}>
                        <CardCell style={styles.option} navigation={this.props.navigation} type='港澳通行证' icon='md-car' process={0} linkPage='abroad' date='2017-12-11'/>
                        <CardCell style={styles.option} navigation={this.props.navigation} type='gogo会员证' icon='md-car' process={0} linkPage='abroad' date='2017-12-11'/>
                        <CardCell style={styles.option} navigation={this.props.navigation} type='校园卡' icon='md-car' process={0} linkPage='abroad' date='2017-12-11'/>
                        
                    </View>   
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionTitle}><Text style={{ color: '#8fb8fd', fontSize: 18, fontWeight: 'bold' }}>有效证件</Text></View>
                    <View style={styles.cardsContainer}>
                        <CardCell style={styles.option} navigation={this.props.navigation} type='身份证' icon='md-car' process={0.70} linkPage='abroad' date='2023-5-8'/>
                        <CardCell style={styles.option} navigation={this.props.navigation} type='学生证' icon='md-car' process={0.23} linkPage='abroad' date='2019-1-8'/>
                        <CardCell style={styles.option} navigation={this.props.navigation} type='苹果开发证书' icon='md-car' process={0.12} linkPage='abroad' date='2018-12-7'/>
                        
                    </View>   
                </View>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: WIDTH,
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 35,
    },
    section: {
        borderBottomWidth: 0,
        borderColor: '#b9b9b9',
        marginBottom: 20,
        marginLeft: 24,
        marginRight: 24,
    },
    sectionTitle: {
        borderLeftWidth: 4,
        borderColor: '#8fb8fd',
        height: 22,
        paddingLeft: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    option: {
        marginTop: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
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
)(myCards)