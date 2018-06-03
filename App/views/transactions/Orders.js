import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  Text,
  Alert,
  StyleSheet,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { BigNumber } from 'bignumber.js'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
// import TKSpinner from '../../components/TKSpinner'
import {
  openOrderRequest,
  orderHistoryRequest,
  updateSelectedTitle,
  toggleIsShowTotalPrice,
  requestCancelOrder,
  requestCancelOrderClearError,
  // requestCancelAllOrder,
} from '../../actions/orders'
import {
  findDelegateSelfCurrent,
  findDelegateSelfHistory,
} from '../../schemas/delegate'

const styles = StyleSheet.create({
  container: {

  },
})

// openOrderCellStyles
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
})


// orderHistoryCellStyles
const OHCStyles = StyleSheet.create({
  headerContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMarket: {
    flex: 1,
    color: common.placeholderColor,
    fontSize: common.font12,
  },
  headerSConatiner: {
    flex: 1,
    flexDirection: 'row',
  },
  headerLeft: {
    fontSize: common.font12,
    textAlign: 'right',
  },
  Slash: {
    color: common.placeholderColor,
    fontSize: common.font12,
  },
  headerRight: {
    fontSize: common.font12,
  },
  cellContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 600,
  },
  goodsCurrency: {
    flex: 1,
    fontSize: common.font10,
    color: common.textColor,
    alignSelf: 'center',
    textAlign: 'left',
  },
  averagePriceOrPrice: {
    flex: 1,
    fontSize: common.font10,
    color: common.textColor,
    alignSelf: 'center',
    textAlign: 'center',
  },
  dealledOrdealAmount: {
    flex: 1,
    fontSize: common.font10,
    color: common.textColor,
    alignSelf: 'center',
    textAlign: 'right',
  },
})

class Orders extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '我的委托',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          <NextTouchableOpacity
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </NextTouchableOpacity>
        ),
    }
  }

  constructor(props) {
    super(props)
    this.page = 0
    this.limit = 10
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nexProps) {
    if (nexProps.cancelOrderError) {
      Toast.fail('撤单失败')
      this.props.dispatch(requestCancelOrderClearError())
    }

    if (nexProps.cancelOrderSuccess) {
      Toast.success('撤单成功')
    }
  }

  componentWillUnmount() {

  }

  onHeaderRefresh = () => {
    if (this.state.refreshState === RefreshState.HeaderRefreshing) {
      return
    }
    const { titleSeleted } = this.props
    this.page = 0

    if (titleSeleted === '当前委托') {
      this.requestOpenOrder()
    } else {
      this.requestOrderHistory()
    }
  }

  onFooterRefresh = () => {
    const { titleSeleted } = this.props

    if (titleSeleted === '当前委托') {
      this.requestOpenOrder()
    } else {
      this.requestOrderHistory()
    }
  }

  getDataSource = () => {
    const { titleSeleted } = this.props

    if (titleSeleted === '当前委托') {
      return this.props.openOrders || []
    }
    return this.props.orderHistory || []
  }

  requestOrderHistory = () => {
    const { dispatch, user } = this.props
    dispatch(orderHistoryRequest(findDelegateSelfHistory(
      user.id,
      this.limit * this.page,
      this.limit,
    )))
  }

  requestOpenOrder = () => {
    const { dispatch, user } = this.props
    dispatch(openOrderRequest(findDelegateSelfCurrent(
      user.id,
      this.limit * this.page,
      this.limit,
    )))
  }

  cancelOrder = (id) => {
    this.props.dispatch(requestCancelOrder({
      id,
    }))
  }

  cancelAllOrder = () => {
    const { openOrders } = this.props
    if (openOrders.length === 0) {
      return
    }
    Alert.alert('需求未明确')
    // dispatch(requestCancelAllOrder({
    //   goods_id: 1,
    //   currency_id: 2,
    // }))
  }

  topBarPress(e) {
    const { dispatch } = this.props
    if (e.index === 0) {
      this.page = 0
      this.requestOpenOrder()
      dispatch(updateSelectedTitle(e.title))
    } else if (e.index === 1) {
      this.page = 0
      this.requestOrderHistory()
      dispatch(updateSelectedTitle(e.title))
    }
  }

  keyExtractor = (item, index) => index


  handleClickShowTotalPrice = () => {
    const { dispatch } = this.props
    dispatch(toggleIsShowTotalPrice())
  }

  renderOpenOrderHeader = () => (
    <View style={OOCStyles.headerStyle}>
      <View />
      <NextTouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={this.cancelAllOrder}
      >
        <Text style={OOCStyles.header}>
          全部撤单
        </Text>
      </NextTouchableOpacity>
    </View>
  )


  renderOrderHistoryHeader = () => {
    const { isShowTotalPrice } = this.props

    const rightColor =
    isShowTotalPrice ? { color: common.btnTextColor } : { color: common.placeholderColor }
    const leftColor =
    !isShowTotalPrice ? { color: common.btnTextColor } : { color: common.placeholderColor }

    return (
      <View style={OHCStyles.headerContainer}>
        <Text style={OHCStyles.headerMarket}>市场</Text>
        <View style={OHCStyles.headerSConatiner}>
          <NextTouchableOpacity
            style={{ flex: 1 }}
            disabled={!isShowTotalPrice}
            activeOpacity={common.activeOpacity}
            onPress={this.handleClickShowTotalPrice}
          >
            <Text style={[OHCStyles.headerLeft, leftColor]}>均价</Text>
          </NextTouchableOpacity>
          <Text style={OHCStyles.Slash}> / </Text>
          <NextTouchableOpacity
            style={{ flex: 1 }}
            disabled={isShowTotalPrice}
            activeOpacity={common.activeOpacity}
            onPress={this.handleClickShowTotalPrice}
          >
            <Text style={[OHCStyles.headerRight, rightColor]}>价格</Text>
          </NextTouchableOpacity>
        </View>
        <View style={OHCStyles.headerSConatiner}>
          <NextTouchableOpacity
            style={{ flex: 1 }}
            disabled={!isShowTotalPrice}
            activeOpacity={common.activeOpacity}
            onPress={this.handleClickShowTotalPrice}
          >
            <Text style={[OHCStyles.headerLeft, leftColor]}>成交数量</Text>
          </NextTouchableOpacity>
          <Text style={OHCStyles.Slash}> / </Text>
          <NextTouchableOpacity
            disabled={isShowTotalPrice}
            activeOpacity={common.activeOpacity}
            onPress={this.handleClickShowTotalPrice}
          >
            <Text style={[OHCStyles.headerRight, rightColor]}>金额</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderOpenOrderCell = (item) => {
    const createdAt = common.dfFullDate(item.createdAt)
    let cancelBtnTitle = ''
    let cancelDisabled = true
    if ((item.status === common.delegate.status.dealing)
        || (item.status === common.delegate.status.waiting)) {
      cancelBtnTitle = '撤单'
      cancelDisabled = false
    } else if (item.status === common.delegate.status.cancel) {
      cancelBtnTitle = '已取消'
      cancelDisabled = true
    }
    let goodsName = item.goods ? item.goods.name : ''
    if (item.goods_id) {
      if (item.goods_id === 1) {
        goodsName = common.token.TK
      } else if (item.goods_id === 2) {
        goodsName = common.token.BTC
      } else if (item.goods_id === 3) {
        goodsName = common.token.CNYT
      } else if (item.goods_id === 4) {
        goodsName = common.token.CNY
      }
    }
    let currencyName = item.currency ? item.currency.name : ''
    if (item.currency_id) {
      if (item.currency_id === 1) {
        currencyName = common.token.TK
      } else if (item.currency_id === 2) {
        currencyName = common.token.BTC
      } else if (item.currency_id === 3) {
        currencyName = common.token.CNYT
      } else if (item.currency_id === 4) {
        currencyName = common.token.CNY
      }
    }
    let price
    let quantity
    let dealled
    common.precision(goodsName, currencyName, (p, q) => {
      price = new BigNumber(item.price).toFixed(p, 1)
      quantity = new BigNumber(item.quantity).toFixed(q, 1)
      dealled = new BigNumber(item.dealled).toFixed(q, 1)
    })

    const goodsCurrency = `${goodsName}/${currencyName}`
    const buySell = item.direct === 'buy' ? '买入' : '卖出'
    const buySellColor =
      item.direct === 'sell' ? { color: common.greenColo } : { color: common.redColor }
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
            onPress={() => { this.cancelOrder(item.id) }}
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
          <Text style={OOCStyles.price}>{`价格: ${price}`}</Text>
          <Text style={OOCStyles.quantity}>{`数量: ${quantity}`}</Text>
          <Text style={OOCStyles.dealled}>{`已成交: ${dealled}`}</Text>
        </View>
      </View >
    )
  }

  renderOrderHistoryCell = (item) => {
    const goodsCurrency = `${item.goods.name}/${item.currency.name}`
    let averagePriceOrPrice
    let dealledOrdealAmount

    const { isShowTotalPrice } = this.props
    if (isShowTotalPrice) {
      let averagePrice = new BigNumber(item.dealamount).dividedBy(item.dealled)
      if (averagePrice.isNaN()) {
        averagePrice = 0
      }
      common.precision(item.goods.name, item.currency.name, (p, q) => {
        averagePriceOrPrice = averagePrice.toFixed(p, 1)
        dealledOrdealAmount = new BigNumber(item.dealled).toFixed(q, 1)
      })
    } else {
      common.precision(item.goods.name, item.currency.name, (p, q, a) => {
        averagePriceOrPrice = new BigNumber(item.price).toFixed(p, 1)
        dealledOrdealAmount = new BigNumber(item.dealamount).toFixed(a, 1)
      })
    }
    return (
      <View style={OHCStyles.cellContainer}>
        <Text style={OHCStyles.goodsCurrency}>
          {goodsCurrency}
        </Text>
        <Text style={OHCStyles.averagePriceOrPrice}>
          {averagePriceOrPrice}
        </Text>
        <Text style={OHCStyles.dealledOrdealAmount}>
          {dealledOrdealAmount}
        </Text>
      </View>
    )
  }

  renderHeader = () => {
    const { titleSeleted } = this.props

    if (titleSeleted === '当前委托') {
      return this.renderOpenOrderHeader()
    }
    return this.renderOrderHistoryHeader()
  }

  renderCell = ({ item, index }) => {
    const { titleSeleted } = this.props

    if (titleSeleted === '当前委托') {
      return this.renderOpenOrderCell(item, index)
    }
    return this.renderOrderHistoryCell(item, index)
  }

  renderContent = () => {
    const datas = this.getDataSource()
    const { refreshState } = this.state

    return (
      <RefreshListView
        data={datas}
        renderItem={this.renderCell}
        keyExtractor={this.keyExtractor}
        refreshState={refreshState}
        ListHeaderComponent={this.renderHeader}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
        footerTextStyle={{
          fontSize: common.font14,
          color: 'red',
        }}
      />
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <TKSelectionBar
          titles={['当前委托', '历史委托']}
          onPress={(e) => { this.topBarPress(e) }}
        />
        {this.renderContent()}
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.orders,
    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Orders)
