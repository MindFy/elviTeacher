import * as constants from '../constants/index'

export function rebatesCount(data) {
  return {
    type: constants.REBATES_COUNT_REQUEST,
    data,
  }
}

export function rebatesCountTK(data) {
  return {
    type: constants.REBATES_COUNT_TK_REQUEST,
    data,
  }
}

export function rebatesCountBTC(data) {
  return {
    type: constants.REBATES_COUNT_BTC_REQUEST,
    data,
  }
}

