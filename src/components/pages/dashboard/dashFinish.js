import React, { Component } from 'react'
import { Platform, StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress'


import DashFinishCell from './dashFinishCell'

const WIDTH = 0

const { height, width } = Dimensions.get('window')

class dashFinish extends Component {
  constructor () {
    super()
    this.state = {
     
    }
  }

  render () {
    
    const { dash } = this.props
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingTop: 35,}}>
          {dash.reverse().map((data, index) => {
            if (data.state == 3) {
              return (
                <DashFinishCell process={data.process} title={data.title} date={data.date} navigation={this.props.navigation} link='error' key={index} width={width} />
              )
            }
          })}
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
  },
  dashCell: {
    height: 80,
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 6,
  }

})


function mapStateToProps(state) {
  return {
    dash: state.dash,
  };
}

function mapDispatchProps(dispatch) {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(dashFinish)