import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'

export default class MarketList2 extends Component {
  constructor(props) {
    super(props)
    this.listDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: common.w10,
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin20,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.placeholderColor,
              textAlign: 'left',
            }}
          >名称</Text>
          <Text
            style={{
              flex: 3,
              paddingTop: common.margin20,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.placeholderColor,
              textAlign: 'right',
            }}
          >成交量</Text>
          <Text
            style={{
              flex: 3,
              paddingTop: common.margin20,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.placeholderColor,
              textAlign: 'right',
            }}
          >最新价</Text>
          <Text
            style={{
              flex: 3,
              paddingTop: common.margin20,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.placeholderColor,
              textAlign: 'right',
            }}
          >24h涨跌</Text>
        </View>

        <View
          style={{
            marginHorizontal: common.margin10,
            height: 0.5,
            backgroundColor: common.placeholderColor,
          }}
        />

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
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => {
          const { cellPressAction } = this.props
          if (cellPressAction) {
            cellPressAction(rd, currencyName)
          }
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: common.w10,
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'left',
              alignSelf: 'center',
            }}
          >{rd.name}</Text>
          <Text
            style={{
              flex: 3,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: common.textColor,
              textAlign: 'right',
              alignSelf: 'center',
            }}
          >{quantity}</Text>
          <Text
            style={{
              flex: 3,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'right',
              alignSelf: 'center',
            }}
          >{cprice}</Text>
          <Text
            style={{
              flex: 3,
              paddingTop: common.margin5,
              paddingBottom: common.margin5,
              fontSize: common.font14,
              color: typeColor,
              textAlign: 'right',
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
      </TouchableOpacity>
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
