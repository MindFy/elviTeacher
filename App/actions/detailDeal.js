import * as constants from '../constants/index'

export function detailupdateKV(k, v) {
  return {
    type: constants.DETAIL_DEAL_UPDATEKV,
    k,
    v,
  }
}

export function updateKVHAHAHA() {
  return {
    type: constants.DETAIL_DEAL_HAHAHA,
  }
}
