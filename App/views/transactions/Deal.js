import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ListView,
} from 'react-native'
import { Toast } from 'teaset'
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
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import cache from '../../utils/cache'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  contentStyle: {
    paddingBottom: 10,
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
  kLineView: {
    marginTop: common.margin15,
    backgroundColor: common.blackColor,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  kLineBtn: {
    height: common.getH(17),
    width: common.h30,
    backgroundColor: common.navBgColor,
    justifyContent: 'center',
  },
  kLineBtnTitle: {
    color: common.textColor,
    fontSize: common.font12,
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
    marginRight: 10,
  },
  scrollViewContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewLineBtn: {
    height: common.getH(17),
    paddingHorizontal: 5,
    backgroundColor: common.navBgColor,
    justifyContent: 'center',
    marginRight: 10,
  },
  kLineBtnTitleSelected: {
    color: '#FFD502',
    fontSize: common.font12,
    alignSelf: 'center',
  },
})

class Deal extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    cache.setObject('currentComponentVisible', 'Deal')
  }

  componentDidMount() {
    this.props.dispatch(exchange.updateSegmentIndex(0))
    this.props.dispatch(exchange.updateKLineIndex(3))
    this.loadNecessaryData()
    this.timer = setInterval(() => {
      if (cache.getObject('currentComponentVisible') === 'Deal') {
        this.loadNecessaryData()
      }
    }, common.refreshIntervalTime)
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, createOrderIndex } = this.props
    const { createResponse } = nextProps
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
    } else if (createResponse.code) {
      const msg = this.errors[createResponse.code]
      if (msg) Toast.fail(msg)
    } else {
      Toast.fail(`${createOrderIndex === 0 ? '买入' : '卖出'}失败`)
    }
    dispatch(exchange.clearResponse())
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
    cache.setObject('currentComponentVisible', 'Home')
  }

  errors = {
    4000311: '货币或商品不存在',
    4000312: '挂单失败，订单已经创建',
    4000510: '参数为空',
    4000511: '挂单失败，价格或数量为空',
    4000513: '挂单失败，余额不足',
    4000514: '挂单失败，余额不足',
  }

  cancelOrder(id) {
    const { dispatch } = this.props
    dispatch(exchange.requestCancelOrder(id))
  }

  loadNecessaryData() {
    const { dispatch, selectedPair, loggedInResult, loggedIn } = this.props
    const { currency, goods } = selectedPair
    const params = {
      goods_id: goods.id,
      currency_id: currency.id,
    }
    dispatch(exchange.requestValuation())
    dispatch(exchange.requestLastpriceList(params))
    dispatch(exchange.requestOrderhistoryList(params))
    dispatch(exchange.requestDepthMap(params))
    if (loggedIn) {
      dispatch(actions.findAssetList(findAssetList(loggedInResult.id)))
    }
  }

  tapBuySellBtn(idx) {
    const { dispatch, navigation, formData, loggedIn, selectedPair } = this.props
    const { price, quantity } = formData
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    const p = new BigNumber(price)
    const q = new BigNumber(quantity)
    const a = new BigNumber(p).multipliedBy(q)
    if (!price.length || BigNumber(p).eq(0)) {
      Toast.fail(`请输入正确的${!idx ? '买入' : '卖出'}价格`)
      this.drawer.hide()
      return
    }
    if (!quantity.length || BigNumber(q).eq(0)) {
      Toast.fail(`请输入正确的${!idx ? '买入' : '卖出'}数量`)
      this.drawer.hide()
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
        price: p.toFixed(),
        quantity: q.toFixed(),
        total_money: a.toFixed(),
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
    const { dispatch, loggedIn, navigation, amountVisible, selectedPair } = this.props
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    const index = type === common.buy ? 1 : 0
    if (this.drawer) {
      dispatch(exchange.updateCreateOrderIndex(index))
      if (index === 0) {
        const sellQuantity = rd.sum_quantity
        const availble = amountVisible[selectedPair.currency.name] || '0'
        const availQuantity = new BigNumber(availble).dividedBy(new BigNumber(rd.price)).toFixed()
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
            val: (new BigNumber(availQuantity).lte(new BigNumber(sellQuantity))
              ? availQuantity : sellQuantity),
          },
          amountVisible,
          createOrderIndex: index,
        })
        if (nextValue) {
          dispatch(exchange.updateForm(nextValue))
        }
      } else if (index === 1) {
        const buyQuantity = rd.sum_quantity
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
            val: (new BigNumber(availQuantity).lte(new BigNumber(buyQuantity))
              ? availQuantity : buyQuantity),
          },
          amountVisible,
          createOrderIndex: index,
        })
        if (nextValue) {
          dispatch(exchange.updateForm(nextValue))
        }
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
            price: new BigNumber(sell[0].price).toFixed(),
          }))
        }
      } else if (index === 1) {
        if (buy.length) {
          dispatch(exchange.updateForm({
            ...formData,
            price: new BigNumber(buy[0].price).toFixed(),
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
        rmb = new BigNumber(cprice).multipliedBy(rmb).toFixed(2, 1)
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

  renderKlineBtnIfNeeded(kLineOrDepth) {
    if (kLineOrDepth === common.ui.kLine) {
      const array = ['分时', '1min', '5min', '15min', '30min', '1hour', '4hour', '1day', '1week', '1month']
      const { kLineIndex } = this.props
      return (
        <ScrollView
          horizontal
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentStyle}
        >
          {
            array.map((e, idx) => (
              <NextTouchableOpacity
                key={e}
                style={styles.scrollViewLineBtn}
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  const { dispatch } = this.props
                  if (idx !== kLineIndex) {
                    dispatch(exchange.updateKLineIndex(idx))
                  }
                }}
              >
                <Text style={
                  idx === kLineIndex ?
                    styles.kLineBtnTitleSelected :
                    styles.kLineBtnTitle}
                >{e}</Text>
              </NextTouchableOpacity>
            ))
          }
        </ScrollView>
      )
    }
    return null
  }

  renderDepthView = () => {
    const { dispatch, kLineOrDepth, depthMap, selectedPair, kLineIndex } = this.props
    let kLineBtnTitle = 'k线'
    if (kLineOrDepth === common.ui.kLine) {
      kLineBtnTitle = '深度'
    }
    const renderCharts = () => {
      if (kLineOrDepth === common.ui.kLine) {
        return (<KLine
          kLineIndex={kLineIndex}
          goodsName={selectedPair.goods.name}
          currencyName={selectedPair.currency.name}
          scrolViewHandler={(val) => {
            if (this.scrollView) {
              this.scrollView.setNativeProps({
                scrollEnabled: val,
              })
            }
          }}
        />)
      }
      return <Depth depthMap={depthMap} />
    }
    return (
      <View style={styles.kLineView}>
        <View style={styles.header}>
          {this.renderKlineBtnIfNeeded(kLineOrDepth)}
          <NextTouchableOpacity
            style={styles.kLineBtn}
            activeOpacity={common.activeOpacity}
            onPress={() => {
              if (kLineOrDepth === common.ui.kLine) {
                dispatch(actions.kLineOrDepthUpdate(common.ui.depth))
              } else {
                dispatch(actions.kLineOrDepthUpdate(common.ui.kLine))
              }
              dispatch(exchange.updateKLineIndex(3))
            }}
          >
            <Text style={styles.kLineBtnTitle}>
              {kLineBtnTitle}
            </Text>
          </NextTouchableOpacity>
        </View>
        {renderCharts()}
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
        <ScrollView
          ref={(e) => { this.scrollView = e }}
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.contentStyle}
        >
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
    kLineOrDepth: state.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Deal)
