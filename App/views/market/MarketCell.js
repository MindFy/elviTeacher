import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { common } from '../common'

export default class MarketCell extends Component {
  componentDidMount() { }
  render() {
    let type = null, typeColor = null
    if (this.props.rd[4] === 1) {
      type = '+'
      typeColor = common.askColor
    } else {
      type = '-'
      typeColor = common.bidColor
    }
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
          }} >
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'center',
            }} >{this.props.rd[0]}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'center',
            }} >{this.props.rd[1]}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'center',
            }} >{this.props.rd[2]}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'center',
            }} >{`${type}${this.props.rd[3]}`}</Text>
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