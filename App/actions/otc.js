export function updateForm(payload) {
  return {
    type: 'otc/update_form',
    payload,
  }
}

export function sellRequest(payload) {
  return {
    type: 'otc/sell_request',
    payload,
  }
}

export function sellRequestSucceed(payload) {
  return {
    type: 'otc/sell_request_succeed',
    payload,
  }
}

export function sellRequestFailed(payload) {
  return {
    type: 'otc/sell_request_failed',
    payload,
  }
}

export function buyRequest(payload) {
  return {
    type: 'otc/buy_request',
    payload,
  }
}

export function buyRequestSucceed(payload) {
  return {
    type: 'otc/buy_request_succeed',
    payload,
  }
}

export function buyRequestFailed(payload) {
  return {
    type: 'otc/buy_request_failed',
    payload,
  }
}
