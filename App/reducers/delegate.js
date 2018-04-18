import {
  ALL_CANCEL_FAILED,
  ALL_CANCEL_REQUEST,
  ALL_CANCEL_SUCCEED,

  CANCEL_FAILED,
  CANCEL_REQUEST,
  CANCEL_SUCCEED,

  CREATE_FAILED,
  CREATE_SUCCEED,
  CREATE_REQUEST,

  GET_DEPTH_MAP_REQUEST,
  GET_DEPTH_MAP_SUCCEED,
  GET_DEPTH_MAP_FAILED,

  GET_SHELVES_FAILED,
  GET_SHELVES_REQUEST,
  GET_SHELVES_SUCCEED,

  FIND_DELEGATE_LIST_FAILED,
  FIND_DELEGATE_LIST_REQUEST,
  FIND_DELEGATE_LIST_SUCCEED,

  FIND_DELEGATE_SELF_FAILED,
  FIND_DELEGATE_SELF_REQUEST,
  FIND_DELEGATE_SELF_SUCCEED,

  BUY_OR_SELL_UPDATE,
  CURRENT_TOKENS_UPDATE,
  TEXTINPUT_DELEGATE_UPDATE,

} from '../constants/index'

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
  goods: {
    id: 1,
    name: 'TK',
    description: 'this is TK',
  },
  currency: {
    id: 2,
    name: 'BTC',
    description: 'this is BTC',
  },
  buyOrSell: true,

  price: '',
  quantity: '',
  amount: '',

  shelves: [],
  latestDeals: [],
  depthMap: undefined,

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
    case ALL_CANCEL_REQUEST:
      nextState = {
        ...state,
        allCancelVisible: true,
      }
      break
    case ALL_CANCEL_SUCCEED:
      nextState = {
        ...state,
        allCancelVisible: false,
        allCancelResponse: action.response,
      }
      break
    case ALL_CANCEL_FAILED:
      nextState = {
        ...state,
        allCancelVisible: false,
        allCancelResponse: action.response,
      }
      break
    case CANCEL_REQUEST:
      nextState = {
        ...state,
        cancelVisible: true,
      }
      break
    case CANCEL_SUCCEED:
      nextState = {
        ...state,
        cancelVisible: false,
        cancelResponse: action.response,
      }
      break
    case CANCEL_FAILED:
      nextState = {
        ...state,
        cancelVisible: false,
        cancelResponse: action.response,
      }
      break
    case CREATE_REQUEST:
      nextState = {
        ...state,
        createVisible: true,
      }
      break
    case CREATE_SUCCEED:
      nextState = {
        ...state,
        createVisible: false,
        createResponse: action.response,
      }
      break
    case CREATE_FAILED:
      nextState = {
        ...state,
        createVisible: false,
        createResponse: action.response,
      }
      break
    case GET_DEPTH_MAP_REQUEST:
      nextState = {
        ...state,
        getDepthMapVisible: true,
      }
      break
    case GET_DEPTH_MAP_SUCCEED:
      nextState = {
        ...state,
        getDepthMapVisible: false,
        getDepthMapResponse: action.response,
      }
      break
    case GET_DEPTH_MAP_FAILED:
      nextState = {
        ...state,
        getDepthMapVisible: false,
        getDepthMapResponse: action.response,
      }
      break
    case GET_SHELVES_REQUEST:
      nextState = {
        ...state,
        getShelvesVisible: true,
      }
      break
    case GET_SHELVES_SUCCEED:
      nextState = {
        ...state,
        getShelvesVisible: false,
        getShelvesResponse: action.response,
      }
      break
    case GET_SHELVES_FAILED:
      nextState = {
        ...state,
        getShelvesVisible: false,
        getShelvesResponse: action.response,
      }
      break
    case FIND_DELEGATE_LIST_REQUEST:
      nextState = {
        ...state,
        findDelegateListVisible: true,
      }
      break
    case FIND_DELEGATE_LIST_SUCCEED:
      nextState = {
        ...state,
        findDelegateListVisible: false,
        findDelegateListResponse: action.response,
      }
      break
    case FIND_DELEGATE_LIST_FAILED:
      nextState = {
        ...state,
        findDelegateListVisible: false,
        findDelegateListResponse: action.response,
      }
      break
    case FIND_DELEGATE_SELF_REQUEST:
      nextState = {
        ...state,
        findDelegateSelfVisible: true,
      }
      break
    case FIND_DELEGATE_SELF_SUCCEED:
      nextState = {
        ...state,
        findDelegateSelfVisible: false,
        findDelegateSelfResponse: action.response,
      }
      break
    case FIND_DELEGATE_SELF_FAILED:
      nextState = {
        ...state,
        findDelegateSelfVisible: false,
        findDelegateSelfResponse: action.response,
      }
      break

    case BUY_OR_SELL_UPDATE:
      nextState = {
        ...state,
        buyOrSell: action.buyOrSell,
      }
      break
    case CURRENT_TOKENS_UPDATE:
      nextState = {
        ...state,
        goods: action.goods,
        currency: action.currency,
      }
      break
    case TEXTINPUT_DELEGATE_UPDATE:
      nextState = {
        ...state,
        price: action.price,
        quantity: action.quantity,
        amount: action.amount,
      }
      break
    default:
      break
  }

  return nextState
}
