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
