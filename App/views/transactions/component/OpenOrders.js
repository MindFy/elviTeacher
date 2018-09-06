import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { ListView, View, Text, StyleSheet } from 'react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import { common } from '../../../constants/common'
import transfer from '../../../localization/utils'

const OOCStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    marginTop: common.margin10,
    marginRight: common.margin10,
    fontSize: common.font12,
    color: common.btnTextColor,
    textAlign: 'right',
  },
  cellContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    backgroundColor: common.navBgColor,
    borderColor: common.borderColor,
    borderWidth: 1,
  },
  cellContentContainer: {
    flex: 1,
    borderBottomColor: common.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  goodsCurrency: {
    marginLeft: common.margin5,
    marginTop: common.margin5,
    marginBottom: common.margin5,
    color: common.textColor,
    fontSize: common.font12,
    width: '20%',
    alignSelf: 'center',
    textAlign: 'left',
  },
  buySell: {
    marginLeft: common.margin10,
    fontSize: common.font12,
    width: '10%',
    alignSelf: 'center',
    textAlign: 'left',
  },
  createTime: {
    marginLeft: common.margin10,
    color: common.textColor,
    fontSize: common.font12,
    width: '45%',
    alignSelf: 'center',
    textAlign: 'left',
  },
  cancelContainer: {
    position: 'absolute',
    right: common.margin5,
    alignSelf: 'center',
  },
  cancel: {
    fontSize: common.font12,
    textAlign: 'right',
  },
  price: {
    flex: 1,
    marginTop: common.margin5,
    marginLeft: common.margin5,
    marginBottom: common.margin5,
    color: common.textColor,
    fontSize: common.font10,
    alignSelf: 'center',
    textAlign: 'left',
  },
  quantity: {
    flex: 1,
    marginLeft: common.margin5,
    color: common.textColor,
    fontSize: common.font10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  dealled: {
    flex: 1,
    marginLeft: common.margin5,
    marginRight: common.margin5,
    color: common.textColor,
    fontSize: common.font10,
    alignSelf: 'center',
    textAlign: 'right',
  },
  tips: {
    width: '100%',
    marginTop: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
  },
})

class OpenOrders extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  renderOpenOrderCell = (item, a, b, language) => {
    const createdAt = common.dfFullDate(item.createdAt)
    let cancelBtnTitle = ''
    let cancelDisabled = true
    if ((item.status === common.delegate.status.dealing)
        || (item.status === common.delegate.status.waiting)) {
      cancelBtnTitle = transfer(language, 'exchange_cancelOrder')
      cancelDisabled = false
    } else if (item.status === common.delegate.status.cancel) {
      cancelBtnTitle = transfer(language, 'exchange_canceled')
      cancelDisabled = true
    }

    const goodsName = item.goods ? item.goods.name : ''
    const currencyName = item.currency ? item.currency.name : ''

    let price
    let quantity
    let dealled
    common.precision(goodsName, currencyName, (p, q) => {
      price = new BigNumber(item.price).toFixed(p, 1)
      quantity = new BigNumber(item.quantity).toFixed(q, 1)
      dealled = new BigNumber(item.dealled).toFixed(q, 1)
    })

    const goodsCurrency = `${goodsName}/${currencyName}`
    const buySell = item.direct === 'buy' ? transfer(language, 'exchange_buy') : transfer(language, 'exchange_sell')
    const buySellColor =
      item.direct === 'sell' ? { color: common.greenColor } : { color: common.redColor }
    const cancelColor =
      cancelDisabled ? { color: common.placeholderColor } : { color: common.btnTextColor }

    return (
      <View style={OOCStyles.cellContainer}>
        <View style={OOCStyles.cellContentContainer}>
          <Text style={OOCStyles.goodsCurrency}>
            {goodsCurrency}
          </Text>
          <Text style={[OOCStyles.buySell, buySellColor]}>
            {buySell}
          </Text>
          <Text style={OOCStyles.createTime}>
            {createdAt}
          </Text>
          <NextTouchableOpacity
            style={OOCStyles.cancelContainer}
            activeOpacity={common.activeOpacity}
            onPress={() => {
              const { cancelOrder } = this.props
              if (cancelOrder) {
                cancelOrder(item.id)
              }
            }}
            disabled={cancelDisabled}
          >
            <Text style={[OOCStyles.cancel, cancelColor]}>
              {cancelBtnTitle}
            </Text>
          </NextTouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Text style={OOCStyles.price}>{`${transfer(language, 'exchange_price')}: ${price}`}</Text>
          <Text style={OOCStyles.quantity}>{`${transfer(language, 'exchange_quality')}: ${quantity}`}</Text>
          <Text style={OOCStyles.dealled}>{`${transfer(language, 'exchange_changed')}: ${dealled}`}</Text>
        </View>
      </View >
    )
  }

  render() {
    const { dataSource, language } = this.props
    if (dataSource === undefined) {
      return (
        <Text style={OOCStyles.tips}>
          {transfer(language, 'exchange_loadingData')}
        </Text>
      )
    }
    if (dataSource.length === 0) {
      return (
        <Text style={OOCStyles.tips}>
          {transfer(language, 'exchange_noOrders')}
        </Text>
      )
    }
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(dataSource)}
        renderRow={(rd, sid, rid) => this.renderOpenOrderCell(rd, rid,
          transfer(language, 'exchange_buy'), language)}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}

export default OpenOrders
