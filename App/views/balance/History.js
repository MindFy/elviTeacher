import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { RefreshState } from 'react-native-refresh-list-view'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import HistoryList from './HistoryList'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class History extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '历史记录',
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

  componentDidMount() {
    const { dispatch, user } = this.props

    if (user) {
      dispatch(actions.findPaymentListRecharge(
        schemas.findPaymentListRecharge(user.id, 0, common.payment.limitRecharge)
        , RefreshState.HeaderRefreshing))
      dispatch(actions.findPaymentListWithdraw(
        schemas.findPaymentListWithdraw(user.id, 0, common.payment.limitWithdraw)
        , RefreshState.HeaderRefreshing))
      dispatch(actions.findLegalDeal(schemas.findLegalDeal(user.id, 0, common.legalDeal.limit)
        , RefreshState.HeaderRefreshing))
    }
  }

  componentWillUnmount() {
    const { dispatch, rechargeOrWithdraw } = this.props
    if (rechargeOrWithdraw !== common.payment.recharge) {
      dispatch(actions.rechargeOrWithdrawUpdate({
        rechargeOrWithdraw: common.payment.recharge,
      }))
    }
    dispatch(actions.skipPaymentUpdate({
      skipRecharge: 0,
      skipWithdraw: 0,
      refreshStateRecharge: RefreshState.Idle,
      refreshStateWithdraw: RefreshState.Idle,
    }))
    dispatch(actions.skipLegalDealUpdate({
      skip: 0,
      refreshState: RefreshState.Idle,
    }))
  }

  render() {
    const { dispatch, rechargeOrWithdraw, paymentRecharge, paymentWithdraw, legalDeal, user,
      skipLegalDeal, skipRecharge, skipWithdraw, refreshStateLegalDeal, refreshStateRecharge,
      refreshStateWithdraw } = this.props

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />

        <TKSelectionBar
          titles={['充值记录', '提现记录', '法币交易记录']}
          onPress={(e) => {
            if (e.title === '充值记录') {
              dispatch(actions.rechargeOrWithdrawUpdate({
                rechargeOrWithdraw: common.payment.recharge,
              }))
            } else if (e.title === '提现记录') {
              dispatch(actions.rechargeOrWithdrawUpdate({
                rechargeOrWithdraw: common.payment.withdraw,
              }))
            } else if (e.title === '法币交易记录') {
              dispatch(actions.rechargeOrWithdrawUpdate({
                rechargeOrWithdraw: common.payment.legalDeal,
              }))
            }
          }}
        />

        {
          rechargeOrWithdraw === common.payment.recharge
            ? <HistoryList
              data={paymentRecharge}
              rechargeOrWithdraw={rechargeOrWithdraw}
              refreshState={refreshStateRecharge}
              onHeaderRefresh={() => {
                if (refreshStateRecharge !== RefreshState.NoMoreData
                  || refreshStateRecharge !== RefreshState.FooterRefreshing) {
                  if (user) {
                    dispatch(actions.findPaymentListRecharge(
                      schemas.findPaymentListRecharge(
                        user.id, 0, common.payment.limitRecharge,
                      ), RefreshState.HeaderRefreshing))
                  }
                }
              }}
              onFooterRefresh={() => {
                if (user && refreshStateRecharge !== RefreshState.NoMoreData
                  || refreshStateRecharge !== RefreshState.HeaderRefreshing) {
                  if (user) {
                    dispatch(actions.findPaymentListRecharge(
                      schemas.findPaymentListRecharge(
                        user.id,
                        skipRecharge * common.payment.limitRecharge,
                        common.payment.limitRecharge,
                      ), RefreshState.FooterRefreshing))
                  }
                }
              }}
            /> : null
        }
        {
          rechargeOrWithdraw === common.payment.withdraw
            ? <HistoryList
              data={paymentWithdraw}
              rechargeOrWithdraw={rechargeOrWithdraw}
              refreshState={refreshStateWithdraw}
              onHeaderRefresh={() => {
                if (refreshStateWithdraw !== RefreshState.NoMoreData
                  || refreshStateWithdraw !== RefreshState.FooterRefreshing) {
                  if (user) {
                    dispatch(actions.findPaymentListWithdraw(
                      schemas.findPaymentListWithdraw(
                        user.id, 0, common.payment.limitWithdraw,
                      ), RefreshState.HeaderRefreshing))
                  }
                }
              }}
              onFooterRefresh={() => {
                if (user && refreshStateWithdraw !== RefreshState.NoMoreData
                  || refreshStateWithdraw !== RefreshState.HeaderRefreshing) {
                  if (user) {
                    dispatch(actions.findPaymentListWithdraw(
                      schemas.findPaymentListWithdraw(
                        user.id,
                        skipWithdraw * common.payment.limitWithdraw,
                        common.payment.limitWithdraw,
                      ), RefreshState.FooterRefreshing))
                  }
                }
              }}
              cancelWithdraw={(rd, rid) => {
                const temp = paymentWithdraw.concat()
                temp[rid].status = '已取消'
                dispatch(actions.cancelWithdraw({ id: rd.id }, temp))
              }}
            /> : null
        }
        {
          rechargeOrWithdraw === common.payment.legalDeal
            ? <HistoryList
              data={legalDeal}
              rechargeOrWithdraw={rechargeOrWithdraw}
              refreshState={refreshStateLegalDeal}
              onHeaderRefresh={() => {
                if (refreshStateLegalDeal !== RefreshState.NoMoreData
                  || refreshStateLegalDeal !== RefreshState.FooterRefreshing) {
                  if (user) {
                    dispatch(actions.findLegalDeal(
                      schemas.findLegalDeal(user.id, 0, common.legalDeal.limit),
                      RefreshState.HeaderRefreshing))
                  }
                }
              }}
              onFooterRefresh={() => {
                if (user && refreshStateLegalDeal !== RefreshState.NoMoreData
                  || refreshStateLegalDeal !== RefreshState.HeaderRefreshing) {
                  if (user) {
                    dispatch(actions.findLegalDeal(schemas.findLegalDeal(
                      user.id,
                      common.legalDeal.limit * skipLegalDeal,
                      common.legalDeal.limit,
                    ), RefreshState.FooterRefreshing))
                  }
                }
              }}
            /> : null
        }

        <ScrollView />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,
    skipRecharge: store.payment.skipRecharge,
    refreshStateRecharge: store.payment.refreshStateRecharge,
    paymentRecharge: store.payment.paymentRecharge,
    skipWithdraw: store.payment.skipWithdraw,
    refreshStateWithdraw: store.payment.refreshStateWithdraw,
    paymentWithdraw: store.payment.paymentWithdraw,
    rechargeOrWithdraw: store.payment.rechargeOrWithdraw,

    legalDeal: store.legalDeal.legalDeal,
    skipLegalDeal: store.legalDeal.skip,
    refreshStateLegalDeal: store.legalDeal.refreshState,
  }
}

export default connect(
  mapStateToProps,
)(History)
