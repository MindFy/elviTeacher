import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import RefreshListView from 'react-native-refresh-list-view'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import actions from '../../actions/index'

class DelegateListView extends Component {
  componentDidMount() { }

  renderHeader() {
    const { currentOrHistory, cancelAllBlock, averagePriceOrPrice, dealledOrQuantity,
      dispatch } = this.props
    if (currentOrHistory === common.delegate.current) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View />
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => cancelAllBlock()}
          >
            <Text
              style={{
                marginTop: common.margin10,
                marginRight: common.margin10,
                fontSize: common.font12,
                color: common.btnTextColor,
                textAlign: 'right',
              }}
            >全部撤单</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            flex: 1,
            color: common.placeholderColor,
            fontSize: common.font12,
          }}
        >市场</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => {
              dispatch(actions.averagePriceOrPriceUpdate(common.ui.averagePrice))
            }}
          >
            <Text
              style={{
                color: averagePriceOrPrice === common.ui.averagePrice
                  ? common.btnTextColor : common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'right',
              }}
            >均价</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          > / </Text>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => {
              dispatch(actions.averagePriceOrPriceUpdate(common.ui.price))
            }}
          >
            <Text
              style={{
                color: averagePriceOrPrice === common.ui.averagePrice
                  ? common.placeholderColor : common.btnTextColor,
                fontSize: common.font12,
              }}
            >价格</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => {
              dispatch(actions.dealledOrQuantityUpdate(common.ui.dealled))
            }}
          >
            <Text
              style={{
                color: dealledOrQuantity === common.ui.dealled
                  ? common.btnTextColor : common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'right',
              }}
            >成交数量</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          > / </Text>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => {
              dispatch(actions.dealledOrQuantityUpdate(common.ui.quantity))
            }}
          >
            <Text
              style={{
                color: dealledOrQuantity === common.ui.dealled
                  ? common.placeholderColor : common.btnTextColor,
                fontSize: common.font12,
                textAlign: 'right',
              }}
            >金额</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderRow(rd, rid) {
    const { currentOrHistory, cancelBlock, averagePriceOrPrice, dealledOrQuantity } = this.props
    if (currentOrHistory === common.delegate.current) {
      const createdAt = common.dfFullDate(rd.createdAt)
      let cancelBtnTitle = ''
      let cancelDisabled = true
      if ((rd.status === common.delegate.status.dealing)
        || (rd.status === common.delegate.status.waiting)) {
        cancelBtnTitle = '撤单'
        cancelDisabled = false
      } else if (rd.status === common.delegate.status.cancel) {
        cancelBtnTitle = '已取消'
        cancelDisabled = true
      }
      let goodsName = rd.goods ? rd.goods.name : ''
      if (rd.goods_id) {
        if (rd.goods_id === 1) {
          goodsName = common.token.TK
        } else if (rd.goods_id === 2) {
          goodsName = common.token.BTC
        } else if (rd.goods_id === 3) {
          goodsName = common.token.CNYT
        } else if (rd.goods_id === 4) {
          goodsName = common.token.CNY
        }
      }
      let currencyName = rd.currency ? rd.currency.name : ''
      if (rd.currency_id) {
        if (rd.currency_id === 1) {
          currencyName = common.token.TK
        } else if (rd.currency_id === 2) {
          currencyName = common.token.BTC
        } else if (rd.currency_id === 3) {
          currencyName = common.token.CNYT
        } else if (rd.currency_id === 4) {
          currencyName = common.token.CNY
        }
      }
      let price
      let quantity
      let dealled
      common.precision(goodsName, currencyName, (p, q) => {
        price = new BigNumber(rd.price).toFixed(p, 1)
        quantity = new BigNumber(rd.quantity).toFixed(q, 1)
        dealled = new BigNumber(rd.dealled).toFixed(q, 1)
      })

      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              borderBottomColor: common.borderColor,
              borderBottomWidth: 1,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin5,
                marginTop: common.margin5,
                marginBottom: common.margin5,
                color: common.textColor,
                fontSize: common.font12,
                width: '20%',
                alignSelf: 'center',
                textAlign: 'left',
              }}
            >{`${goodsName}/${currencyName}`}</Text>
            <Text
              style={{
                marginLeft: common.margin10,
                color: rd.direct === 'sell' ? common.greenColor : common.redColor,
                fontSize: common.font12,
                width: '10%',
                alignSelf: 'center',
                textAlign: 'left',
              }}
            >{rd.direct === 'buy' ? '买入' : '卖出'}</Text>
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
                width: '45%',
                alignSelf: 'center',
                textAlign: 'left',
              }}
            >{createdAt}</Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: common.margin5,
                alignSelf: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => cancelBlock(rd, rid)}
              disabled={cancelDisabled}
            >
              <Text
                style={{
                  color: cancelDisabled ? common.placeholderColor : common.btnTextColor,
                  fontSize: common.font12,
                  textAlign: 'right',
                }}
              >{cancelBtnTitle}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 1,
                marginTop: common.margin5,
                marginLeft: common.margin5,
                marginBottom: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
                textAlign: 'left',
              }}
            >{`价格: ${price}`}</Text>
            <Text
              style={{
                flex: 1,
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >{`数量: ${quantity}`}</Text>
            <Text
              style={{
                flex: 1,
                marginLeft: common.margin5,
                marginRight: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
                textAlign: 'right',
              }}
            >{`已成交: ${dealled}`}</Text>
          </View>
        </View >
      )
    }

    let averagePrice = new BigNumber(rd.dealamount).dividedBy(rd.dealled)
    if (averagePrice.isNaN()) {
      averagePrice = 0
    }
    let price
    let dealled
    let dealamount
    common.precision(rd.goods.name, rd.currency.name, (p, q, a) => {
      averagePrice = averagePrice.toFixed(p, 1)
      price = new BigNumber(rd.price).toFixed(p, 1)
      dealled = new BigNumber(rd.dealled).toFixed(q, 1)
      dealamount = new BigNumber(rd.dealamount).toFixed(a, 1)
    })
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: common.font10,
            color: common.textColor,
            alignSelf: 'center',
            textAlign: 'left',
          }}
        >{`${rd.goods.name}/${rd.currency.name}`}</Text>
        <Text
          style={{
            flex: 1,
            fontSize: common.font10,
            color: common.textColor,
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >{
            averagePriceOrPrice === common.ui.averagePrice ? averagePrice : price
          }</Text>
        <Text
          style={{
            flex: 1,
            fontSize: common.font10,
            color: common.textColor,
            alignSelf: 'center',
            textAlign: 'right',
          }}
        >{dealledOrQuantity === common.ui.dealled ? dealled : dealamount}</Text>
      </View>
    )
  }

  render() {
    const { data, refreshState, onHeaderRefresh, onFooterRefresh } = this.props
    return (
      <RefreshListView
        data={data}
        renderItem={({ item, index }) => this.renderRow(item, index)}
        ListHeaderComponent={() => this.renderHeader()}
        refreshState={refreshState}
        onHeaderRefresh={() => onHeaderRefresh()}
        onFooterRefresh={() => onFooterRefresh()}
        footerTextStyle={{
          color: common.textColor,
          fontSize: common.font14,
        }}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    averagePriceOrPrice: store.ui.averagePriceOrPrice,
    dealledOrQuantity: store.ui.dealledOrQuantity,
  }
}

export default connect(
  mapStateToProps,
)(DelegateListView)
