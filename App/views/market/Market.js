import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import Navigator from '../Navigator'
import MarketCell from './MarketCell'

export default class Market extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: this.ds.cloneWithRows([
        ['BTC', '8888', '0.00001234', '0.99%', 1],
        ['TK', '8888', '0.00001234', '0.99%', 0],
      ]),
    }
  }
  componentDidMount() { }
  renderRow(rd) {
    return (
      <MarketCell rd={rd} />
    )
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <Navigator
          headerTitle="市场"
        />

        <View
          style={{
            height: common.h32,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              paddingBottom: common.margin10,
              alignSelf: 'flex-end',
              width: common.sw / 4,
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.topBarPress()}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: common.btnTextColor,
                  textAlign: 'center',
                }}
              >CNYT</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingBottom: common.margin10,
              alignSelf: 'flex-end',
              width: common.sw / 4,
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: common.textColor,
                  textAlign: 'center',
                }}
              >BTC</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
          enableEmptySections
        />
      </View>
    )
  }
}
