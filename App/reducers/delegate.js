import { RefreshState } from 'react-native-refresh-list-view'
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
  skipCurrent: 0,
  refreshStateCurrent: RefreshState.Idle,
  delegateSelfCurrent: [],
  skipHistory: 0,
  refreshStateHistory: RefreshState.Idle,
  delegateSelfHistory: [],
  currentOrHistory: common.delegate.current,

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
    case constants.FIND_DELEGATE_SELF_CURRENT_REQUEST:
      nextState = {
        ...state,
        refreshStateCurrent: action.refreshStateCurrent,
      }
      break
    case constants.FIND_DELEGATE_SELF_CURRENT_SUCCEED:
      nextState = {
        ...state,
        delegateSelfCurrent: state.refreshStateCurrent === RefreshState.HeaderRefreshing
          ? action.findDelegate : state.delegateSelfCurrent.concat(action.findDelegate),
        skipCurrent: (state.refreshStateCurrent === RefreshState.FooterRefreshing
          && !action.findDelegate.length) ? 0 : (state.skipCurrent + 1),
        refreshStateCurrent: (state.refreshStateCurrent === RefreshState.FooterRefreshing
          && !action.findDelegate.length) ? RefreshState.NoMoreData : RefreshState.Idle,
      }
      break
    case constants.FIND_DELEGATE_SELF_CURRENT_FAILED:
      nextState = {
        ...state,
        refreshStateCurrent: RefreshState.Failure,
      }
      break
    case constants.WS_DELEGATES_CURRENT_UPDATE:
      nextState = {
        ...state,
        delegateSelfCurrent: action.data.concat(state.delegateSelfCurrent),
      }
      break
    case constants.FIND_DELEGATE_SELF_HISTORY_REQUEST:
      nextState = {
        ...state,
        refreshStateHistory: action.refreshStateHistory,
      }
      break
    case constants.FIND_DELEGATE_SELF_HISTORY_SUCCEED:
      nextState = {
        ...state,
        delegateSelfHistory: state.refreshStateHistory === RefreshState.HeaderRefreshing
          ? action.findDelegate : state.delegateSelfHistory.concat(action.findDelegate),
        skipHistory: (state.refreshStateHistory === RefreshState.FooterRefreshing
          && !action.findDelegate.length) ? 0 : (state.skipHistory + 1),
        refreshStateHistory: (state.refreshStateHistory === RefreshState.FooterRefreshing
          && !action.findDelegate.length) ? RefreshState.NoMoreData : RefreshState.Idle,
      }
      break
    case constants.FIND_DELEGATE_SELF_HISTORY_FAILED:
      nextState = {
        ...state,
        refreshStateHistory: RefreshState.Failure,
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
    case constants.SKIP_DELEGATE_UPDATE:
      nextState = {
        ...state,
        skipCurrent: action.data.skipCurrent,
        skipHistory: action.data.skipHistory,
        refreshStateCurrent: action.data.refreshStateCurrent,
        refreshStateHistory: action.data.skipCurrent,
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
