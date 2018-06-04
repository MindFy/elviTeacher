import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ListView,
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
import * as exchange from '../../actions/exchange'

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
  shelvesList: {
    flexDirection: 'row',
    marginLeft: common.margin15,
    marginRight: common.margin15,
  },
  shelvesListHeaderView: {
    marginTop: common.margin10,
    borderBottomColor: common.placeholderColor,
    borderBottomWidth: 1,
  },
  shelvesListHeaderTitle: {
    color: common.placeholderColor,
    fontSize: common.font12,
    paddingBottom: common.margin5,
  },
  shelvesListRowView: {
    marginTop: common.margin5,
    marginLeft: 1,
    marginRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

class Deal extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentDidMount() {
    const { dispatch, selectedPair } = this.props
    const { currency, goods } = selectedPair
    const params = {
      goods_id: goods.id,
      currency_id: currency.id,
    }
    dispatch(exchange.requestLastpriceList(params))
    dispatch(exchange.requestOrderhistoryList(params))
  }

  menuPress() {
    // const { dispatch, homeRose } = this.props
    // const items = []
    // homeRose.forEach((element) => {
    //   items.push({
    //     title: `${element.goods.name}/${element.currency.name}`,
    //     onPress: () => {
    //       dispatch(actions.selectedPairUpdate(element))
    //     },
    //   })
    // })
    // Menu.show({ x: common.sw / 2, y: 64 }, items)
  }

  tapBuySellBtn = () => {
    this.drawer.close()
  }

  tabBarPress(index) {
    const { dispatch, selectedPair, user, navigation, formData, amountVisible } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    const view = (
      <DealDrawer
        index={index}
        formData={formData}
        amountVisible={amountVisible}
        selectedPair={selectedPair}
        onPress={() => this.tapBuySellBtn()}
      />
    )
    this.drawer = Drawer.open(view, 'bottom')
  }

  renderNavigationBar = () => {
    const { navigation, selectedPair, user } = this.props

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
            if (user) navigation.navigate('Orders')
            else navigation.navigate('LoginStack')
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

  renderShelvesRow(rd, rid, type) {
    const { selectedPair } = this.props
    let price
    let sumQuantity
    let title
    let titleColor
    let detail
    let detailColor
    common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q) => {
      price = new BigNumber(rd.price).toFixed(p, 1)
      sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
    })
    if (type === common.buy) {
      title = sumQuantity
      titleColor = common.textColor
      detail = price
      detailColor = common.redColor
    } else if (type === common.sell) {
      title = price
      titleColor = common.greenColor
      detail = sumQuantity
      detailColor = common.textColor
    }
    return (
      <View style={styles.shelvesListRowView}>
        <Text
          style={{
            fontSize: common.font12,
            color: titleColor,
          }}
        >{title}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: detailColor,
          }}
        >{detail}</Text>
      </View>
    )
  }

  renderHeader(type) {
    let text = ''
    if (type === common.buy) {
      text = '买'
    } else if (type === common.sell) {
      text = '卖'
    }
    return (
      <View style={styles.shelvesListHeaderView}>
        <Text style={styles.shelvesListHeaderTitle}>
          {text}
        </Text>
      </View>
    )
  }

  renderShelvesListChildren(index) {
    if (index === 0) {
      const { lastPrice } = this.props
      return (
        <View style={styles.shelvesList}>
          <ListView
            style={{ width: '50%' }}
            dataSource={this.dataSource.cloneWithRows(lastPrice.buy)}
            renderHeader={() => this.renderHeader(common.buy)}
            renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, rid, common.buy)}
            enableEmptySections
            removeClippedSubviews={false}
          />
          <ListView
            style={{ width: '50%' }}
            dataSource={this.dataSource.cloneWithRows(lastPrice.sell)}
            renderHeader={() => this.renderHeader(common.sell)}
            renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, rid, common.sell)}
            enableEmptySections
            removeClippedSubviews={false}
          />
        </View>
      )
    }
    return null
  }

  renderDetailList = () => {
    const { navigation, segmentIndex, dispatch } = this.props
    return (
      <ShelvesList
        titles={['盘口五档', '当前委托']}
        segmentIndex={segmentIndex}
        segmentValueChanged={(e) => {
          if (segmentIndex !== e) {
            dispatch(exchange.updateSegmentIndex(e))
          }
        }}
        renderChildComponent={index => this.renderShelvesListChildren(index)}
        navigation={navigation}
      />
    )
  }

  renderOrderHistory = () => {
    const { orderHistory, selectedPair } = this.props
    const data = orderHistory.map((item) => {
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
    selectedPair: state.exchange.selectedPair,
    segmentIndex: state.exchange.segmentIndex,
    orderHistory: state.exchange.orderHistory,
    lastPrice: state.exchange.lastPrice,
    formData: state.exchange.formData,
    amountVisible: state.asset.amountVisible,

    valuation: state.asset.valuation,
    kLineOrDepth: state.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Deal)
