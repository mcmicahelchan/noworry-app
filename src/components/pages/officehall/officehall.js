import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, ScrollView, Dimensions, Image, Modal, Animated, TextInput } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import * as Progress from 'react-native-progress'

import Draft from './draft'
import Option from './option'
import Indicator from './indicator'
import HisCell from './hisCell'
import QuestionCell from './questionCell'

import { addRecord, del } from '../../../actions/hisActions'


const WIDTH = 0
const SWIPER_HEIGHT = 108
const { height, width } = Dimensions.get('window');
console.log(height)
let scrollheight = height==568 ? height+340 : height

class officehall extends Component {
  constructor () {
    super()
    this.state = {
      searchText: '',
      modalVisible: false,
      modalAnimType: 'none',
      modalAnimHeaderMargin: new Animated.Value(250),
      modalAnimBodyMargin: new Animated.Value(250),
      isFound: false,
      visibleSwiper: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
    }, 1);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState, this.state, nextProps, this.props)
    if (nextState.modalVisible == true && this.state.modalVisible == false) {
      this.modalSlideIn()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state.modalVisible == true && this.state.modalAnimType === 'none' && nextState.modalAnimType == 'slide')) {
      return false
    } else {
      return true
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  setModalInvisible() {
    this.setState({ modalVisible: false })
  }


  modalSlideIn() {
    Animated.parallel([
      // 随时间变化而执行的动画类型
      Animated.spring(
        this.state.modalAnimHeaderMargin,                      // 动画中的变量值
        {
          toValue: 0,
        },
      ),
      Animated.spring(
        this.state.modalAnimBodyMargin,                      // 动画中的变量值
        {
          toValue: 0,
        },
      ), 
    ]).start();  
  }

  
  renderHis(record) {
    record.map((data, index) => { 
      return(
            <HisCell key={index} item={data.name} linkPage={data.linkPage} navigation={this.props.navigation}/>
        )
      })
  }

  dismissModal() {
    this.setModalInvisible()
    this.setState({ modalAnimHeaderMargin: new Animated.Value(250), modalAnimBodyMargin: new Animated.Value(250) })
  }

  searchMatch(text, db) {
    console.log('text', text)
    let find = false;
    if (text != '') {
      db.forEach((item) => {
        console.log(item.name.match(text))
        if (item.name.match(text) != null) {
          find = true;
        }
      }
      )
    }
    
    this.setState({
      isFound: find,
    })
    console.log('isFound', this.state.isFound)
  }

  find() {

  }

  render () {
    const { addRecord, hisRecords, del, questionRecords, searchDB } = this.props
    const { searchText, isFound } = this.state
    

    let swiper = null;
    if (this.state.visibleSwiper) {
      swiper = <View style={[styles.swipeContainer, ]}>
        <Swiper style={styles.wrapper}
          showsButtons={false}
          showsPagination={true}
          height={108} width={width - 16}
          activeDotStyle={{ height: 3, width: 6 }}
          dotStyle={{ height: 2, width: 4 }}
          paginationStyle={{ position: 'absolute', bottom: 2 }}
          removeClippedSubviews={false}>
          <View style={styles.slide1}>
            <Image source={require('../../../../app-assets/officehall/banner_1.png')} style={styles.pic} />
          </View>
          <View style={styles.slide2}>
            <Image source={require('../../../../app-assets/officehall/banner_2.png')} style={styles.pic} />
          </View>
          <View style={styles.slide3}>
            <Image source={require('../../../../app-assets/officehall/banner_3.png')} style={styles.pic} />
          </View>
        </Swiper>
      </View>;
    } else {
      swiper = <View></View>;
    }


    return (
      <View style = {styles.outsideContainer}>
        <Modal
          animationType='none'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          <View style={ styles.modalContainer }>
            <StatusBar barStyle='light-content' backgroundColor='#4380FC' />
            <View style={styles.modalStatusBackground} />
            <Animated.View style={[styles.modalHeader, {paddingLeft: this.state.modalAnimHeaderMargin}]}>
            <View style={styles.modalSearchInputContainer}>
                <TextInput 
                ref="myInput"
                style={styles.modalSearchBar}
                autoFocus={true}
                returnKeyType='search'
                numberOfLines={1}
                clearButtonMode='while-editing'
                placeholder='搜索'
                keyboardType='default'
                value={searchText}
                underlineColorAndroid = 'transparent'
                onChangeText={(text) => { this.setState({ searchText: text }); this.searchMatch(text, searchDB);}}
                onEndEditing={()=> console.log('end')}
                onChange={() => this.searchMatch(searchText, searchDB)}
                onSubmitEditing={() => { if(searchText != '') {addRecord(searchText)}}}
                />
                <Ionicons name={'ios-search'} size={22} style={{ color: '#939393', position: 'absolute', backgroundColor: 'white', left:10, top: 4, }} />
            </View>
              
              <TouchableOpacity style={styles.modalCancelBtd} onPress={() => {  this.setModalInvisible(); this.setState({ modalAnimHeaderMargin: new Animated.Value(250), modalAnimBodyMargin: new Animated.Value(250) }); }}>
                <Text style={{ color: 'white', fontSize: 16 }}>取消</Text>
              </TouchableOpacity>
            </Animated.View>

            {!isFound || searchText == ''
              ? 
            <TouchableOpacity activeOpacity={1} style={styles.blurSection} onPress={() => this.refs.myInput.blur()}>
              
              <Animated.View style={{ marginTop: this.state.modalAnimBodyMargin}}>
                {hisRecords.length != 0
                  ? <View style={styles.historySection}>
                  <View style={styles.modalSectionTitle}>
                    <Text style={styles.modalTitleText}>历史搜索</Text>
                    <TouchableOpacity onPress={() => del()}>
                      <Ionicons name={'md-trash'} size={20} style={{ color: '#6999FD', marginTop: 4, marginLeft: 12 }} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalOptionContainer}>
                    {hisRecords.map((item, index) => {
                      return (
                        <HisCell key={index} item={item.name} linkPage={item.linkPage} navigation={this.props.navigation} dismissModal={() => this.dismissModal()} />
                      )
                    })}
                  </View>
                </View> 
                : null}

              <View style={[styles.historySection,]}>
                <View style={styles.modalSectionTitle}>
                  <Text style={styles.modalTitleText}>热门提问</Text>
                  <TouchableOpacity style={{alignItems: 'flex-start' }}>
                      <Text style={{ color: '#6999FD'}}>更多></Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalQuestionContainer}>
                    {questionRecords.map((item, index) => {
                      if ((index+1) != questionRecords.length) {
                        return (
                          <QuestionCell key={index} question={item.name} navigation={this.props.navigation} linkPage={item.linkPage} num={index + 1} dismissModal={() => this.dismissModal()} />
                        )
                      } else {
                        console.log('last!')
                        return (
                          <QuestionCell key={index} question={item.name} navigation={this.props.navigation} style={{ borderBottomWidth: 0}} linkPage={item.linkPage} num={index + 1} dismissModal={() => this.dismissModal()} />
                        )
                      }
                      
                    })}    
                </View>
                </View>
                </Animated.View>
                
            </TouchableOpacity>
            :
              <TouchableOpacity activeOpacity={1} style={styles.blurSection} onPress={() => this.refs.myInput.blur()}>
                <ScrollView
                  keyboardShouldPersistTaps={true}
                  keyboardDismissMode='on-drag'
                  showsVerticalScrollIndicator={false}
                >
                  {searchDB.map((data, index) => {
                    if(data.name.match(searchText)) {
                      return (
                        <TouchableOpacity style={styles.resultCell} activeOpacity={0.8} onPress={() => { this.props.navigation.navigate(data.linkPage); this.dismissModal() }}>
                          <Text style={{ color: '#6999FD', fontSize: 24, fontWeight: 'bold' }}>{data.name}</Text>
                          <Text style={{ color: '#9f9f9f' }}>{data.category}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })}
                
              </ScrollView>
              </TouchableOpacity>
          }

          </View>
        </Modal>


      <ScrollView style={styles.container } 
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      showsVerticalScrollIndicator={false} >

      <View style={styles.viceContainer}>
            <TouchableOpacity style={styles.searchBar} activeOpacity={1} onPress={() => { this.setModalVisible(true);  }}>
              <Ionicons name={'ios-search'} size={18} style={{ color: '#dedede', marginTop: 2, marginRight: 6 }} />
              <Text style={styles.searchText}>搜索</Text>
            </TouchableOpacity>

            {swiper}

          <TouchableOpacity style={styles.detailContainer} activeOpacity={0.8}>
            <Text style={styles.header}>出入境业务</Text>
            <View style={styles.indicatorContainer}>
              <Indicator state='填写资料' type={1} date='11月24日' />
              <View style={styles.line}></View>
              <Indicator state='扫描' type={1} date='12月3日' />
              <View style={styles.line}></View>
              <Indicator state='审核中' type={2} date='12月3日' />
              <View style={styles.line}></View>
              <Indicator state='快递' type={3} date='12月3日' />
            </View>
          </TouchableOpacity>
         
          <View style={styles.optionsContainer}>
            <View style={styles.draftboxHeaderContainer}>
              <Text style={styles.draftboxHeaderText}>业务选择</Text>
            </View>
            <View style={styles.businessContainer}>
              <Option style={styles.option} navigation={this.props.navigation} businessType='交管业务' icon='md-car' linkPage='error' />
              <Option style={styles.option} navigation={this.props.navigation} businessType='出入境业务' icon='md-globe' linkPage='abroad' />
              <Option style={styles.option} navigation={this.props.navigation} businessType='户政业务' icon='md-card' linkPage='error' />
              <Option style={styles.option} navigation={this.props.navigation} businessType='监管业务' icon='md-eye' linkPage='error' />
            </View>
          </View>
      </View>
        

      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outsideContainer:{
    flex: 1,
   },
  container: {
    borderWidth: WIDTH,
    borderColor: 'red',
    flex: 1,
    backgroundColor: 'white',
    
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#999999',
    height: 34,
    width: width - 16,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  searchText: {
    color: '#999999'
  },
  detailContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    width: width - 16,
    height: 110,
    
  },
  draftboxContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    height: 135,
    backgroundColor: '#FFFFFF',
    width: width - 16,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0.2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
    // elevation: 1,
  },
  draftboxHeaderContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    flexDirection: 'row',
    height: 30,
    alignItems: 'flex-end',
    paddingLeft: 15,
    paddingRight: 25,
    
  },
  draftboxHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#949494',
    flex:1,
    paddingBottom: 3,
  },
  draftsScroll: {
    borderWidth: WIDTH,
    borderColor: 'red',
    height:80,
    width: width - 30,
  },
  optionsContainer: {
    borderWidth: WIDTH,
    borderColor: 'orange',
    backgroundColor: '#FFFFFF',
    width: width - 16,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0.2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
    // elevation: 1,
  },
  businessContainer: {
    borderWidth: WIDTH,
    borderColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#949494',
    marginLeft:15,
    marginBottom: 12,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 4,
    justifyContent:'center',
    alignItems: 'center',
  },
  insideCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: '#6999FD'
  },
  indicatorCell: {
    borderWidth: WIDTH,
    borderColor: 'red',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  indicatorText: {
    fontSize: 13,
    color:'#797979',
    marginTop: 2,
  },
  line: {
    width: (width-200) / 4,
    height: 1,
    borderTopWidth: 1.2,
    backgroundColor: 'white',
    marginBottom: 32,
    borderColor: '#999999',

  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viceContainer: {
    borderColor: 'blue',
    borderWidth: WIDTH,
    height: scrollheight-115,
    marginTop: 10,
    justifyContent: 'space-around',
  },
  modalContainer: {
    flex: 1,
    borderColor: 'red',
    borderWidth: WIDTH,
  },
  modalHeader: {
    height: 44,
    borderColor: 'green',
    borderWidth: WIDTH,
    backgroundColor: '#4380FC',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalSearchBar:{
    width: 310,
    height: 29,
    borderRadius: 10,
    backgroundColor:'white',
    paddingLeft: 33,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: 'center',

  },
  modalStatusBackground:{
    height: 20,
    borderColor: 'green',
    borderWidth: WIDTH,
    backgroundColor: '#4380FC',
  },
  modalCancelBtd: {
    borderColor: 'green',
    borderWidth: WIDTH,
    marginLeft: 12,
    width: 40,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSearchInputContainer: {
    width: 310,
    height: 29,
  },
  historySection: {
    borderColor: 'orange',
    borderWidth: WIDTH,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15,
  },
  modalSectionTitle: {
    borderColor: '#f3f3f3',
    borderBottomWidth: 0.8,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft:25,
    paddingTop: 8,
  },
  modalTitleText: {
    width: 300,
    color:'#6999FD',
    fontSize: 16,
    textAlign: 'left',
    borderColor: 'orange',
    borderWidth: WIDTH,
  },
  modalOptionContainer: {
    margin: 10,
    borderColor: 'orange',
    borderWidth: WIDTH,
    marginLeft:25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  blurSection: {
    flex: 1, 
    borderWidth: WIDTH,
    borderColor: 'green' 
  },
  question: {
    height: 41,
    lineHeight: 41,
    borderColor: '#f3f3f3',
    borderBottomWidth: 0.8,
  },
  modalQuestionContainer: {
    margin: 10,
    marginBottom: 0,
    borderColor: 'orange',
    borderWidth: WIDTH,
    marginLeft: 25,
  },
  qustionCell: {
    borderColor: '#f3f3f3',
    borderBottomWidth: 1,
    
  },
  resultCell: {
    height: 80,
    justifyContent: 'center',
    paddingLeft: 30,
    backgroundColor: 'white',
    borderColor: '#e4e4e4',
    borderBottomWidth: 0.8,
  },
  swipeContainer: {
    borderWidth: WIDTH,
    borderColor: 'black',
    width: width - 16,
    height: 108,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  pic: {
    width: width - 16,
    height: 108,
  },
  
  
})


function mapStateToProps(state) {
  return {
    hisRecords: state.his.reverse(),
    questionRecords: state.searchQs,
    searchDB: state.searchDB,
  };
}

function mapDispatchProps(dispatch) {
  return {
    addRecord: bindActionCreators(addRecord, dispatch),
    del: bindActionCreators(del, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(officehall)
