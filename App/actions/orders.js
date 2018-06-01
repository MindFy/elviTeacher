export function openOrderRequest(payload) {
  return {
    type: 'orders/open_order_request',
    payload,
  }
}

export function openOrderRequestSucceed(payload) {
  return {
    type: 'orders/open_order_request_succeed',
    payload,
  }
}

export function openOrderRequestFailed(payload) {
  return {
    type: 'orders/open_order_request_failed',
    payload,
  }
}

export function orderHistoryRequest(payload) {
  return {
    type: 'orders/order_history_request',
    payload,
  }
}

export function orderHistoryRequestFailed(payload) {
  return {
    type: 'orders/order_history_request_failed',
    payload,
  }
}

export function orderHistoryRequestSucceed(payload) {
  return {
    type: 'orders/order_history_request_succeed',
    payload,
  }
}
