import {
  BUY_OR_SELL_UPDATE,

  GET_SHELVES_SUCCEED,

  LATEST_DEALS_SUCCEED,

  CURRENT_TOKENS_UPDATE,

  TEXTINPUT_DELEGATE_UPDATE,

  DELEGATE_CREATE_REQUEST,
  DELEGATE_CREATE_SUCCEED,
  DELEGATE_CREATE_FAILED,

  GET_DEPTH_MAP_REQUEST,
  GET_DEPTH_MAP_SUCCEED,
  GET_DEPTH_MAP_FAILED,
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

  delegateCreateVisible: false,
  delegateCreateResponse: undefined,

  getDepthMapVisible: false,
  getDepthMapResponse: undefined,
}

export default function delegate(state = initialState, action) {
  let nextState = state
  // console.log('delegate-action->', action)

  switch (action.type) {
    case BUY_OR_SELL_UPDATE:
      nextState = {
        ...state,
        buyOrSell: action.buyOrSell,
      }
      break
    case GET_SHELVES_SUCCEED:
      nextState = {
        ...state,
        shelves: action.response.result,
      }
      break
    case LATEST_DEALS_SUCCEED:
      nextState = {
        ...state,
        latestDeals: action.response.result,
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
    case DELEGATE_CREATE_REQUEST:
      nextState = {
        ...state,
        delegateCreateVisible: true,
      }
      break
    case DELEGATE_CREATE_SUCCEED:
      nextState = {
        ...state,
        delegateCreateVisible: false,
        delegateCreateResponse: action.response,
      }
      break
    case DELEGATE_CREATE_FAILED:
      nextState = {
        ...state,
        delegateCreateVisible: false,
        delegateCreateResponse: action.response,
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
    default:
      break
  }

  return nextState
}
