import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import HomeCell from './HomeCell'

export default class Home extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dealDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: this.ds.cloneWithRows([
        ['ETH', '0.00082722', '0.98%', 1],
        ['TK', '0.00082722', '0.98%', 0],
      ]),
    }
  }
  componentDidMount() { }
  renderRow(rd) {
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.props.navigation.navigate('Detail')} >
        <HomeCell rd={rd} />
      </TouchableOpacity>
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
          barStyle={'light-content'}
        />
        <ScrollView>
          <Image
            style={{
              width: common.sw,
              height: common.h233,
            }}
            resizeMode="stretch"
            resizeMethod="scale"
            source={require('../../assets/VCG21gic.png')}
          />
          <View
            style={{
              height: common.h32,
              backgroundColor: common.borderColor05,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.placeholderColor,
                fontSize: common.font12,
              }}
            >公告: xxxxxxxxxxxxxxxx</Text>
          </View>

          <View
            style={{
              marginTop: common.margin10,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 1,
              }}
            />
            <Text
              style={{
                flex: 1,
                color: common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'center',
              }}
            >市场/最新价</Text>
            <Text
              style={{
                flex: 1,
                color: common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'center',
              }}
            >涨跌幅</Text>
          </View>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={rd => this.renderRow(rd)}
            enableEmptySections
          />
        </ScrollView>
      </View>
    )
  }
}
