import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../../constants/common'

class ShelvesListView extends Component {
  componentDidMount() { }

  // 币币对小数规则
  precision(price, quantity) {
    const { homeRoseSelected } = this.props
    let p = price
    let q = quantity

    if (
      ((homeRoseSelected && homeRoseSelected.goods.name === common.token.BTC
        && homeRoseSelected.currency.name === common.token.CNYT))
      || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
        && homeRoseSelected.currency.name === common.token.CNYT))
      || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
        && homeRoseSelected.currency.name === common.token.TK))
    ) {
      // p:2 q:4 a:6
      p = Number(p).toFixed(2)
      q = Number(q).toFixed(4)
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.CNYT) {
      // p:4 q:0 a:4
      p = Number(p).toFixed(4)
      q = Number(q).toFixed(0)
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:8 q:0 a:8
      p = Number(p).toFixed(8)
      q = Number(q).toFixed(0)
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:6 q:4 a:6
      p = Number(p).toFixed(6)
      q = Number(q).toFixed(4)
    }

    return { p, q }
  }

  renderShelvesRow(rd, sid, rid) {
    const { type, rowPress } = this.props
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
    const { p, q } = this.precision(rd.price, rd.sum_quantity)
    return (
      <TouchableOpacity
        style={{
          marginTop,
          marginLeft: common.margin10 / 2,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        activeOpacity={common.activeOpacity}
        onPress={() => rowPress(rd)}
      >
        <Text style={{
          color: textColor,
          fontSize: common.font12,
        }}
        >{p}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{q}</Text>
      </TouchableOpacity>
    )
  }

  renderShelvesHeader() {
    const { type, goodsName, currencyName } = this.props
    if (type === common.sell) {
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
          >{`价格(${currencyName})`}</Text>
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font10,
          }}
          >{`数量(${goodsName})`}</Text>
        </View>
      )
    }
    return null
  }

  render() {
    const { dataSource } = this.props
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, sid, rid)}
        renderHeader={() => this.renderShelvesHeader()}
        enableEmptySections
        scrollEnabled={false}
        removeClippedSubviews={false}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    homeRoseSelected: store.dealstat.homeRoseSelected,
  }
}

export default connect(
  mapStateToProps,
)(ShelvesListView)
