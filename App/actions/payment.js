import * as constants from '../constants/index'

export function cancelWithdraw(data) {
  return {
    type: constants.CANCEL_WITH_DRAW_REQUEST,
    data,
  }
}

export function findPaymentListRecharge(schema) {
  return {
    type: constants.FIND_PAYMENT_LIST_RECHARGE_REQUEST,
    schema,
  }
}

export function findPaymentListWithdraw(schema) {
  return {
    type: constants.FIND_PAYMENT_LIST_WITH_DRAW_REQUEST,
    schema,
  }
}

export function recharge(data) {
  return {
    type: constants.RECHARGE_REQUEST,
    data,
  }
}

export function withdraw(data) {
  return {
    type: constants.WITH_DRAW_REQUEST,
    data,
  }
}

export function rechargeOrWithdrawUpdate(data) {
  return {
    type: constants.RECHARGE_OR_WITHDRAW_UPDATE,
    data,
  }
}
