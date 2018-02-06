import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TouchableHighlight, ScrollView, KeyboardAvoidingView, CameraRoll} from 'react-native'
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


import { addFamilyName, addFirstName, addID, addPhone, addAdd, addBDP, addGender, addUType } from '../../../actions/appointActions'

const WIDTH = 0
const { height, width } = Dimensions.get('window')

const options = {
  title: '请选择图片来源',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册图片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class basicInfo extends Component {
  constructor () {
    super()
    this.state = {
      userFavict: '../../../../app-assets/mine/fav.png',
      percent: 0,
      photo: null,
    }
  }

  componentWillMount() {
    let value = Object.values(this.props.info)
    let count = 0
    value.forEach((data,index) => {
      if (data != '') {
        count++
      }
    })
    console.log(this.props.info, count)
    let percent = parseInt( (count / value.length) * 100 )
    console.log(percent)
    this.setState({
      percent: percent
    })

  }

  componentWillReceiveProps(nextProps, nextState) {
    let value = Object.values(nextProps.info)
    let count = 0
    value.forEach((data, index) => {
      if (data != '') {
        count++
      }
    })
    console.log(nextProps.info, count)
    let percent = parseInt((count / value.length) * 100)
    console.log(percent)
    this.setState({
      percent: percent,
    })
  }


  
  _setValue(type, value) {
    console.log('wtf')
    switch (type) {
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

  doChoose() {

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('用户取消了选择！');
      } else if (response.error) {
        alert("ImagePicker发生错误：" + response.error);
      } else {
        let source = { uri: response.uri };

        this.setState({
          photo: source
        });
      }

  })
}
 
  render () {
    let userTypeOption = [
      {
        value: '在读',
      }, {
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

    
    const {user, modify} = this.props
    const { username, userPhone, userFavict } = this.state
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={Platform.OS == 'ios' ? 120 : -500}>
      <ScrollView style={styles.container}
          showsVerticalScrollIndicator={true}
          snapToAlignment='end'
          contentContainerStyle={{ paddingBottom: 30 }}
          contentInset={{ top: 0, left: 0, bottom: 20, right: 0 }}
      >
        <View style={styles.percentIndicator}>
          <View style={styles.percentIndicatorLeft}>
            <Text>基础信息完成度：</Text>
            <View style={styles.indicatorOutline}>
              <View style={{ width: this.state.percent * 2, backgroundColor: '#6899fb', flex: 1 }}></View>
            </View>
          </View>
          <Text style={{ color: '#6999FD', fontSize: 30,}}>{this.state.percent}%</Text>
        </View>

        <View style={{marginBottom: 20, marginTop: 5}}>
            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6, marginLeft: 45, marginBottom: 10 }}>证件照片</Text>
            {/* ceshiyixia */}
            {this.state.photo == null
              ?
              <TouchableOpacity style={styles.addPhoto} onPress={this.doChoose.bind(this)}>
                <Text style={{ color: '#dedede', fontSize: 80, }}>+</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.favictionContainer} onPress={this.doChoose.bind(this)}>
                <Image source={this.state.photo} style={{ flex: 1 }} />
              </TouchableOpacity>}
        </View>
       
        

        <View style={styles.inputContainer}>

          <View style={styles.inputSection}>
            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>姓名</Text>
            <View style={{ flexDirection: 'row' }}>
              <InputBox null={this.state.toJudegeNull} placeholder='姓' width={width / 4} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.familyName} />
              <InputBox null={this.state.toJudegeNull} placeholder='名' width={width / 2} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.firstName} />
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
            <InputBoxMul placeholder='家庭住址' width={width - 90} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.add} />
          </View>
          <View style={styles.inputSection}>
            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>身份证号</Text>
            <InputBox null={this.state.toJudegeNull} placeholder='身份证号' width={width-90} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.id} />
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
              rippleInsets={{ top: 0, bottom: 0 }}
              onChangeText={(value, index, data) => { this.props.addUType(value) }}
            />

          </View>
          <View style={styles.inputSection}>
            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>联系电话</Text>
            <InputBox null={this.state.toJudegeNull} placeholder='联系电话' width={width - 90} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.phone} />
          </View>
          <View style={styles.inputSection}>
            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>出生地</Text>
            <InputBox null={this.state.toJudegeNull} placeholder='出生地' width={width - 90} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.bdp} />
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
    paddingLeft: 40
  },
  infoText: {
    borderColor: 'yellow',
    borderWidth: WIDTH,
    marginLeft: 18
  },
  cellsContainer: {
    borderColor: '#dedede',
    borderWidth: 0.6,
    marginBottom: 20,
    paddingBottom: 1,
  },
  percentIndicator: {
    height: 69,
    //  borderWidth: 1,
    // borderColor: 'red',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  indicatorOutline: {
    width: 200,
    height: 8,
    backgroundColor: '#EDEDED',
    borderRadius: 4,
    overflow: 'hidden',
  },
  percentIndicatorLeft: {
    justifyContent: 'space-around',
    height: 40,
    marginRight: 20,
  },
  inputContainer: {
    flex: 1,
    // borderColor: 'yellow',
    // borderWidth: 1,
    marginLeft:45,
    marginRight:45,
  },
  inputSection: {
    marginBottom: 16,
  },
  selector: {
    width: width -90,
    height: 52,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  favictionContainer: {
    marginLeft: 45,
    marginRight: 45,
    height: 120,
  },
  addPhoto: {
    height: 120,
    marginLeft: 45,
    marginRight: 45,
    borderWidth: 2,
    borderColor: '#dedede',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',

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
)(basicInfo)