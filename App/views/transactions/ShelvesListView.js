import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
} from 'react-native'
import {
  common,
} from '../common'

export default class ShelvesListView extends Component {
  componentDidMount() { }

  renderShelvesRow(rd, sid, rid) {
    const { type } = this.props
    let textColor = null
    let marginTop = null
    if (type === common.buy) {
      textColor = common.redColor
    } else if (type === common.sell) {
      textColor = common.greenColor
    }
    if (type === common.buy && rid === 0) {
      marginTop = common.margin10
    } else {
      marginTop = common.margin8
    }
    return (
      <View style={{
        marginTop,
        marginLeft: common.margin10 / 2,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{
          color: textColor,
          fontSize: common.font12,
        }}
        >{rd.price}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{rd.sum_quantity}</Text>
      </View>
    )
  }

  renderShelvesHeader() {
    const { type } = this.props
    if (type === common.buy) {
      return (
        <View style={{
          marginTop: 2 * common.margin10,
          marginLeft: common.margin10 / 2,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font10,
          }}
          >价格(BTC)</Text>
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font10,
          }}
          >数量(ETH)</Text>
        </View>
      )
    }
    return null
  }

  render() {
    const { dataSource } = this.props
    return (
      <ListView
        style={{
          flex: 1,
        }}
        dataSource={dataSource}
        renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, sid, rid)}
        renderHeader={() => this.renderShelvesHeader()}
        enableEmptySections
      />
    )
  }
}
