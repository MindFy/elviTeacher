import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Alert,
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
import transfer from '../../localization/utils'

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
    width: common.h36,
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
    const { dispatch, createOrderIndex, language } = this.props
    const { createResponse } = nextProps
    if (this.props.cancelOrderLoading && !nextProps.cancelOrderLoading) {
      Toast.success(transfer(language, 'exchange_withdrawalSuccess'))
    }
    if (nextProps.cancelOrderError) {
      Toast.fail(transfer(language, 'exchange_withdrawalFailed'))
      dispatch(exchange.requestCancelOrderSetError(null))
    }

    if (!createResponse) return
    if (createResponse.id) {
      Toast.success(
        `${createOrderIndex === 0 ?
          transfer(language, 'exchange_buySuccess') :
          transfer(language, 'exchange_sellSuccess')}`)
      this.loadNecessaryData()
    } else if (createResponse.code) {
      const errors = {
        4000311: transfer(language, 'exchange_goodsNotExist'),
        4000312: transfer(language, 'exchange_listFailedForCreated'),
        4000510: transfer(language, 'exchange_paramsNull'),
        4000511: transfer(language, 'exchange_listFailedForNull'),
        4000513: transfer(language, 'exchange_listFailedForLessCredit'),
        4000514: transfer(language, 'exchange_listFailedForLessCredit'),
      }
      const msg = errors[createResponse.code]
      if (msg) Toast.fail(msg)
    } else {
      Toast.fail(
        `${createOrderIndex === 0 ?
          transfer(language, 'exchange_buyFailed') :
          transfer(language, 'exchange_sellFailed')}`)
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
    const { dispatch, navigation, formData, loggedIn, selectedPair, language } = this.props
    const { price, quantity } = formData
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    const p = new BigNumber(price)
    const q = new BigNumber(quantity)
    const a = new BigNumber(p).multipliedBy(q)
    if (!price.length || BigNumber(p).eq(0)) {
      Toast.fail(!idx ?
        transfer(language, 'exchange_enterRightBuyPrice') :
        transfer(language, 'exchange_enterRightSellPrice'))
      this.drawer.hide()
      return
    }
    if (!quantity.length || BigNumber(q).eq(0)) {
      Toast.fail(!idx ?
        transfer(language, 'exchange_enterRightBuyQuality') :
        transfer(language, 'exchange_enterRightSellQuality'))
      this.drawer.hide()
      return
    }
    if ((!idx && new BigNumber(selectedPair.lastprice)
      .multipliedBy('1.3').isLessThanOrEqualTo(price))
      || (idx && new BigNumber(selectedPair.lastprice)
        .multipliedBy('0.7').isGreaterThanOrEqualTo(price))
    ) {
      Alert.alert(
        `您委托的价格${!idx ? '超过' : '低于'}了当前价格的30%，是否确认委托？`,
        '',
        [{
          text: '取消',
          onPress: () => {},
          style: 'cancel',
        }, {
          text: '确定',
          onPress: () => {
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
          },
        }],
        { cancelable: false },
      )
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
    const { dispatch, loggedIn, navigation, amountVisible, selectedPair, language } = this.props
    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }
    const index = type === transfer(language, 'exchange_buy') ? 1 : 0
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
    const { navigation, language } = this.props
    navigation.navigate('Market2', {
      language,
    })
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
    const { navigation, selectedPair, loggedIn, language } = this.props
    const goodsName = selectedPair.goods.name
    const currencyName = selectedPair.currency.name
    return (
      <DealNavigator
        titles={[
          `${goodsName}/${currencyName}`,
          transfer(language, 'exchange_myOrder'),
        ]}
        onPress={(type) => {
          if (type === 'leftBtn') {
            navigation.goBack()
          } else if (type === 'title') {
            this.menuPress()
          } else if (type === 'rightBtn') {
            if (loggedIn) {
              navigation.navigate('Orders', {
                title: transfer(language, 'home_currentDelegate'),
              })
            } else navigation.navigate('LoginStack')
          }
        }}
      />
    )
  }

  renderMarketView = () => {
    const { selectedPair, valuation, language } = this.props
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
        language={language}
        quantity={quantity}
        cprice={cprice}
        rose={rose}
        rmb={rmb}
      />
    )
  }

  renderKlineBtnIfNeeded(kLineOrDepth, language) {
    if (kLineOrDepth === common.ui.kLine) {
      const array = [
        transfer(language, 'exchange_time'),
        transfer(language, 'exchange_1min'),
        transfer(language, 'exchange_5min'),
        transfer(language, 'exchange_15min'),
        transfer(language, 'exchange_30min'),
        transfer(language, 'exchange_1hour'),
        transfer(language, 'exchange_4hour'),
        transfer(language, 'exchange_1day'),
        transfer(language, 'exchange_1week'),
        transfer(language, 'exchange_1month'),
      ]
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
    const { dispatch, kLineOrDepth, depthMap,
      selectedPair, kLineIndex, language } = this.props
    let kLineBtnTitle = transfer(language, 'exchange_kLine')
    if (kLineOrDepth === common.ui.kLine) {
      kLineBtnTitle = transfer(language, 'exchange_deep')
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
          {this.renderKlineBtnIfNeeded(kLineOrDepth, language)}
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
      const { lastPrice, selectedPair, language } = this.props
      return (
        <LastPriceList
          language={language}
          selectedPair={selectedPair}
          dataSource={lastPrice}
          cellPressAction={(rd, type) => this.lastPriceCellAction(rd, type)}
        />
      )
    }
    const { openOrders, language } = this.props
    return (
      <OpenOrders
        language={language}
        dataSource={openOrders}
        cancelOrder={id => this.cancelOrder({ id })}
      />
    )
  }

  renderDetailList = () => {
    const { navigation, segmentIndex, language } = this.props
    return (
      <ShelvesList
        titles={[
          transfer(language, 'exchange_fifthOrder'),
          transfer(language, 'home_currentDelegate'),
        ]}
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
    const { orderHistory, selectedPair, language } = this.props
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
    return <LatestDealList language={language} data={data} />
  }

  renderToolBar(language) {
    return (
      <DealTabBar
        language={language}
        titles={[
          transfer(language, 'exchange_buy'),
          transfer(language, 'exchange_sell'),
        ]}
        onPress={index => this.tabBarPress(index)}
      />
    )
  }

  render() {
    const { selectedPair, formData, amountVisible, language } = this.props
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
          <Text style={styles.latestDealHeader}>
            {transfer(language, 'exchange_latest')}
          </Text>
          {this.renderOrderHistory()}
        </ScrollView>
        {this.renderToolBar(language)}
        <DealDrawer
          language={language}
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
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Deal)
