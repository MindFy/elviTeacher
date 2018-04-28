import * as constants from '../constants/index'
import {
  common,
} from '../constants/common'

const initialState = {
  selectionBarSelected: common.selectionBar.left,
  kLineOrDepth: common.ui.kLine,
}

export default function ui(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.SELECTION_BAR_UPDATE:
      nextState = {
        ...state,
        selectionBarSelected: action.data,
      }
      break
    case constants.KLINE_DEPTH_UPDATE:
      nextState = {
        ...state,
        kLineOrDepth: action.data,
      }
      break
    default:
      break
  }
  return nextState
}
