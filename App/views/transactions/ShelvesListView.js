import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import {
  common,
} from '../../constants/common'

class ShelvesListView extends Component {
  componentDidMount() { }

  renderShelvesRow(rd) {
    const { type, rowPress, homeRoseSelected } = this.props
    let textColor = null
    let price
    let sumQuantity
    if (type === common.buy) {
      textColor = common.redColor
    } else if (type === common.sell) {
      textColor = common.greenColor
    }
    common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
      price = new BigNumber(rd.price).toFixed(p, 1)
      sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
    })
    return (
      <TouchableOpacity
        style={{
          marginTop: common.margin8,
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
        >{price}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{sumQuantity}</Text>
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
        renderRow={rd => this.renderShelvesRow(rd)}
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
