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
    type: 'exchange/update_segmentIndex',
    payload,
  }
}
