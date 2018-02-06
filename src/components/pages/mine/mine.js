import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { modify } from '../../../actions/userActions'
import Cell from './cell'

const WIDTH = 0


class mine extends Component {
  
  
  constructor () {
    super()
    this.state = {
      userFavict: '../../../../app-assets/mine/fav.png'
    }
  }

  render () {
    
    const {user, modify} = this.props
    const { username, userPhone, userFavict } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerInfo}>
          <View style={styles.infoContainer}>
            <Image source={require('../../../../app-assets/mine/fav.png')} style={styles.fav} />
            <View style={styles.infoText}>
              <Text style={styles.name}>
                {user.name}
              </Text>
              <Text style={styles.phone}>
                {user.phone}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.cellsContainer]}>
          <Cell navigation={this.props.navigation} title='个人信息库' icon='md-person' iconColor='#66c2fd' linkPage='personalInfo' isLast={false} />
          <Cell navigation={this.props.navigation} title='我的证件' icon='md-card' iconColor='#ff7e6b' linkPage='myCards' isLast={false} />
          <Cell navigation={this.props.navigation} title='浏览记录' icon='md-time' iconColor='#f1e04c' linkPage='error' isLast={true} />
        </View>
        <View style={styles.cellsContainer}>
          <Cell navigation={this.props.navigation} title='使用帮助' icon='md-help-circle' iconColor='#4cdb7d' linkPage='error' isLast={false} />
          <Cell navigation={this.props.navigation} title='设置' icon='md-cog' iconColor='#aa86fc' linkPage='error' isLast={true} />
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
  headerInfo: {
    borderColor: 'green',
    borderWidth: WIDTH,
    height: 145,
    backgroundColor: '#4380FC',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 55,
  },
  fav: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8

  },
  phone: {
    fontSize: 14,
    color: 'white'
  },
  btdContainer: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    width: 70,
    height: 70,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
  },
  infoText: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    marginLeft: 18
  },
  cellsContainer: {
    borderColor: '#dedede',
    borderWidth: 1,
    marginBottom: 20,
    paddingBottom: 1,
    backgroundColor: '#FFFFFF'
  },

})


function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchProps(dispatch) {
  return {
    modify: bindActionCreators(modify, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(mine)