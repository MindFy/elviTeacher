import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ListView,
} from 'react-native'
import { Toast, Menu } from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import KLine from './KLineWeb'
import DealDrawer from './DealDrawer'
import Depth from './Depth'
import ShelvesList from './ShelvesList'
import actions from '../../actions/index'
import LatestDealList from './LatestDealList'
import DealNavigator from './DealNavigator'
import DealTabBar from './DealTabBar'
import DealMarket from './DealMarket'
import * as exchange from '../../actions/exchange'
import findOpenOrders from '../../schemas/exchange'
import LastPriceList from './component/LastPriceList'
import OpenOrders from './component/OpenOrders'
import { caculateExchangeFormData, slideAction } from '../../utils/caculateExchangeFormData'
import findAssetList from '../../schemas/asset'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  latestDealHeader: {
    marginTop: common.margin5,
    paddingTop: common.margin10,
    paddingLeft: common.margin10,
    backgroundColor: common.navBgColor,
    height: common.h32,
    color: common.textColor,
    fontSize: common.font14,
    textAlign: 'left',
  },
})

class Deal extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentDidMount() {
    this.loadNecessaryData()
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, createOrderIndex } = this.props
    const { createResponse, loggedInResult } = nextProps

    if (this.props.cancelOrderLoading && !nextProps.cancelOrderLoading) {
      Toast.success('撤单成功')
    }
    if (nextProps.cancelOrderError) {
      Toast.fail('撤单失败')
      dispatch(exchange.requestCancelOrderSetError(null))
    }

    if (!createResponse) return
    if (createResponse.id) {
      Toast.success(`${createOrderIndex === 0 ? '买入' : '卖出'}成功`)
      this.loadNecessaryData()
      dispatch(actions.findAssetList(findAssetList(loggedInResult.id)))
    } else {
      Toast.fail(`${createOrderIndex === 0 ? '买入' : '卖出'}失败`)
    }
    dispatch(exchange.clearResponse())
  }

  cancelOrder(id) {
    const { dispatch } = this.props
    dispatch(exchange.requestCancelOrder(id))
  }

  loadNecessaryData() {
    const { dispatch, selectedPair } = this.props
    const { currency, goods } = selectedPair
    const params = {
      goods_id: goods.id,
      currency_id: currency.id,
    }
    dispatch(exchange.requestValuation())
    dispatch(exchange.requestLastpriceList(params))
    dispatch(exchange.requestOrderhistoryList(params))
    dispatch(exchange.requestDepthMap(params))
  }

  tapBuySellBtn(idx) {
    const { dispatch, navigation, formData, loggedIn, selectedPair } = this.props
    const { price, quantity, amount } = formData
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    const p = new BigNumber(price)
    const q = new BigNumber(quantity)
    const a = new BigNumber(amount)
    if (!price.length || p === 0) {
      Toast.message(`请输入正确的${!idx ? '买入' : '卖出'}价格`)
      return
    }
    if (!quantity.length || q === 0) {
      Toast.message(`请输入正确的${!idx ? '买入' : '卖出'}数量`)
      return
    }
    if (this.drawer) {
      this.drawer.hide()
    }
    if (selectedPair) {
      dispatch(exchange.createOrder({
        goods_id: selectedPair.goods.id,
        currency_id: selectedPair.currency.id,
        direct: !idx ? 'buy' : 'sell',
        price: p,
        quantity: q,
        total_money: a.toString(),
      }))
    }
  }

  changeAction(selectedPair, formData, value, amountVisible) {
    const { createOrderIndex } = this.props
    const nextValue = caculateExchangeFormData({
      selectedPair,
      formData,
      actions: value,
      amountVisible,
      createOrderIndex,
    })
    if (nextValue) {
      const { dispatch } = this.props
      dispatch(exchange.updateForm(nextValue))
    }
  }

  lastPriceCellAction(rd, type) {
    const { dispatch, lastPrice, loggedIn, navigation, amountVisible, selectedPair } = this.props
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    const index = type === common.buy ? 1 : 0
    if (this.drawer) {
      dispatch(exchange.updateCreateOrderIndex(index))
      const { buy = [], sell = [] } = lastPrice
      if (index === 0) {
        const sellQuantity = rd.sum_quantity
        const availQuantity = amountVisible[selectedPair.goods.name]
        const nextValue = caculateExchangeFormData({
          selectedPair,
          formData: {
            price: rd.price,
            quantity: '',
            amount: '',
          },
          actions: {
            cmd: 'input',
            type: 'quantity',
            val: new BigNumber(availQuantity).lte(sellQuantity) ? availQuantity : sellQuantity,
          },
          amountVisible,
          index,
        })
        dispatch(exchange.updateForm(nextValue))
      } else if (index === 1) {
        const buyQuantity = rd.sum_quantity
        const availQuantity = amountVisible[selectedPair.currency.name]
        const nextValue = caculateExchangeFormData({
          selectedPair,
          formData: {
            price: rd.price,
            quantity: '',
            amount: '',
          },
          actions: {
            cmd: 'input',
            type: 'quantity',
            val: new BigNumber(availQuantity).lte(buyQuantity) ? availQuantity : buyQuantity,
          },
          amountVisible,
          index,
        })
        dispatch(exchange.updateForm(nextValue))
      }
      this.drawer.showAtIndex(index)
    }
  }

  resetFormData() {
    const { dispatch } = this.props
    dispatch(exchange.updateForm({
      price: '',
      quantity: '',
      amount: '',
      ratio: 0,
    }))
  }

  segmentDidClick(e) {
    const { dispatch, loggedIn, loggedInResult, selectedPair, navigation } = this.props
    if (e === 1) {
      if (!loggedIn) {
        navigation.navigate('LoginStack')
      } else {
        dispatch(exchange.updateSegmentIndex(e))
        dispatch(exchange.requestOpenordersList(findOpenOrders({
          id: loggedInResult.id,
          goodId: selectedPair.goods.id,
          currencyId: selectedPair.currency.id,
        })))
      }
    } else {
      dispatch(exchange.updateSegmentIndex(e))
    }
  }

  slideAction(selectedPair, formData, value, amountVisible) {
    const { createOrderIndex } = this.props
    const nextValue = slideAction({
      selectedPair,
      formData,
      actions: value,
      amountVisible,
      createOrderIndex,
    })
    if (nextValue) {
      const { dispatch } = this.props
      dispatch(exchange.updateForm(nextValue))
    }
  }

  menuPress() {
    const { navigation } = this.props
    navigation.navigate('Market2')
  }

  tabBarPress(index) {
    const { loggedIn, navigation, dispatch, formData, lastPrice } = this.props
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    if (this.drawer) {
      dispatch(exchange.updateCreateOrderIndex(index))
      const { buy = [], sell = [] } = lastPrice
      if (index === 0) {
        if (sell.length) {
          dispatch(exchange.updateForm({
            ...formData,
            price: sell[0].price,
          }))
        }
      } else if (index === 1) {
        if (buy.length) {
          dispatch(exchange.updateForm({
            ...formData,
            price: buy[0].price,
          }))
        }
      }
      this.drawer.showAtIndex(index)
    }
  }

  renderNavigationBar = () => {
    const { navigation, selectedPair, loggedIn } = this.props
    const goodsName = selectedPair.goods.name
    const currencyName = selectedPair.currency.name
    return (
      <DealNavigator
        titles={[`${goodsName}/${currencyName}`, '我的委托']}
        onPress={(type) => {
          if (type === 'leftBtn') {
            navigation.goBack()
          } else if (type === 'title') {
            this.menuPress()
          } else if (type === 'rightBtn') {
            if (loggedIn) {
              navigation.navigate('Orders', {
                title: '当前委托',
              })
            } else navigation.navigate('LoginStack')
          }
        }}
      />
    )
  }

  renderMarketView = () => {
    const { selectedPair, valuation } = this.props
    const currencyName = selectedPair.currency.name
    let quantity = ''
    let cprice = ''
    const rose = selectedPair.rose
    let rmb = '0.00'

    if (selectedPair) {
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q) => {
        cprice = new BigNumber(selectedPair.cprice).toFixed(p, 1)
        quantity = new BigNumber(selectedPair.quantity).toFixed(q, 1)
      })
      if (valuation && valuation.rates) {
        rmb = valuation.rates[currencyName][common.token.CNYT]
        rmb = new BigNumber(cprice).multipliedBy(rmb).toFixed(4, 1)
      }
    }
    return (
      <DealMarket
        quantity={quantity}
        cprice={cprice}
        rose={rose}
        rmb={rmb}
      />
    )
  }

  renderDepthView = () => {
    const { dispatch, kLineOrDepth, depthMap } = this.props
    return (
      <View
        style={{
          marginTop: common.margin15,
          backgroundColor: common.blackColor,
          width: '100%',
        }}
      >
        {
          kLineOrDepth === common.ui.kLine
            ? <KLine />
            : <Depth depthMap={depthMap} />
        }
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            height: common.h20,
            width: common.h30,
            backgroundColor: common.navBgColor,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            if (kLineOrDepth === common.ui.kLine) {
              dispatch(actions.kLineOrDepthUpdate(common.ui.depth))
            } else {
              dispatch(actions.kLineOrDepthUpdate(common.ui.kLine))
            }
          }}
        >
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              alignSelf: 'center',
            }}
          >{kLineOrDepth === common.ui.kLine ? '深度' : 'k线'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderShelvesListChildren(index) {
    if (index === 0) {
      const { lastPrice, selectedPair } = this.props
      return (
        <LastPriceList
          selectedPair={selectedPair}
          dataSource={lastPrice}
          cellPressAction={(rd, type) => this.lastPriceCellAction(rd, type)}
        />
      )
    }
    const { openOrders } = this.props
    return (
      <OpenOrders
        dataSource={openOrders}
        cancelOrder={id => this.cancelOrder({ id })}
      />
    )
  }

  renderDetailList = () => {
    const { navigation, segmentIndex } = this.props
    return (
      <ShelvesList
        titles={['盘口五档', '当前委托']}
        segmentIndex={segmentIndex}
        segmentValueChanged={(e) => {
          if (segmentIndex !== e) {
            this.segmentDidClick(e)
          }
        }}
        renderChildComponent={index => this.renderShelvesListChildren(index)}
        navigation={navigation}
      />
    )
  }

  renderOrderHistory = () => {
    const { orderHistory, selectedPair } = this.props
    const nextOrderHistory = (orderHistory || []).slice(0, 5)
    const data = nextOrderHistory.map((item) => {
      let price
      let quantity
      const direct = item.endDirect
      const createdAt = common.dfTime(item.createdAt)
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q) => {
        price = new BigNumber(item.dealPrice).toFixed(p, 1)
        quantity = new BigNumber(item.quantity).toFixed(q, 1)
      })
      return {
        price,
        quantity,
        direct,
        createdAt,
      }
    })
    return <LatestDealList data={data} />
  }

  renderToolBar = () => (
    <DealTabBar
      titles={['买入', '卖出']}
      onPress={index => this.tabBarPress(index)}
    />
  )

  render() {
    const { selectedPair, formData, amountVisible } = this.props
    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}
        <ScrollView>
          {this.renderMarketView()}
          {this.renderDepthView()}
          {this.renderDetailList()}
          <Text style={styles.latestDealHeader}>最新成交</Text>
          {this.renderOrderHistory()}
        </ScrollView>
        {this.renderToolBar()}
        <DealDrawer
          ref={(e) => { this.drawer = e }}
          index={0}
          formData={formData}
          amountVisible={amountVisible}
          selectedPair={selectedPair}
          changeAction={value => this.changeAction(selectedPair, formData, value, amountVisible)}
          slideAction={value => this.slideAction(selectedPair, formData, value, amountVisible)}
          buttonAction={idx => this.tapBuySellBtn(idx)}
          unmountAction={() => this.resetFormData()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.exchange,
    amountVisible: state.asset.amountVisible,
    loggedIn: state.authorize.loggedIn,
    loggedInResult: state.authorize.loggedInResult,
    market: state.home.market,

    kLineOrDepth: state.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Deal)
