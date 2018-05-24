import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native'
import Menu from 'teaset/components/Menu/Menu'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import ShelvesListView from './ShelvesListView'
import actions from '../../actions/index'
import ws from '../../websocket/ws'

class DelegateShelves extends Component {
  constructor() {
    super()

    this.shelvesBuyDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.shelvesSellDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  menuPress() {
    const { dispatch, homeRose } = this.props
    const items = []
    homeRose.forEach((element) => {
      items.push({
        title: `${element.goods.name}/${element.currency.name}`,
        onPress: () => {
          const { homeRoseSelected } = this.props
          ws.onclose(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
          dispatch(actions.homeRoseSelectedUpdate(element))
          dispatch(actions.textInputDelegateUpdate({ price: '', quantity: '', amount: '' }))
          ws.onopen(element.goods.id, element.currency.id, this.props.user)
          this.getUIData(element.goods.id, element.currency.id)
        },
      })
    })
    Menu.show({ x: 50, y: 126 }, items)
  }

  render() {
    const { homeRoseSelected,
      price, quantity, shelvesBuy, shelvesSell, valuation,
    } = this.props
    let goodsName = ''
    let currencyName = ''
    let rmb = '0.00'
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      if (valuation && valuation.rates && price.length) {
        rmb = valuation.rates[currencyName][common.token.CNYT]
        rmb = new BigNumber(price).multipliedBy(rmb).toFixed(2, 1)
      }
    }

    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: common.sw / 2,
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: common.margin10,
              marginTop: common.margin10,
              width: '45%',
              flexDirection: 'row',
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderBottomColor: common.placeholderColor,
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => this.menuPress()}
          >
            <Text style={{
              color: common.textColor,
              fontSize: common.font16,
            }}
            >{`${goodsName}/${currencyName}`}</Text>
            <Image
              style={{
                marginLeft: common.margin5,
                width: common.w10,
                height: common.h5,
                alignSelf: 'center',
              }}
              source={require('../../assets/下拉.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
            }}
          >{`= ¥${rmb}`}</Text>

        </View>

        <View
          style={{
            width: common.sw / 2,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              height: common.margin8 * 5 + common.h14_5 * 5 + common.margin10 * 3,
            }}
          >
            <ShelvesListView
              goodsName={goodsName}
              currencyName={currencyName}
              type={common.sell}
              dataSource={this.shelvesSellDS(shelvesSell)}
              rowPress={(rd) => {
                this.textInputUpdate(`${rd.price}`, quantity)
              }}
            />
          </View>
          <View
            style={{
              height: common.margin8 * 5 + common.h14_5 * 5,
            }}
          >
            <ShelvesListView
              type={common.buy}
              dataSource={this.shelvesBuyDS(shelvesBuy)}
              rowPress={(rd) => {
                this.textInputUpdate(`${rd.price}`, quantity)
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    buyOrSell: store.deal.buyOrSell,

    user: store.user.user,

    valuation: store.asset.valuation,
    amountVisible: store.asset.amountVisible,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    price: store.delegate.price,
    quantity: store.delegate.quantity,
    amount: store.delegate.amount,
    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,
    getShelvesVisible: store.delegate.getShelvesVisible,
    delegateCreateVisible: store.delegate.delegateCreateVisible,
  }
}

export default connect(
  mapStateToProps,
)(DelegateShelves)
