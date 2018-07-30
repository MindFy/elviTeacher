export function requestPairInfo(payload) {
  return {
    type: 'withdraw/request_pair_info',
    payload,
  }
}

export function updateCurrentPair(payload) {
  return {
    type: 'withdraw/update_current_pair',
    payload,
  }
}

export const getCoinMarket = payload => ({
  type: 'market/get_coin_market_request',
  payload,
})

export const setCurrentPair = payload => ({
  type: 'market/set_current_pair',
  payload,
})

export function toggleEdit(payload) {
  return {
    type: 'market/toggle_edit',
    payload,
  }
}

export function getFavorite(payload) {
  return {
    type: 'market/get_favorite_request',
    payload,
  }
}

export function setFavorite(payload) {
  return {
    type: 'market/set_favorite_request',
    payload,
  }
}


export function setInitialized(payload) {
  return {
    type: 'market/set_initialized_state',
    payload,
  }
}

export function modifyNameSort(payload) {
  return {
    type: 'market/modify_name_Sort',
    payload,
  }
}

export function modifyVolumeSort(payload) {
  return {
    type: 'market/modify_volume_Sort',
    payload,
  }
}

export function modifyLastPriceSort(payload) {
  return {
    type: 'market/modify_lastPrice_Sort',
    payload,
  }
}

export function modifyDailyChangeSort(payload) {
  return {
    type: 'market/modify_dailyChange_Sort',
    payload,
  }
}

