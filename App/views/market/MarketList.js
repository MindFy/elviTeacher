import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'

export default class MarketList extends Component {
  constructor(props) {
    super(props)
    this.listDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >名称</Text>
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >成交量</Text>
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >最新价</Text>
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >24h涨跌</Text>
      </View>
    )
  }

  renderRow(rd, currencyName) {
    let typeColor = common.textColor
    let rose = new BigNumber(rd.rose).multipliedBy(100)
    let quantity
    let cprice
    if (rose.gt(0)) {
      typeColor = common.redColor
    } else if (rose.lt(0)) {
      typeColor = common.greenColor
    } else {
      typeColor = common.textColor
    }
    rose = rose.toFixed(2, 1)
    common.precision(rd.name, currencyName, (p, q) => {
      cprice = new BigNumber(rd.cprice).toFixed(p, 1)
      quantity = new BigNumber(rd.quantity).toFixed(q, 1)
    })

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
              alignSelf: 'center',
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
              alignSelf: 'center',
            }}
          >{quantity}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >{cprice}</Text>
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >{`${rose}%`}</Text>
        </View>

        <View
          style={{
            marginLeft: common.margin10,
            marginRight: common.margin10,
            height: 0.5,
            backgroundColor: common.placeholderColor,
          }}
        />
      </View>
    )
  }

  render() {
    const { data, currencyName } = this.props
    return (
      <ListView
        dataSource={this.listDS(data)}
        renderRow={rd => this.renderRow(rd, currencyName)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
