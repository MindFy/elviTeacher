/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigator from './Navigator'
import configureStore from './store/configureStore'

const store = configureStore()
export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
