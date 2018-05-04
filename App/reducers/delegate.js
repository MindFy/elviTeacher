import * as constants from '../constants/index'
import {
  common,
} from '../constants/common'

const initialState = {
  price: 0,
  quantity: 0,
  amount: 0,
  shelvesBuy: [],
  shelvesSell: [],
  depthMap: {
    buy: [],
    sell: [],
    lastprice: 100,
  },
  delegateSelfCurrent: [],
  delegateSelfHistory: [],
  currentOrHistory: common.current,

  allCancelVisible: false,
  allCancelResponse: undefined,

  cancelVisible: false,
  cancelResponse: undefined,

  createVisible: false,
  createResponse: undefined,

  getDepthMapVisible: false,
  getDepthMapResponse: undefined,

  getShelvesVisible: false,
  getShelvesResponse: undefined,
}

export default function delegate(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.ALL_CANCEL_REQUEST:
      nextState = {
        ...state,
        allCancelVisible: true,
      }
      break
    case constants.ALL_CANCEL_SUCCEED:
      nextState = {
        ...state,
        allCancelVisible: false,
        allCancelResponse: action.response,
        delegateSelfCurrent: [],
      }
      break
    case constants.ALL_CANCEL_FAILED:
      nextState = {
        ...state,
        allCancelVisible: false,
        allCancelResponse: action.response,
      }
      break
    case constants.CANCEL_REQUEST:
      nextState = {
        ...state,
        cancelVisible: true,
      }
      break
    case constants.CANCEL_SUCCEED:
      nextState = {
        ...state,
        cancelVisible: false,
        cancelResponse: action.response,
        delegateSelfCurrent: action.delegateSelfCurrent,
      }
      break
    case constants.CANCEL_FAILED:
      nextState = {
        ...state,
        cancelVisible: false,
        cancelResponse: action.response,
      }
      break
    case constants.CREATE_REQUEST:
      nextState = {
        ...state,
        createVisible: true,
      }
      break
    case constants.CREATE_SUCCEED:
      nextState = {
        ...state,
        createVisible: false,
        createResponse: action.response,
      }
      break
    case constants.CREATE_FAILED:
      nextState = {
        ...state,
        createVisible: false,
        createResponse: action.response,
      }
      break
    case constants.GET_DEPTH_MAP_REQUEST:
      nextState = {
        ...state,
        getDepthMapVisible: true,
      }
      break
    case constants.GET_DEPTH_MAP_SUCCEED:
      nextState = {
        ...state,
        getDepthMapVisible: false,
        getDepthMapResponse: action.response,
        depthMap: action.response.result,
      }
      break
    case constants.GET_DEPTH_MAP_FAILED:
      nextState = {
        ...state,
        getDepthMapVisible: false,
        getDepthMapResponse: action.response,
      }
      break
    case constants.GET_SHELVES_REQUEST:
      nextState = {
        ...state,
        getShelvesVisible: true,
      }
      break
    case constants.GET_SHELVES_SUCCEED:
      nextState = {
        ...state,
        getShelvesVisible: false,
        shelvesBuy: action.data.shelvesBuy,
        shelvesSell: action.data.shelvesSell,
      }
      break
    case constants.GET_SHELVES_FAILED:
      nextState = {
        ...state,
        getShelvesVisible: false,
        getShelvesResponse: action.response,
      }
      break
    case constants.FIND_DELEGATE_SELF_CURRENT_SUCCEED:
      nextState = {
        ...state,
        delegateSelfCurrent: action.response.result.data.find_delegate,
      }
      break
    case constants.WS_DELEGATES_CURRENT_UPDATE:
      nextState = {
        ...state,
        delegateSelfCurrent: action.data.concat(state.delegateSelfCurrent),
      }
      break
    case constants.FIND_DELEGATE_SELF_HISTORY_SUCCEED:
      nextState = {
        ...state,
        delegateSelfHistory: action.response.result.data.find_delegate,
      }
      break

    case constants.CURRENT_OR_HISTORY_UPDATE:
      nextState = {
        ...state,
        currentOrHistory: action.data.currentOrHistory,
      }
      break

    case constants.TEXTINPUT_DELEGATE_UPDATE:
      nextState = {
        ...state,
        price: action.data.price,
        quantity: action.data.quantity,
        amount: action.data.amount,
      }
      break

    case constants.WS_GET_SHELVES_UPDATE:
      nextState = {
        ...state,
        shelvesBuy: action.data.shelvesBuy,
        shelvesSell: action.data.shelvesSell,
      }
      break
    default:
      break
  }

  return nextState
}
