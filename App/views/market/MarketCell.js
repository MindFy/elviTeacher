import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { common } from '../common'

export default class MarketCell extends Component {
  componentDidMount() {}
  render() {
    return (
      <View>
      <View
      style={{
        flexDirection: 'row',
      }} >
        </View>

        <View
        style={{
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: 1,
          backgroundColor: common.textColor,
        }} >
        </View>
        </View>
    )
  }
}