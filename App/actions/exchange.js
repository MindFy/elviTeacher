export function updatePair(payload) {
  return {
    type: 'exchange/update_pair',
    payload,
  }
}

export function requestLastpriceList(payload) {
  return {
    type: 'exchange/request_lastprice_list',
    payload,
  }
}

export function requestLastpriceListSucceed(payload) {
  return {
    type: 'exchange/request_lastprice_list_succeed',
    payload,
  }
}

export function requestLastpriceListFailed(payload) {
  return {
    type: 'exchange/request_lastprice_list_failed',
    payload,
  }
}

export function requestOpenordersList(payload) {
  return {
    type: 'exchange/request_openorders_list',
    payload,
  }
}

export function requestOpenordersListSucceed(payload) {
  return {
    type: 'exchange/request_openorders_list_succeed',
    payload,
  }
}

export function requestOpenordersListFailed(payload) {
  return {
    type: 'exchange/request_openorders_list_failed',
    payload,
  }
}

export function requestOrderhistoryList(payload) {
  return {
    type: 'exchange/request_orderhistory_list',
    payload,
  }
}

export function requestOrderhistoryListSucceed(payload) {
  return {
    type: 'exchange/request_orderhistory_list_succeed',
    payload,
  }
}

export function requestOrderhistoryListFailed(payload) {
  return {
    type: 'exchange/request_orderhistory_list_failed',
    payload,
  }
}

export function updateForm(payload) {
  return {
    type: 'exchange/update_form',
    payload,
  }
}

export function updateSegmentIndex(payload) {
  return {
    type: 'exchange/update_segment_index',
    payload,
  }
}

export function createOrder(payload) {
  return {
    type: 'exchange/create_order',
    payload,
  }
}

export function clearResponse() {
  return {
    type: 'exchange/clear_response',
  }
}

export function updateCreateOrderIndex(payload) {
  return {
    type: 'exchange/update_order_index',
    payload,
  }
}

export function requestCancelOrder(payload) {
  return {
    type: 'exchange/request_cancel_order',
    payload,
  }
}

export function requestCancelOrderSetError(payload) {
  return {
    type: 'exchange/request_cancel_order_set_error',
    payload,
  }
}

export function requestValuation() {
  return {
    type: 'exchange/requset_valuation',
  }
}

export function requestValuationSucceed(payload) {
  return {
    type: 'exchange/requset_valuation_succeed',
    payload,
  }
}

export function requestValuationFailed(payload) {
  return {
    type: 'exchange/requset_valuation_failed',
    payload,
  }
}

export function requestDepthMap(payload) {
  return {
    type: 'exchange/request_depth_map',
    payload,
  }
}

export function clearOpenOrders() {
  return {
    type: 'exchange/clear_open_orders',
  }
}

export function updateCurrentPair(payload) {
  return {
    type: 'exchange/update_current_pair',
    payload,
  }
}

export function updateKLineIndex(payload) {
  return {
    type: 'exchange/update_kLine_index',
    payload,
  }
}

export function checkFavorite(payload) {
  return {
    type: 'exchange/check_favorite_request',
    payload,
  }
}

export function setFavorite(payload) {
  return {
    type: 'exchange/set_favorite_request',
    payload,
  }
}
