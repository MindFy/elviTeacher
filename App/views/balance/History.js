import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import Navigator from '../Navigator'

export default class History extends Component {
  componentDidMount() { }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={{ flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="历史记录"
          leftImagePress={() => this.leftImagePress()}
        />

        <View style={{
          marginTop: common.margin10,
          flexDirection: 'row',
        }}
        >
          <TouchableOpacity >
            <Text>充值记录</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text>提现记录</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
        }}
        >
          <Text >时间</Text>
          <Text >币种</Text>
          <Text >数量</Text>
          <Text >状态</Text>
        </View>

        <ScrollView />
      </View>
    )
  }
}
