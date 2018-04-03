import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import MarketCell from './MarketCell'

export default class Market extends Component {
  static navigationOptions() {
    return {
      headerTitle: '市场',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: null,
    }
  }
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: this.ds.cloneWithRows([
        ['BTC', '8888', '0.00001234', '0.99%', 1],
        ['TK', '8888', '0.00001234', '0.99%', 0],
      ]),
      isPress: true,
    }
  }
  componentDidMount() { }
  topBarPress(isPress) {
    this.setState({
      isPress,
    })
  }
  renderRow(rd) {
    return (
      <MarketCell rd={rd} />
    )
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
              onPress={() => this.topBarPress(true)}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: (this.state.isPress ? common.btnTextColor : common.textColor),
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
              onPress={() => this.topBarPress(false)}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: (!this.state.isPress ? common.btnTextColor : common.textColor),
                  textAlign: 'center',
                }}
              >BTC</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
          renderHeader={() => this.renderHeader()}
          enableEmptySections
        />
      </View>
    )
  }
}
