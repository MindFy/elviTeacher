export function coinSelected(payload) {
  return {
    type: 'recharge/coin_selected',
    payload,
  }
}

export function requestCoinList(payload) {
  return {
    type: 'recharge/request_coin_list',
    payload,
  }
}

export function toggleForm() {
  return {
    type: 'recharge/toggle_form',
  }
}


export function requestCoinListSucceed(payload) {
  return {
    type: 'recharge/request_coin_list_succeed',
    payload,
  }
}

export function requestCoinListFailed(payload) {
  return {
    type: 'recharge/request_coin_list_failed',
    payload,
  }
}

export function requestRechargeAddress(payload) {
  return {
    type: 'recharge/request_recharge_address',
    payload,
  }
}

export function requestRechargeAddressSucceed(payload) {
  return {
    type: 'recharge/request_recharge_address_succeed',
    payload,
  }
}

export function requestRechargeAddressFailed(payload) {
  return {
    type: 'recharge/request_recharge_address_failed',
    payload,
  }
}

export function requestCreateAddress(payload) {
  return {
    type: 'recharge/request_create_address',
    payload,
  }
}

export function requestCreateAddressSucceed(payload) {
  return {
    type: 'recharge/request_create_address_succeed',
    payload,
  }
}

export function requestCreateAddressFailed(payload) {
  return {
    type: 'recharge/request_create_address_failed',
    payload,
  }
}

export function resetNexus() {
  return {
    type: 'recharge/reset_nexus',
  }
}
