import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {common} from '../common'

export default class History extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={{
        marginTop: common.margin10,
        marginLeft: common.margin10,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }} >{this.props.rd[0]}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }} >{this.props.rd[1]}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }} >{this.props.rd[2]}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }} >已充值</Text>
      </View>
    )
  }
}
