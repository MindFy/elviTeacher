/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import UserSystem from './login/index'
import configureStore from './store/configureStore'

const store = configureStore()
export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <UserSystem />
    )
  }
}
