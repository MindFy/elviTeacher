import {
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCEED,
  CREATE_ADDRESS_FAILED,

  GET_ASSETS_REQUEST,
  GET_ASSETS_SUCCEED,
  GET_ASSETS_FAILED,

  FIND_ASSET_LIST_REQUEST,
  FIND_ASSET_LIST_SUCCEED,
  FIND_ASSET_LIST_FAILED,
} from '../constants/index'

const initialState = {
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
    case CREATE_ADDRESS_REQUEST:
      nextState = {
        ...state,
        createAddressVisible: true,
      }
      break
    case CREATE_ADDRESS_SUCCEED:
      nextState = {
        ...state,
        createAddressVisible: false,
        createAddressResponse: action.response,
      }
      break
    case CREATE_ADDRESS_FAILED:
      nextState = {
        ...state,
        createAddressVisible: false,
        createAddressResponse: action.response,
      }
      break
    case GET_ASSETS_REQUEST:
      nextState = {
        ...state,
        getAssetsVisible: true,
      }
      break
    case GET_ASSETS_SUCCEED:
      nextState = {
        ...state,
        getAssetsVisible: false,
        getAssetsResponse: action.response,
      }
      break
    case GET_ASSETS_FAILED:
      nextState = {
        ...state,
        getAssetsVisible: false,
        getAssetsResponse: action.response,
      }
      break
    case FIND_ASSET_LIST_REQUEST:
      nextState = {
        ...state,
        findAssetListVisible: true,
      }
      break
    case FIND_ASSET_LIST_SUCCEED:
      nextState = {
        ...state,
        findAssetListVisible: false,
        findAssetListResponse: action.resposne,
      }
      break
    case FIND_ASSET_LIST_FAILED:
      nextState = {
        ...state,
        findAssetListVisible: false,
        findAssetListResponse: action.resposne,
      }
      break
    default:
      break
  }
  return nextState
}
