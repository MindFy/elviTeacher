import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import RefreshListView from 'react-native-refresh-list-view'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
// import TKSpinner from '../../components/TKSpinner'
import {
  openOrderRequest,
  orderHistoryRequest,
} from '../../actions/orders'
import {
  findDelegateSelfCurrent,
  findDelegateSelfHistory,
} from '../../schemas/delegate'

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
          <TouchableOpacity
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
          </TouchableOpacity>
        ),
    }
  }

  constructor(props) {
    super(props)

    this.page = 0
    this.limit = 10
  }

  componentDidMount() {
    // const { navigation } = this.props
    // if (navigation.state.parms.fromTitle === '当前委托') {
    // } else {
    // }
  }

  componentWillUnmount() {

  }

  requestOpenOrder = () => {
    const { dispatch, user } = this.props
    dispatch(openOrderRequest(findDelegateSelfCurrent(
      user.id,
      this.limit * this.page,
      this.limit,
    )))
  }

  requestOrderHistory = () => {
    const { dispatch, user } = this.props
    dispatch(orderHistoryRequest(findDelegateSelfHistory(
      user.id,
      this.limit * this.page,
      this.limit,
    )))
  }

  topBarPress(e) {
    if (e.index === 0) {
      this.page = 0
      this.requestOpenOrder()
    } else if (e.index === 1) {
      this.page = 0
      this.requestOrderHistory()
    }
  }

  renderOpenOrderCell = (item, index) => {
    const { dispatch } = this.props

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
              color: item.direct === 'sell' ? common.greenColor : common.redColor,
              fontSize: common.font12,
              width: '10%',
              alignSelf: 'center',
              textAlign: 'left',
            }}
          >{item.direct === 'buy' ? '买入' : '卖出'}</Text>
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
            // onPress={() => cancelBlock(rd, rid)}
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

  renderOrderHistoryHeader = () => (
    <View
      style={{
        marginTop: common.margin10,
        marginLeft: common.margin10,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          flex: 1,
          color: common.placeholderColor,
          fontSize: common.font12,
        }}
      >市场</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            // dispatch(actions.averagePriceOrPriceUpdate(common.ui.averagePrice))
          }}
        >
          <Text
            style={{
              color: common.btnTextColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >均价</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: common.placeholderColor,
            fontSize: common.font12,
          }}
        > / </Text>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            // dispatch(actions.averagePriceOrPriceUpdate(common.ui.price))
          }}
        >
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >价格</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            // dispatch(actions.dealledOrQuantityUpdate(common.ui.dealled))
          }}
        >
          <Text
            style={{
              color: common.btnTextColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >成交数量</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: common.placeholderColor,
            fontSize: common.font12,
          }}
        > / </Text>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => {
            // dispatch(actions.dealledOrQuantityUpdate(common.ui.quantity))
          }}
        >
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >金额</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  renderOrderHistoryCell = ({ item, index }) => {
  }

  renderContent = () => {
    const { orderHistory } = this.props
    return (
      <RefreshListView
        data={orderHistory}
        renderItem={this.renderOrderHistoryCell}
        ListHeaderComponent={() => this.renderOrderHistoryHeader()}
        // refreshState={refreshState}
        onHeaderRefresh={() => {}}
        onFooterRefresh={() => {}}
        footerTextStyle={{
          fontSize: common.font14,
          color: common.textColor,
        }}
      />
    )
  }

  render() {
    const { dispatch } = this.props
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
