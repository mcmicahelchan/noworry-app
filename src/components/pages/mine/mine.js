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
          <TouchableOpacity style={styles.btdContainer} onPress={() => modify('可爱猪', '1234567890')}>
            <Ionicons name={'md-create'} size={26} style={{ color: 'white' }} />
          </TouchableOpacity>
        </View>

        <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='个人信息库' icon='md-person' iconColor='#ffcc00' linkPage='error' isLast={true} />
        </View>
        <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='我的草稿箱' icon='md-document' iconColor='#4380FC' linkPage='error' isLast={false} />
            <Cell navigation={this.props.navigation}  title='我的办理历史' icon='md-time' iconColor='#4380FC' linkPage='error' isLast={true} />
        </View>
        <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='设置' icon='md-cog' iconColor='#aaaaaa' linkPage='error' isLast={true} />
        </View>
         <View style={styles.cellsContainer}>
            <Cell navigation={this.props.navigation}  title='关于App' icon='md-alert' iconColor='#4380FC' linkPage='error' isLast={true} />
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
    paddingLeft: 40
  },
  infoText: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    marginLeft: 18
  },
  cellsContainer: {
    borderColor: '#dedede',
    borderWidth: 0.5,
    marginBottom: 20,
    paddingBottom: 1,
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