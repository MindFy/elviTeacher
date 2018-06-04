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
