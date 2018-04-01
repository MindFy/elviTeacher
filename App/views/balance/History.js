import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import Navigator from '../Navigator'
import HistoryCell from './HistoryCell'

export default class History extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      isPress: true,
      dataSource: this.ds.cloneWithRows([
        ['12:12:12', 'BTC', '11.976', 1],
        ['12:12:13', 'BTC', '11.976', 1],
        ['12:12:14', 'BTC', '11.976', 1],
        ['12:12:15', 'BTC', '11.976', 1],
        ['12:12:16', 'BTC', '11.976', 1],
        ['12:12:17', 'BTC', '11.976', 1],
        ['12:12:18', 'BTC', '11.976', 1],
        ['12:12:19', 'BTC', '11.976', 1],
        ['12:12:20', 'BTC', '11.976', 1],
        ['12:12:21', 'BTC', '11.976', 1],
      ]),
    }
  }
  componentDidMount() { }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  onPress(isPress) {
    this.setState({
      isPress,
    })
  }
  renderRow(rd) {
    return (
      <HistoryCell  rd={rd}/>
    )
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'} />
        <Navigator
          headerTitle="历史记录"
          leftImagePress={() => this.leftImagePress()}
        />

        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            height: common.h50,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.onPress(true)} >
            <View
              style={{
                height: common.h50,
                width: (common.sw - common.margin10 * 2) / 2,
                backgroundColor: common.navBgColor,
                alignSelf: 'center',
                justifyContent: 'center',
              }} >
              <Text
                style={{
                  fontSize: common.font14,
                  alignSelf: 'center',
                  color: (this.state.isPress ? common.btnTextColor : common.textColor),
                }} >充值记录</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.onPress(false)} >
            <View
              style={{
                height: common.h50,
                width: (common.sw - common.margin10 * 2) / 2,
                backgroundColor: common.navBgColor,
                alignSelf: 'center',
                justifyContent: 'center',
              }} >
              <Text
                style={{
                  fontSize: common.font14,
                  alignSelf: 'center',
                  color: (!this.state.isPress ? common.btnTextColor : common.textColor),
                }} >提现记录</Text>
            </View>
          </TouchableOpacity>
        </View>

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
            }} >时间</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
            }} >币种</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
            }} >数量</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
            }} >状态</Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={rd => this.renderRow(rd)}
          enableEmptySections
        />

        <ScrollView />
      </View>
    )
  }
}
