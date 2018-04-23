import * as constants from '../constants/index'

export function getRose() {
  return {
    type: constants.GET_ROSE_REQUEST,
  }
}

export function marketListUpdate(data) {
  return {
    type: constants.MARKET_LIST_UPDATE,
    data,
  }
}
