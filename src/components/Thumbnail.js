import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import Sibling from 'react-native-root-siblings';


class Thumbnail extends Component {

  constructor(props) {
    super(props);
    this._sibling = null;
    this.state = {
      opacity: new Animated.Value(0),
    };
    this.openSibling = this.openSibling.bind(this);
    this.closeSibling = this.closeSibling.bind(this);
  }


  openSibling() {
    if (this._sibling) { return }
    this._sibling = new Sibling(<Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
      <ScrollView
        maximumZoomScale={3.0}
        minimumZoomScale={1.0}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableWithoutFeedback onPress={this.closeSibling}>
          <Image source={this.props.source} resizeMode='contain' style={styles.image} />
        </TouchableWithoutFeedback>
      </ScrollView>
    </Animated.View>);
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  closeSibling() {
    if (!this._sibling) return;
    Animated.timing(this.state.opacity,
      {
        toValue: 0,
        duration: 200
      }).start(() => {
        if (!this._sibling) return;
        this._sibling.destroy();
        this._sibling = null;
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {
        this.openSibling();
      }}>
        <Image
          {...this.props}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'black'
  },
  scrollViewContent: {
    flex: 1,
  },
  image: {
    flexGrow: 1,
    height: 150,  // 随便写的值，只是为了把图片显示出来
  },
});

export default Thumbnail;
