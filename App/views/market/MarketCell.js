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
    let type = 0
    let typeColor = common.textColor
    const s = (rd.cprice - rd.lastprice) / rd.lastprice === 0 ? 0 :
      Number((rd.cprice - rd.lastprice) / rd.lastprice).toFixed(2)
    if (s > 0) {
      type = '+'
      typeColor = common.redColor
    } else if (s <= 0) {
      type = '-'
      typeColor = common.greenColor
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
          >{rd.cprice}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'center',
            }}
          >{`${type}${s}`}</Text>
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
