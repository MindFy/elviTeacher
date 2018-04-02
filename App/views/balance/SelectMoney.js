import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native'
import { common } from '../common'

export default class SelectMoney extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      title: '选择币种',
      selected: false,
      dataSource: this.ds.cloneWithRows(['BTC', 'CNYT', 'KT']),
    }
  }
  componentDidMount() { }
  cellRightImagePress(selected) {
    this.setState({
      selected,
    })
  }
  /* 根据选中状态修改单元格右侧箭头宽高 */
  changeCellRightImageSize(selected) {
    if (selected) {
      return {
        width: common.h20,
        height: common.w10,
      }
    }
    return {
      width: common.w10,
      height: common.h20,
    }
  }
  rowPress(rd, selected) {
    this.setState({
      title: rd,
      selected: !selected,
    })
    this.props.selectedMoney(rd)
  }
  renderRow(rd, selected) {
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.rowPress(rd, selected)}
      >
        <View
          style={{
            marginTop: common.margin5,
            height: common.h40,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{rd}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderMoneyList(selected) {
    if (selected) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rd => this.renderRow(rd, selected)}
          enableEmptySections
        />
      )
    }
    return null
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.cellRightImagePress(!this.state.selected)}
        >
          <View
            style={{
              marginTop: common.margin10,
              height: common.h40,
              backgroundColor: common.navBgColor,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: common.textColor,
                alignSelf: 'center',
              }}
            >{this.state.title}</Text>
            <View
              style={{
                alignSelf: 'center',
              }}
            >
              <Image
                style={[{
                  marginRight: common.margin10,
                  height: common.h20,
                  width: common.w10,
                },
                this.changeCellRightImageSize(this.state.selected)]}
                source={(this.state.selected ?
                  require('../../assets/下拉--向下.png') :
                  require('../../assets/下拉--向右.png'))}
              />
            </View>
          </View>
        </TouchableOpacity>

        {this.renderMoneyList(this.state.selected)}
      </View>
    )
  }
}
