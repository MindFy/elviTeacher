import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native'
import { RefreshState } from 'react-native-refresh-list-view'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import HistoryList from './HistoryList'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

class History extends Component {
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

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'recharge_historyList'),
    })
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
      dispatch(actions.findLegalDeal(schemas.findOtcList({
        id: user.id,
        skip: 0,
        limit: common.legalDeal.limit,
      }), RefreshState.HeaderRefreshing))
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
      refreshStateWithdraw,
      language,
    } = this.props

    const listLanguage = {
      date: transfer(language, 'history_date'),
      coin: transfer(language, 'history_coin'),
      amount: transfer(language, 'history_amount'),
      type: transfer(language, 'history_type'),
      status: transfer(language, 'history_status'),
      action: transfer(language, 'history_action'),
      buy: transfer(language, 'history_buy'),
      sell: transfer(language, 'history_sell'),
      cancel: transfer(language, 'history_cancel'),
      deposited: transfer(language, 'history_deposited'),
      withdrawed: transfer(language, 'history_withdrawed'),
      cancelled: transfer(language, 'history_cancelled'),
      withdrawing: transfer(language, 'history_withdrawing'),
      pending: transfer(language, 'history_pending'),
      loading: transfer(language, 'history_list_loading'),
      noMoreData: transfer(language, 'history_list_noMoreData'),
      reload: transfer(language, 'history_list_reload'),
    }

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
          titles={[transfer(language, 'history_deposit'),
            transfer(language, 'history_withdrawal'),
            transfer(language, 'history_otc')]}
          onPress={(e) => {
            if (e.title === transfer(language, 'history_deposit')) {
              dispatch(actions.rechargeOrWithdrawUpdate({
                rechargeOrWithdraw: common.payment.recharge,
              }))
            } else if (e.title === transfer(language, 'history_withdrawal')) {
              dispatch(actions.rechargeOrWithdrawUpdate({
                rechargeOrWithdraw: common.payment.withdraw,
              }))
            } else if (e.title === transfer(language, 'history_otc')) {
              dispatch(actions.rechargeOrWithdrawUpdate({
                rechargeOrWithdraw: common.payment.legalDeal,
              }))
            }
          }}
        />

        {
          rechargeOrWithdraw === common.payment.recharge
            ? <HistoryList
              language={listLanguage}
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
              language={listLanguage}
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
              language={listLanguage}
              data={legalDeal}
              rechargeOrWithdraw={rechargeOrWithdraw}
              refreshState={refreshStateLegalDeal}
              onHeaderRefresh={() => {
                if (refreshStateLegalDeal !== RefreshState.NoMoreData
                  || refreshStateLegalDeal !== RefreshState.FooterRefreshing) {
                  if (user) {
                    dispatch(actions.findLegalDeal(schemas.findOtcList({
                      id: user.id,
                      skip: 0,
                      limit: common.legalDeal.limit,
                    }), RefreshState.HeaderRefreshing))
                  }
                }
              }}
              onFooterRefresh={() => {
                if (user && refreshStateLegalDeal !== RefreshState.NoMoreData
                  || refreshStateLegalDeal !== RefreshState.HeaderRefreshing) {
                  if (user) {
                    dispatch(actions.findLegalDeal(schemas.findOtcList({
                      id: user.id,
                      skip: skipLegalDeal,
                      limit: common.legalDeal.limit,
                    }), RefreshState.FooterRefreshing))
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
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(History)
