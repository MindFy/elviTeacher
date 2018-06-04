export function coinSelected(payload) {
  return {
    type: 'withdraw/coin_selected',
    payload,
  }
}

export function toggleForm(payload) {
  return {
    type: 'withdraw/toggle_form',
    payload,
  }
}

export function requestCoinList(payload) {
  return {
    type: 'withdraw/request_coin_list',
    payload,
  }
}

export function requestCoinListSucceed(payload) {
  return {
    type: 'withdraw/request_coin_list_succeed',
    payload,
  }
}

export function requestCoinListFailed(payload) {
  return {
    type: 'withdraw/request_coin_list_failed',
    payload,
  }
}

export function updateForm(payload) {
  return {
    type: 'withdraw/update_form',
    payload,
  }
}

export function requestBalance(payload) {
  return {
    type: 'withdraw/request_balance',
    payload,
  }
}

export function requestBalanceSucceed(payload) {
  return {
    type: 'withdraw/request_balance_succeed',
    payload,
  }
}

export function requestBalanceFailed(payload) {
  return {
    type: 'withdraw/request_balance_failed',
    payload,
  }
}

export function requestValuation() {
  return {
    type: 'withdraw/requset_valuation',
  }
}

export function requestValuationSucceed(payload) {
  return {
    type: 'withdraw/requset_valuation_succeed',
    payload,
  }
}

export function requestValuationFailed(payload) {
  return {
    type: 'withdraw/requset_valuation_failed',
    payload,
  }
}

export function requestWithdraw(payload) {
  return {
    type: 'withdraw/request_withdraw',
    payload,
  }
}

export function requestWithdrawSuccess(payload) {
  return {
    type: 'withdraw/request_withdraw_succeed',
    payload,
  }
}

export function requestWithdrawFailed(payload) {
  return {
    type: 'withdraw/request_withdraw_failed',
    payload,
  }
}

export function requestWithdrawClearError() {
  return {
    type: 'withdraw/request_withdraw_clear_error',
  }
}

export function withdrawClear() {
  return {
    type: 'withdraw/clear',
  }
}

