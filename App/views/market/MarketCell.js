import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { common } from '../common'

export default class MarketCell extends Component {

  componentDidMount() { }

  render() {
    const { rd } = this.props
    let type = null
    let typeColor = null
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
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'center',
            }}
          >{rd.name}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'center',
            }}
          >{rd.quantity}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'center',
            }}
          >{rd.lastprice}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'center',
            }}
          >{`${type}${this.props.rd[3]}`}</Text>
        </View>

        <View
          style={{
            marginLeft: common.margin10,
            marginRight: common.margin10,
            height: 1,
            backgroundColor: common.textColor,
          }}
        />
      </View>
    )
  }
}
