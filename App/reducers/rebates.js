import * as constants from '../constants/index'

const initialState = {
  totalCount: 0,
  totalCountTK: 0,
  totalCountBTC: 0,
}

export default function rebates(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.REBATES_COUNT_REQUEST:
      nextState = {
        ...state,
      }
      break
    case constants.REBATES_COUNT_SUCCEED:
      nextState = {
        ...state,
        totalCount: action.totalCount,
      }
      break
    case constants.REBATES_COUNT_FAILED:
      nextState = {
        ...state,
      }
      break
    case constants.REBATES_COUNT_TK_REQUEST:
      nextState = {
        ...state,
      }
      break
    case constants.REBATES_COUNT_TK_SUCCEED:
      nextState = {
        ...state,
        totalCountTK: action.totalCount,
      }
      break
    case constants.REBATES_COUNT_TK_FAILED:
      nextState = {
        ...state,
      }
      break
    case constants.REBATES_COUNT_BTC_REQUEST:
      nextState = {
        ...state,
      }
      break
    case constants.REBATES_COUNT_BTC_SUCCEED:
      nextState = {
        ...state,
        totalCountBTC: action.totalCount,
      }
      break
    case constants.REBATES_COUNT_BTC_FAILED:
      nextState = {
        ...state,
      }
      break
    default:
      break
  }
  return nextState
}
