import * as constants from '../constants/index'

export function cancelWithdraw(data, paymentWithdraw) {
  return {
    type: constants.CANCEL_WITH_DRAW_REQUEST,
    data,
    paymentWithdraw,
  }
}

export function findPaymentListRecharge(schema, refreshState) {
  return {
    type: constants.FIND_PAYMENT_LIST_RECHARGE_REQUEST,
    schema,
    refreshState,
  }
}

export function findPaymentListWithdraw(schema, refreshState) {
  return {
    type: constants.FIND_PAYMENT_LIST_WITH_DRAW_REQUEST,
    schema,
    refreshState,
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

export function skipPaymentUpdate(data) {
  return {
    type: constants.SKIP_PAYMENT_UPDATE,
    data,
  }
}
