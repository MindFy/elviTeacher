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

export function updateSelectedTitle(payload) {
  return {
    type: 'orders/update_selected_title',
    payload,
  }
}

export function toggleIsShowTotalPrice() {
  return {
    type: 'orders/toggle_is_show_totalPrice',
  }
}

export function requestCancelOrder() {
  return {
    type: 'orders/request_cancel_order',
  }
}

export function requestCancelAllOrder() {
  return {
    type: 'orders/request_cancel_all_order',
  }
}

export function requestCancelOrderClearError(payload) {
  return {
    type: 'orders/request_cancel_order_clear_error',
    payload,
  }
}

export function updateRefreshState(payload) {
  return {
    type: 'orders/update_refreshState',
    payload,
  }
}

