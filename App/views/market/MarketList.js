import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
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

  renderRow(rd) {
    let typeColor = common.textColor
    if (rd.rose > 0) {
      typeColor = common.redColor
    } else if (rd.rose < 0) {
      typeColor = common.greenColor
    } else if (rd.rose === 0) {
      typeColor = common.textColor
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
          >{rd.quantity}</Text>
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
          >{rd.cprice}</Text>
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
          >{`${rd.rose}%`}</Text>
        </View>

        <View
          style={{
            marginLeft: common.margin10,
            marginRight: common.margin10,
            height: 1,
            backgroundColor: common.placeholderColor,
          }}
        />
      </View>
    )
  }

  render() {
    const { data } = this.props
    return (
      <ListView
        dataSource={this.listDS(data)}
        renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
