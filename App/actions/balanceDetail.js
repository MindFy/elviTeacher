export function updateCurrentToken(payload) {
  return {
    type: 'balanceDetail/update_current_token',
    payload,
  }
}

export function updateCurrentTokenBalance(payload) {
  return {
    type: 'balanceDetail/update_current_token_balance',
    payload,
  }
}

export function requestDailyChange() {
  return {
    type: 'balanceDetail/request_daily_change',
  }
}

export function requestDailyChangeSuccess(payload) {
  return {
    type: 'balance_detail_request_success',
    payload,
  }
}

export function requestDailyChangeFailed() {
  return {
    type: 'balance_detail_request_failed',
  }
}
