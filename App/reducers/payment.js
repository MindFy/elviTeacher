import {
  CANCEL_WITH_DRAW_REQUEST,
  CANCEL_WITH_DRAW_SUCCEED,
  CANCEL_WITH_DRAW_FAILED,

  FIND_PAYMENT_LIST_FAILED,
  FIND_PAYMENT_LIST_REQUEST,
  FIND_PAYMENT_LIST_SUCCEED,

  RECHARGE_FAILED,
  RECHARGE_REQUEST,
  RECHARGE_SUCCEED,

  WITH_DRAW_FAILED,
  WITH_DRAW_REQUEST,
  WITH_DRAW_SUCCEED,
} from '../constants/index'

const initialState = {

  cancelWithDrawVisible: false,
  cancelWithDrawResponse: undefined,

  findPaymentListVisible: false,
  findPaymentListResponse: undefined,

  rechargeVisible: false,
  rechargeResponse: undefined,

  withDrawVisible: false,
  withDrawResponse: undefined,
}

export default function payment(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case CANCEL_WITH_DRAW_REQUEST:
      nextState = {
        ...state,
        cancelWithDrawVisible: true,
      }
      break
    case CANCEL_WITH_DRAW_SUCCEED:
      nextState = {
        ...state,
        cancelWithDrawVisible: false,
        cancelWithDrawResponse: action.response,
      }
      break
    case CANCEL_WITH_DRAW_FAILED:
      nextState = {
        ...state,
        cancelWithDrawVisible: false,
        cancelWithDrawResponse: action.response,
      }
      break
    case FIND_PAYMENT_LIST_REQUEST:
      nextState = {
        ...state,
        findPaymentListVisible: true,
      }
      break
    case FIND_PAYMENT_LIST_SUCCEED:
      nextState = {
        ...state,
        findPaymentListVisible: false,
        findPaymentListResponse: action.response,
      }
      break
    case FIND_PAYMENT_LIST_FAILED:
      nextState = {
        ...state,
        findPaymentListVisible: false,
        findPaymentListResponse: action.response,
      }
      break
    case RECHARGE_REQUEST:
      nextState = {
        ...state,
        rechargeVisible: true,
      }
      break
    case RECHARGE_SUCCEED:
      nextState = {
        ...state,
        rechargeVisible: false,
        rechargeResponse: action.response,
      }
      break
    case RECHARGE_FAILED:
      nextState = {
        ...state,
        rechargeVisible: false,
        rechargeResponse: action.response,
      }
      break
    case WITH_DRAW_REQUEST:
      nextState = {
        ...state,
        withDrawVisible: true,
      }
      break
    case WITH_DRAW_SUCCEED:
      nextState = {
        ...state,
        withDrawVisible: false,
        withDrawResponse: action.response,
      }
      break
    case WITH_DRAW_FAILED:
      nextState = {
        ...state,
        withDrawVisible: false,
        withDrawResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
