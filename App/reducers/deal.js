import {
  FIND_LIST_SELF_REQUEST,
  FIND_LIST_SELF_SUCCEED,
  FIND_LIST_SELF_FAILED,

  LATEST_DEALS_REQUEST,
  LATEST_DEALS_SUCCEED,
  LATEST_DEALS_FAILED,
} from '../constants/index'

const initialState = {
  findListSelfVisible: false,
  findListSelfResponse: undefined,

  latestDealsVisible: false,
  latestDealsResponse: undefined,
}

export default function deal(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case FIND_LIST_SELF_REQUEST:
      nextState = {
        ...state,
        findListSelfVisible: true,
      }
      break
    case FIND_LIST_SELF_SUCCEED:
      nextState = {
        ...state,
        findListSelfVisible: false,
        findListSelfResponse: action.response,
      }
      break
    case FIND_LIST_SELF_FAILED:
      nextState = {
        ...state,
        findListSelfVisible: false,
        findListSelfResponse: action.response,
      }
      break
    case LATEST_DEALS_REQUEST:
      nextState = {
        ...state,
        latestDealsVisible: true,
      }
      break
    case LATEST_DEALS_SUCCEED:
      nextState = {
        ...state,
        latestDealsVisible: false,
        latestDealsResponse: action.response,
      }
      break
    case LATEST_DEALS_FAILED:
      nextState = {
        ...state,
        latestDealsVisible: false,
        latestDealsResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
