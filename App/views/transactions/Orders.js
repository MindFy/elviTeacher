import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  Text,
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
  openOrderSetError,
  orderHistoryRequest,
  orderHistrorySetError,
  updateSelectedTitle,
  requestCancelOrder,
  requestCancelOrderSetError,
  updateOpenOrderPage,
  updateOrderHistoryPage,
  resetNexus,
  // requestCancelAllOrder,
} from '../../actions/orders'
import {
  findDelegateSelfCurrent,
  findDelegateSelfHistory,
} from '../../schemas/delegate'
import transfer from '../../localization/utils'

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
  status: {
    position: 'absolute',
    right: common.margin5,
    fontSize: common.font10,
    color: common.textColor,
    alignSelf: 'center',
    textAlign: 'right',
  },
  priceView: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: common.borderColor,
    borderBottomWidth: 1,
  },
  amountView: {
    flex: 1,
    flexDirection: 'row',
  },
})

class Orders extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
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
              source={require('../../assets/arrow_left_left.png')}
            />
          </NextTouchableOpacity>
        ),
    }
  }

  constructor(props) {
    super(props)
    this.orderHistoryPage = 0
    this.openOrderPage = 0

    this.openOrderFistLoad = props.navigation.state.params.title !== '当前委托' && true
    this.orderHistoryFistLoad = props.navigation.state.params.title !== '历史委托' && true

    this.limit = 10

    this.state = {
      openOrderReState: RefreshState.Idle,
      orderHistoryReState: RefreshState.Idle,
    }
  }

  componentDidMount() {
    const { navigation, dispatch, language } = this.props
    const { title } = navigation.state.params
    navigation.setParams({
      title: transfer(language, 'exchange_myOrder'),
    })
    dispatch(updateSelectedTitle(title))
    if (title === transfer(language, 'home_currentDelegate')) {
      this.requestOpenOrder()
    } else {
      this.requestOrderHistory()
    }
  }

  componentWillReceiveProps(nexProps) {
    if (this.props.openOrderLoading && !nexProps.openOrderLoading) {
      this.isRefresh = false
      const openOrderLength = nexProps.openOrders.length < (this.openOrderPage + 1) * this.limit
      this.setState({
        openOrderReState: !openOrderLength ? RefreshState.Idle : RefreshState.NoMoreData,
      })
    }

    if (nexProps.openOrderError) {
      this.setState({
        openOrderReState: RefreshState.Idle,
      })
      this.props.dispatch(openOrderSetError(null))
    }

    if (this.props.orderHistoryLoading && !nexProps.orderHistoryLoading) {
      this.isRefresh = false
      const orderHistoryLength =
        nexProps.orderHistory.length < (this.orderHistoryPage + 1) * this.limit
      this.setState({
        orderHistoryReState: !orderHistoryLength ? RefreshState.Idle : RefreshState.NoMoreData,
      })
    }

    if (nexProps.orderHistoryError) {
      this.setState({
        orderHistoryReState: RefreshState.Idle,
      })
      this.props.dispatch(orderHistrorySetError(null))
    }

    if (this.props.cancelOrderLoading && !nexProps.cancelOrderLoading) {
      Toast.success(transfer(this.props.language, 'exchange_withdrawalSuccess'))
    }
    if (nexProps.cancelOrderError) {
      Toast.fail(transfer(this.props.language, 'exchange_withdrawalFailed'))
      this.props.dispatch(requestCancelOrderSetError(null))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetNexus())
  }

  onHeaderRefresh = () => {
    if (this.isRefresh) {
      return
    }
    this.isRefresh = true

    const { titleSeleted, language } = this.props
    if (titleSeleted === transfer(language, 'home_currentDelegate')) {
      this.openOrderPage = 0
      this.props.dispatch(updateOpenOrderPage(this.openOrderPage))
      this.requestOpenOrder()
    } else {
      this.orderHistoryPage = 0
      this.props.dispatch(updateOrderHistoryPage(this.orderHistoryPage))
      this.requestOrderHistory()
    }
  }

  onFooterRefresh = () => {
    if (this.isRefresh) {
      return
    }
    this.isRefresh = true
    const { titleSeleted, language } = this.props

    if (titleSeleted === transfer(language, 'home_currentDelegate')) {
      this.openOrderPage++
      this.props.dispatch(updateOpenOrderPage(this.openOrderPage))
      this.requestOpenOrder()
    } else {
      this.orderHistoryPage++
      this.props.dispatch(updateOrderHistoryPage(this.orderHistoryPage))
      this.requestOrderHistory()
    }
  }

  getDataSource = () => {
    const { titleSeleted, language } = this.props

    if (titleSeleted === transfer(language, 'home_currentDelegate')) {
      return this.props.openOrders || []
    }
    return this.props.orderHistory || []
  }

  getRefreshState = () => {
    const { titleSeleted, language } = this.props

    if (titleSeleted === transfer(language, 'home_currentDelegate')) {
      return this.state.openOrderReState
    }
    return this.state.orderHistoryReState
  }

  requestOrderHistory = () => {
    const { dispatch, user } = this.props
    dispatch(orderHistoryRequest(findDelegateSelfHistory(
      user.id,
      this.limit * this.orderHistoryPage,
      this.limit,
    )))
  }

  requestOpenOrder = () => {
    const { dispatch, user } = this.props
    dispatch(openOrderRequest(findDelegateSelfCurrent(
      user.id,
      this.limit * this.openOrderPage,
      this.limit,
    )))
  }

  cancelOrder = (id) => {
    this.props.dispatch(requestCancelOrder({
      id,
    }))
  }

  topBarPress(e) {
    const { dispatch } = this.props
    if (e.index === 0) {
      this.isRefresh = false
      dispatch(updateSelectedTitle(e.title))
      if (this.openOrderFistLoad) {
        this.requestOpenOrder()
        this.openOrderFistLoad = false
      }
    } else if (e.index === 1) {
      this.isRefresh = false
      dispatch(updateSelectedTitle(e.title))
      if (this.orderHistoryFistLoad) {
        this.requestOrderHistory()
        this.orderHistoryFistLoad = false
      }
    }
  }

  keyExtractor = (item, index) => index

  renderOpenOrderCell = (item, idx, language) => {
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
          <Text style={OOCStyles.price}>{`${transfer(language, 'exchange_price')}: ${price}`}</Text>
          <Text style={OOCStyles.quantity}>{`${transfer(language, 'exchange_quality')}: ${quantity}`}</Text>
          <Text style={OOCStyles.dealled}>{`${transfer(language, 'exchange_changed')}: ${dealled}`}</Text>
        </View>
      </View >
    )
  }

  renderOrderHistoryCell = (item) => {
    const { language } = this.props
    const goodsCurrency = `${item.goods.name}/${item.currency.name}`
    let price
    let averagePrice
    let dealamount
    let dealled
    common.precision(item.goods.name, item.currency.name, (p, q, a) => {
      price = new BigNumber(item.price).toFixed(p, 1)
      dealamount = new BigNumber(item.dealamount).toFixed(a, 1)
      dealled = new BigNumber(item.dealled).toFixed(q, 1)
      averagePrice = new BigNumber(item.dealamount).dividedBy(item.dealled)
      if (averagePrice.isNaN()) {
        averagePrice = 0
      }
      averagePrice = averagePrice.toFixed(p, 1)
    })
    let status = ''
    if (item.status === common.delegate.status.complete) {
      status = transfer(language, 'exchange_complete')
    } else if (item.status === common.delegate.status.cancel) {
      status = transfer(language, 'exchange_canceled')
    }
    const createdAt = common.dfFullDate(item.createdAt)
    const buySell = item.direct === 'buy' ? transfer(language, 'exchange_buy') : transfer(language, 'exchange_sell')
    const buySellColor =
      item.direct === 'sell' ? { color: common.greenColor } : { color: common.redColor }

    return (
      <View style={OOCStyles.cellContainer}>
        <View style={OOCStyles.cellContentContainer}>
          <Text style={OOCStyles.goodsCurrency}>{goodsCurrency}</Text>
          <Text style={[OOCStyles.buySell, buySellColor]}>{buySell}</Text>
          <Text style={OOCStyles.createTime}>{createdAt}</Text>
          <Text style={OHCStyles.status}>{status}</Text>
        </View>
        <View style={OHCStyles.priceView}>
          <Text style={OOCStyles.price}>{`${transfer(language, 'exchange_price')}: ${price}`}</Text>
          <Text style={OOCStyles.quantity}>{`${transfer(language, 'exchange_averagePrice')}: ${averagePrice}`}</Text>
          <Text style={OOCStyles.dealled}>{`${transfer(language, 'exchange_changedAmount')}: ${dealled}`}</Text>
        </View>
        <View style={OHCStyles.amountView}>
          <Text style={OOCStyles.price}>{`${transfer(language, 'exchange_total')}: ${dealamount}`}</Text>
          <Text style={OOCStyles.dealled}>{''}</Text>
        </View>
      </View >
    )
  }

  renderHeader = () => null

  renderCell = ({ item, index }) => {
    const { titleSeleted, language } = this.props

    if (titleSeleted === transfer(language, 'home_currentDelegate')) {
      return this.renderOpenOrderCell(item, index, language)
    }
    return this.renderOrderHistoryCell(item, index, language)
  }

  renderContent = () => {
    const datas = this.getDataSource()
    const refreshState = this.getRefreshState()
    const { language } = this.props
    return (
      <RefreshListView
        data={datas}
        refreshState={refreshState}
        renderItem={this.renderCell}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={this.renderHeader}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
        footerTextStyle={{
          fontSize: common.font14,
          color: common.textColor,
        }}
        footerRefreshingText={transfer(language, 'exchange_dataInLoading')}
        footerFailureText={transfer(language, 'exchange_dataFailureText')}
        footerNoMoreDataText={transfer(language, 'exchange_dataNoMoreData')}
      />
    )
  }

  render() {
    const { navigation, language } = this.props
    const { title } = navigation.state.params

    const titles = [
      transfer(language, 'home_currentDelegate'),
      transfer(language, 'home_historyDelegate'),
    ]
    const indexSelected = titles.indexOf(title) === -1 ? 0 : titles.indexOf(title)

    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <TKSelectionBar
          initialIndexSelected={indexSelected}
          titles={titles}
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
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Orders)
