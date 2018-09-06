import * as constants from '../constants/index'

const initialState = {
  deal: [],
  latestDeals: [],
  buyOrSell: true,

  findListSelfVisible: false,
  findListSelfResponse: undefined,

  latestDealsVisible: false,
  latestDealsResponse: undefined,
}

export default function deal(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.FIND_LIST_SELF_REQUEST:
      nextState = {
        ...state,
        findListSelfVisible: true,
      }
      break
    case constants.FIND_LIST_SELF_SUCCEED:
      nextState = {
        ...state,
        findListSelfVisible: false,
        findListSelfResponse: action.response,
        deal: action.response.result.data.find_deal,
      }
      break
    case constants.FIND_LIST_SELF_FAILED:
      nextState = {
        ...state,
        findListSelfVisible: false,
        findListSelfResponse: action.response,
      }
      break
    case constants.LATEST_DEALS_REQUEST:
      nextState = {
        ...state,
        latestDealsVisible: true,
      }
      break
    case constants.LATEST_DEALS_SUCCEED:
      nextState = {
        ...state,
        latestDealsVisible: false,
        latestDealsResponse: action.response,
        latestDeals: action.response.result,
      }
      break
    case constants.LATEST_DEALS_FAILED:
      nextState = {
        ...state,
        latestDealsVisible: false,
        latestDealsResponse: action.response,
      }
      break
    case constants.WS_DEALS_UPDATE:
      nextState = {
        ...state,
        latestDeals: action.data.concat(state.latestDeals),
      }
      break

    case constants.BUY_OR_SELL_UPDATE:
      nextState = {
        ...state,
        buyOrSell: action.buyOrSell,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      break
  }
  return nextState
}
