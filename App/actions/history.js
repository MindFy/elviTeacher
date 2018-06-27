export function requestDeposit(payload) {
  return {
    type: 'history/request_deposit',
    payload,
  }
}

export function requestWithdraw(payload) {
  return {
    type: 'history/request_withdraw',
    payload,
  }
}

export function requestOtc(payload) {
  return {
    type: 'history/request_otc',
    payload,
  }
}

export function withdrawCancel(payload) {
  return {
    type: 'history/withdraw_cancel',
    payload,
  }
}

export function withdrawUpdate(payload) {
  return {
    type: 'history/withdraw_update',
    payload,
  }
}

export function depositPageUpdate(payload) {
  return {
    type: 'history/deposit_page_update',
    payload,
  }
}

export function withdrawPageUpdate(payload) {
  return {
    type: 'history/withdraw_page_update',
    payload,
  }
}

export function otcPageUpdate(payload) {
  return {
    type: 'history/otc_page_update',
    payload,
  }
}
