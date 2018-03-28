import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
} from 'react-native'
import { common } from './common'
import Navigator from '../me/Navigator'

export default class History extends Component {
  componentDidMount() { }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: common.bgColor }}>
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="历史记录"
          leftImagePress={() => this.leftImagePress()}
        />
        <ScrollView />
      </View>
    )
  }
}
