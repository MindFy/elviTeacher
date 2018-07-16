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

