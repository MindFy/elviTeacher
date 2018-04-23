import * as constants from '../constants/index'
import {
  common,
} from '../views/common'

const initialState = {
  tokenList: [
    {
      id: 1,
      name: 'TK',
      description: 'this is TK',
    },
    {
      id: 2,
      name: 'BTC',
      description: 'this is BTC',
    },
    {
      id: 3,
      name: 'CNYT',
      description: 'this is CNYT',
    },
    {
      id: 4,
      name: 'CNY',
      description: 'this is CNY',
    },
  ],

  shelvesBuy: [],
  shelvesSell: [],
  depthMap: {
    buy: [],
    sell: [],
    lastprice: 100,
  },
  delegateList: [],
  delegateSelf: [],
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

  findDelegateListVisible: false,
  findDelegateListResponse: undefined,

  findDelegateSelfVisible: false,
  findDelegateSelfResponse: undefined,
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
    case constants.FIND_DELEGATE_LIST_REQUEST:
      nextState = {
        ...state,
        findDelegateListVisible: true,
      }
      break
    case constants.FIND_DELEGATE_LIST_SUCCEED:
      nextState = {
        ...state,
        findDelegateListVisible: false,
        findDelegateListResponse: action.response,
        // delegateList: action.response.result.data.find_delegate,
      }
      break
    case constants.FIND_DELEGATE_LIST_FAILED:
      nextState = {
        ...state,
        findDelegateListVisible: false,
        findDelegateListResponse: action.response,
      }
      break
    case constants.FIND_DELEGATE_SELF_REQUEST:
      nextState = {
        ...state,
        findDelegateSelfVisible: true,
      }
      break
    case constants.FIND_DELEGATE_SELF_SUCCEED:
      nextState = {
        ...state,
        findDelegateSelfVisible: false,
        findDelegateSelfResponse: action.response,
        delegateSelf: action.response.result.data.find_delegate,
      }
      break
    case constants.FIND_DELEGATE_SELF_FAILED:
      nextState = {
        ...state,
        findDelegateSelfVisible: false,
        findDelegateSelfResponse: action.response,
      }
      break

    case constants.CURRENT_OR_HISTORY_UPDATE:
      nextState = {
        ...state,
        currentOrHistory: action.data.currentOrHistory,
      }
      break
    default:
      break
  }

  return nextState
}
