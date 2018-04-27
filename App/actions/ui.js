import * as constants from '../constants/index'

export function selectionBarUpdate(data) {
  return {
    type: constants.SELECTION_BAR_UPDATE,
    data,
  }
}
export function kLineOrDepthUpdate(data) {
  return {
    type: constants.KLINE_DEPTH_UPDATE,
    data,
  }
}
