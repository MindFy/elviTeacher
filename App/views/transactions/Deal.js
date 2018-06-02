import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  Menu,
  Drawer,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import KLine from './KLineWeb'
import DealDrawer from './DealDrawer'
import Depth from '../transactions/Depth'
import ShelvesList from './ShelvesList'
import actions from '../../actions/index'
import { store } from '../../index'
import LatestDealList from './LatestDealList'
import DealNavigator from './DealNavigator'
import DealTabBar from './DealTabBar'
import DealMarket from './DealMarket'

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
  menuPress() {
    const { dispatch, homeRose } = this.props
    const items = []
    homeRose.forEach((element) => {
      items.push({
        title: `${element.goods.name}/${element.currency.name}`,
        onPress: () => {
          dispatch(actions.homeRoseSelectedUpdate(element))
        },
      })
    })
    Menu.show({ x: common.sw / 2, y: 64 }, items)
  }

  tapBuySellBtn = () => {
    this.drawer.close()
  }

  tabBarPress(index) {
    const { dispatch, buyOrSell, user, navigation } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    let temp = true
    if (index === 1) temp = false
    if (buyOrSell !== temp) {
      dispatch(actions.buyOrSellUpdate(temp))
      dispatch(actions.textInputDelegateUpdate({ price: '', quantity: '', amount: '' }))
      const view = (
        <Provider store={store}>
          <DealDrawer
            onPress={() => this.tapBuySellBtn()}
          />
        </Provider>
      )
      this.drawer = Drawer.open(view, 'bottom')
    }
  }

  renderNavigationBar = () => {
    const { navigation, homeRoseSelected, user } = this.props

    const goodsName = homeRoseSelected.goods.name
    const currencyName = homeRoseSelected.currency.name

    return (
      <DealNavigator
        titles={[`${goodsName}/${currencyName}`, '我的委托']}
        onPress={(type) => {
          if (type === 'leftBtn') {
            navigation.goBack()
          } else if (type === 'title') {
            this.menuPress()
          } else if (type === 'rightBtn') {
            if (user) navigation.navigate('Orders')
            else navigation.navigate('LoginStack')
          }
        }}
      />
    )
  }

  renderMarketView = () => {
    const { homeRoseSelected, valuation } = this.props
    const currencyName = homeRoseSelected.currency.name
    let quantity = ''
    let cprice = ''
    const rose = homeRoseSelected.rose
    let rmb = '0.00'

    if (homeRoseSelected) {
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        cprice = new BigNumber(homeRoseSelected.cprice).toFixed(p, 1)
        quantity = new BigNumber(homeRoseSelected.quantity).toFixed(q, 1)
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
    const { dispatch, kLineOrDepth } = this.props
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
            ? <KLine
              width={common.sw}
              height={common.h263}
            />
            : <Depth />
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

  renderDetailList = () => {
    const { navigation } = this.props
    return <ShelvesList navigation={navigation} />
  }

  renderOrderHistory = () => {
    const { latestDeals, homeRoseSelected } = this.props
    const data = []
    latestDeals.map((item) => {
      let price
      let quantity
      const direct = item.endDirect
      const createdAt = common.dfTime(item.createdAt)
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        price = new BigNumber(item.dealPrice).toFixed(p, 1)
        quantity = new BigNumber(item.quantity).toFixed(q, 1)
      })
      return data.push({
        price,
        quantity,
        direct,
        createdAt,
      })
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
    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}

        <ScrollView>

          {this.renderMarketView()}

          {this.renderDepthView()}

          {this.renderDetailList()}

          <Text style={styles.latestDealHeader}>
            最新成交
          </Text>

          {this.renderOrderHistory()}

        </ScrollView>

        {this.renderToolBar()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,

    valuation: state.asset.valuation,

    homeRose: state.dealstat.homeRose,
    homeRoseSelected: state.dealstat.homeRoseSelected,

    latestDeals: state.deal.latestDeals,

    kLineOrDepth: state.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Deal)
