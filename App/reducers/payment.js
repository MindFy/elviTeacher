import { RefreshState } from 'react-native-refresh-list-view'
import * as constants from '../constants/index'
import * as api from '../services/api'
import {
  common,
} from '../constants/common'

const initialState = {
  skipRecharge: 0,
  refreshStateRecharge: RefreshState.Idle,
  paymentRecharge: [],
  skipWithdraw: 0,
  refreshStateWithdraw: RefreshState.Idle,
  paymentWithdraw: [],
  rechargeOrWithdraw: common.payment.recharge,

  qrApi: api.qrApi,

  cancelWithDrawVisible: false,
  cancelWithDrawResponse: undefined,

  rechargeVisible: false,
  rechargeResponse: undefined,

  withDrawVisible: false,
  withDrawResponse: undefined,
}

export default function payment(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.CANCEL_WITH_DRAW_REQUEST:
      nextState = {
        ...state,
        cancelWithDrawVisible: true,
      }
      break
    case constants.CANCEL_WITH_DRAW_SUCCEED:
      nextState = {
        ...state,
        cancelWithDrawVisible: false,
        cancelWithDrawResponse: action.response,
      }
      break
    case constants.CANCEL_WITH_DRAW_FAILED:
      nextState = {
        ...state,
        cancelWithDrawVisible: false,
        cancelWithDrawResponse: action.response,
      }
      break
    case constants.FIND_PAYMENT_LIST_RECHARGE_REQUEST:
      nextState = {
        ...state,
        refreshStateRecharge: action.refreshState,
      }
      break
    case constants.FIND_PAYMENT_LIST_RECHARGE_SUCCEED:
      nextState = {
        ...state,
        paymentRecharge: state.refreshStateRecharge === RefreshState.HeaderRefreshing
          ? action.paymentRecharge : state.paymentRecharge.concat(action.paymentRecharge),
        skipRecharge: (state.refreshStateRecharge === RefreshState.FooterRefreshing
          && !action.paymentRecharge.length) ? 0 : (state.skipRecharge + 1),
        refreshStateRecharge: (state.refreshStateRecharge === RefreshState.FooterRefreshing
          && !action.paymentRecharge.length) ? RefreshState.NoMoreData : RefreshState.Idle,
      }
      break
    case constants.FIND_PAYMENT_LIST_RECHARGE_FAILED:
      nextState = {
        ...state,
        refreshStateRecharge: RefreshState.Failure,
      }
      break
    case constants.FIND_PAYMENT_LIST_WITH_DRAW_REQUEST:
      nextState = {
        ...state,
        refreshStateWithdraw: action.refreshState,
      }
      break
    case constants.FIND_PAYMENT_LIST_WITH_DRAW_SUCCEED:
      nextState = {
        ...state,
        paymentWithdraw: state.refreshStateWithdraw === RefreshState.HeaderRefreshing
          ? action.paymentWithdraw : state.paymentWithdraw.concat(action.paymentWithdraw),
        skipWithdraw: (state.refreshStateWithdraw === RefreshState.FooterRefreshing
          && !action.paymentWithdraw.length) ? 0 : (state.skipWithdraw + 1),
        refreshStateWithdraw: (state.refreshStateWithdraw === RefreshState.FooterRefreshing
          && !action.paymentWithdraw.length) ? RefreshState.NoMoreData : RefreshState.Idle,
      }
      break
    case constants.FIND_PAYMENT_LIST_WITH_DRAW_FAILED:
      nextState = {
        ...state,
        refreshStateWithdraw: RefreshState.Failure,
      }
      break
    case constants.RECHARGE_REQUEST:
      nextState = {
        ...state,
        rechargeVisible: true,
      }
      break
    case constants.RECHARGE_SUCCEED:
      nextState = {
        ...state,
        rechargeVisible: false,
        rechargeResponse: action.response,
      }
      break
    case constants.RECHARGE_FAILED:
      nextState = {
        ...state,
        rechargeVisible: false,
        rechargeResponse: action.response,
      }
      break
    case constants.WITH_DRAW_REQUEST:
      nextState = {
        ...state,
        withDrawVisible: true,
      }
      break
    case constants.WITH_DRAW_SUCCEED:
      nextState = {
        ...state,
        withDrawVisible: false,
        withDrawResponse: action.response,
      }
      break
    case constants.WITH_DRAW_FAILED:
      nextState = {
        ...state,
        withDrawVisible: false,
        withDrawResponse: action.response,
      }
      break

    case constants.RECHARGE_OR_WITHDRAW_UPDATE:
      nextState = {
        ...state,
        rechargeOrWithdraw: action.data.rechargeOrWithdraw,
      }
      break
    case constants.SKIP_PAYMENT_UPDATE:
      nextState = {
        ...state,
        skipRecharge: action.data.skipRecharge,
        skipWithdraw: action.data.skipWithdraw,
        refreshStateRecharge: action.data.refreshStateRecharge,
        refreshStateWithdraw: action.data.refreshStateWithdraw,
      }
      break
    default:
      break
  }
  return nextState
}
