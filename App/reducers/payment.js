import * as constants from '../constants/index'
import * as api from '../services/api'
import {
  common,
} from '../views/common'

const initialState = {
  paymentRecharge: [],
  paymentWithdraw: [],
  rechargeOrWithdraw: common.recharge,

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
      }
      break
    case constants.FIND_PAYMENT_LIST_RECHARGE_SUCCEED:
      nextState = {
        ...state,
        paymentRecharge: action.response.result.data.find_payment,
      }
      break
    case constants.FIND_PAYMENT_LIST_RECHARGE_FAILED:
      nextState = {
        ...state,
      }
      break
    case constants.FIND_PAYMENT_LIST_WITH_DRAW_REQUEST:
      nextState = {
        ...state,
      }
      break
    case constants.FIND_PAYMENT_LIST_WITH_DRAW_SUCCEED:
      nextState = {
        ...state,
        paymentWithdraw: action.response.result.data.find_payment,
      }
      break
    case constants.FIND_PAYMENT_LIST_WITH_DRAW_FAILED:
      nextState = {
        ...state,
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
    default:
      break
  }
  return nextState
}
