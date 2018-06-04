import * as constants from '../constants/index'

export function getRose(data) {
  return {
    type: constants.GET_ROSE_REQUEST,
    data,
  }
}

export function marketListUpdate(data) {
  return {
    type: constants.MARKET_LIST_UPDATE,
    data,
  }
}
