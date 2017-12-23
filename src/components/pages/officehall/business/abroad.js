import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import BtdSection from './btdSection' 
import BusinessBtd from './businessBtd'

const WIDTH = 0
const { height, width } = Dimensions.get('window')

export default class abroad extends Component {
    constructor() {
        super()
        this.state = {
            userFavict: '../../../../app-assets/mine/fav.png'
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <BtdSection sectionName='业务办理'>
                    <BusinessBtd navigation={this.props.navigation} businessType='广州市户籍预约' icon='md-baseball' linkPage='error' line={true} />
                    <BusinessBtd navigation={this.props.navigation} businessType='广州市户籍预约' icon='md-baseball' linkPage='error' line={true} />
                    <BusinessBtd navigation={this.props.navigation} businessType='广州市户籍预约' icon='md-baseball' linkPage='error' line={false} />
                </BtdSection>
                <BtdSection sectionName='业务查询'>
                    <BusinessBtd navigation={this.props.navigation} businessType='支付方式查询' icon='md-car' linkPage='error' line={true}/>
                    <BusinessBtd navigation={this.props.navigation} businessType='支付方式查询' icon='md-car' linkPage='error' line={true} />
                    <BusinessBtd navigation={this.props.navigation} businessType='支付方式查询' icon='md-car' linkPage='error' line={false} />
                    <BusinessBtd navigation={this.props.navigation} businessType='支付方式查询' icon='md-car' linkPage='error' line={true} />
                </BtdSection>
                <BtdSection sectionName='业务预约'>
                    <BusinessBtd navigation={this.props.navigation} businessType='广州市户籍预约' icon='md-baseball' linkPage='error' line={true} />
                    <BusinessBtd navigation={this.props.navigation} businessType='广州市户籍预约' icon='md-baseball' linkPage='error' line={true} />
                    <BusinessBtd navigation={this.props.navigation} businessType='广州市户籍预约' icon='md-baseball' linkPage='error' line={false} />
                </BtdSection>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: WIDTH,
        borderColor: 'red',
        backgroundColor: 'white',
        paddingTop: 5,
    },
})



