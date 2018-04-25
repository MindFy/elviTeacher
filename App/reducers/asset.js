import * as constants from '../constants/index'

const initialState = {
  asset: [
    {
      amount: 0,
      freezed: 0,
      id: 1,
      rechargeaddr: '',
      token: { id: 1, name: 'TK' },
    },
    {
      amount: 0,
      freezed: 0,
      id: 2,
      rechargeaddr: '',
      token: { id: 2, name: 'BTC' },
    },
    {
      amount: 0,
      freezed: 0,
      id: 3,
      rechargeaddr: '',
      token: { id: 3, name: 'CNYT' },
    },
  ],

  createAddress: '',

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
    case constants.FIND_ASSET_LIST_SUCCEED:
      nextState = {
        ...state,
        asset: action.response.result.data.find_asset.length ?
          action.response.result.data.find_asset : state.asset,
      }
      break

    case constants.FIND_ASSET_LIST_UPDATE:
      nextState = {
        ...state,
        asset: action.data.asset,
      }
      break
    default:
      break
  }
  return nextState
}
