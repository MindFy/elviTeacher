import {
  CANCEL_WITH_DRAW_REQUEST,

  FIND_PAYMENT_LIST_REQUEST,

  RECHARGE_REQUEST,

  WITH_DRAW_REQUEST,
} from '../constants/index'

export function cancelWithdraw(data) {
  return {
    type: CANCEL_WITH_DRAW_REQUEST,
    data,
  }
}

export function findPaymentList(schema) {
  return {
    type: FIND_PAYMENT_LIST_REQUEST,
    schema,
  }
}

export function recharge(data) {
  return {
    type: RECHARGE_REQUEST,
    data,
  }
}

export function withdraw(data) {
  return {
    type: WITH_DRAW_REQUEST,
    data,
  }
}
