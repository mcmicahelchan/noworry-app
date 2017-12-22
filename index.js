import { AppRegistry } from 'react-native';
import React, { Component } from 'react'
import { Provider } from 'react-redux';

import App from './App';
import store from './src/store/store'

export default class noworryapp extends Component {
   render() {
       return(
           <Provider store={store}>
               <App />
           </Provider>
       )
   }
}

AppRegistry.registerComponent('noworry', () => noworryapp);
