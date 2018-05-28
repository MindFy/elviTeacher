import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import actions from '../../actions/index'

class DetailList extends Component {
  constructor() {
    super()
    this.shelvesBuyDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.shelvesSellDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.currentDelegateDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader(type) {
    if (type === common.buy) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              paddingBottom: common.margin5,
            }}
          >买</Text>
        </View>
      )
    } else if (type === common.sell) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginRight: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
              paddingBottom: common.margin5,
            }}
          >卖</Text>
        </View>
      )
    }
    return null
  }

  renderRow(rd, rid, type) {
    const { homeRoseSelected, dispatch } = this.props
    if (type === common.buy) {
      let price
      let sumQuantity
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        price = new BigNumber(rd.price).toFixed(p, 1)
        sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
      })
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginLeft: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: common.font12,
              color: common.textColor,
            }}
          >{sumQuantity}</Text>
          <Text
            style={{
              marginRight: 1,
              fontSize: common.font12,
              color: common.redColor,
            }}
          >{price}</Text>
        </View>
      )
    } else if (type === common.sell) {
      let price
      let sumQuantity
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        price = new BigNumber(rd.price).toFixed(p, 1)
        sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
      })
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginRight: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: 1,
              fontSize: common.font12,
              color: common.greenColor,
            }}
          >{price}</Text>
          <Text
            style={{
              fontSize: common.font12,
              color: common.textColor,
            }}
          >{sumQuantity}</Text>
        </View>
      )
    }
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
            onPress={() => {
              const { delegateCurrent } = this.props
              const temp = delegateCurrent.concat()
              temp[rid].status = common.delegate.status.cancel
              dispatch(actions.cancel({ id: rd.id }, temp, true))
            }}
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

  render() {
    const { dispatch, navigation, user, selectionBarSelected, shelvesBuy, shelvesSell,
      delegateCurrent } = this.props

    return (
      <View>
        <TKSelectionBar
          leftTitle={'盘口五档'}
          rightTitle={'当前委托'}
          leftBlock={() => dispatch(actions.selectionBarUpdate(common.selectionBar.left))}
          rightBlock={() => {
            if (!user) navigation.navigate('LoginStack')
            else dispatch(actions.selectionBarUpdate(common.selectionBar.right))
          }}
        />
        {
          selectionBarSelected === common.selectionBar.left
            ? <View
              style={{
                flexDirection: 'row',
              }}
            >
              <ListView
                style={{
                  width: '50%',
                }}
                dataSource={this.shelvesBuyDS(shelvesBuy)}
                renderHeader={() => this.renderHeader(common.buy)}
                renderRow={(rd, sid, rid) => this.renderRow(rd, rid, common.buy)}
                enableEmptySections
                removeClippedSubviews={false}
              />
              <ListView
                style={{
                  width: '50%',
                }}
                dataSource={this.shelvesSellDS(shelvesSell)}
                renderHeader={() => this.renderHeader(common.sell)}
                renderRow={(rd, sid, rid) => this.renderRow(rd, rid, common.sell)}
                enableEmptySections
                removeClippedSubviews={false}
              />
            </View>
            : <ListView
              dataSource={this.currentDelegateDS(delegateCurrent)}
              renderHeader={() => this.renderHeader('')}
              renderRow={(rd, sid, rid) => this.renderRow(rd, rid, '')}
              enableEmptySections
              removeClippedSubviews={false}
            />
        }
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,

    delegateCurrent: store.detailDeal.delegateCurrent,

    homeRoseSelected: store.dealstat.homeRoseSelected,

    selectionBarSelected: store.ui.selectionBarSelected,
  }
}

export default connect(
  mapStateToProps,
)(DetailList)
