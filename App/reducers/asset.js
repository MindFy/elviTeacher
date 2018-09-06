import * as constants from '../constants/index'

const initialState = {
  selectTokenList: [{
    id: 1,
    name: 'TK',
  }, {
    id: 2,
    name: 'BTC',
  }, {
    id: 3,
    name: 'CNYT',
  }, {
    id: 5,
    name: 'ETH',
  }, {
    id: 6,
    name: 'ETC',
  }, {
    id: 7,
    name: 'LTC',
  }],
  asset: [],
  amountVisible: {},
  valuation: undefined,
  createAddress: '',
  selectedIndex: undefined,

  createAddressVisible: false,
  createAddressResponse: undefined,

  getAssetsVisible: false,
  getAssetsResponse: undefined,

  findAssetListVisible: false,
  findAssetListResponse: undefined,
}

export default function asset(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.CREATE_ADDRESS_REQUEST:
      nextState = {
        ...state,
        createAddressVisible: true,
      }
      break
    case constants.CREATE_ADDRESS_SUCCEED:
      nextState = {
        ...state,
        createAddressVisible: false,
        createAddressResponse: action.response,
      }
      break
    case constants.CREATE_ADDRESS_FAILED:
      nextState = {
        ...state,
        createAddressVisible: false,
        createAddressResponse: action.response,
      }
      break
    case constants.GET_ASSETS_REQUEST:
      nextState = {
        ...state,
        getAssetsVisible: true,
      }
      break
    case constants.GET_ASSETS_SUCCEED:
      nextState = {
        ...state,
        getAssetsVisible: false,
        getAssetsResponse: action.response,
      }
      break
    case constants.GET_ASSETS_FAILED:
      nextState = {
        ...state,
        getAssetsVisible: false,
        getAssetsResponse: action.response,
      }
      break
    case constants.GET_VALUATION_REQUEST:
      nextState = {
        ...state,
      }
      break
    case constants.GET_VALUATION_SUCCEED:
      nextState = {
        ...state,
        valuation: action.response.result,
      }
      break
    case constants.GET_VALUATION_FAILED:
      nextState = {
        ...state,
      }
      break
    case constants.FIND_ASSET_LIST_REQUEST:
      nextState = {
        ...state,
        findAssetListVisible: true,
      }
      break
    case constants.FIND_ASSET_LIST_SUCCEED:
      nextState = {
        ...state,
        asset: action.findAsset,
        amountVisible: action.amountVisible,
        findAssetListVisible: false,
      }
      break
    case constants.FIND_ASSET_LIST_FAILED:
      nextState = {
        ...state,
        findAssetListVisible: false,
      }
      break

    case constants.FIND_ASSET_LIST_UPDATE:
      nextState = {
        ...state,
        asset: action.data.asset,
        amountVisible: action.data.amountVisible,
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
