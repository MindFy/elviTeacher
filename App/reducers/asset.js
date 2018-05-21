import * as constants from '../constants/index'

const initialState = {
  selectTokenList: [{
    amount: '',
    createdAt: '',
    freezed: '',
    id: 0,
    rechargeaddr: '',
    token: {
      id: 1,
      name: 'TK',
    },
    totalRechargeAmount: 0,
  }, {
    amount: '',
    createdAt: '',
    freezed: '',
    id: 0,
    rechargeaddr: 'mgVRdRatozZqvfpTEWwdzEFvuaAC3gwNgX',
    token: {
      id: 2,
      name: 'BTC',
    },
    totalRechargeAmount: 0,
  }, {
    amount: '',
    createdAt: '',
    freezed: '',
    id: 0,
    rechargeaddr: '',
    token: {
      id: 3,
      name: 'CNYT',
    },
    totalRechargeAmount: 0,
  }, {
    amount: '',
    createdAt: '',
    freezed: '',
    id: 0,
    rechargeaddr: '0x6495319a3c04616b8922c53dcf781381a3b32154',
    token: {
      id: 5,
      name: 'ETH',
    },
    totalRechargeAmount: 0,
  }],
  asset: [],
  amountVisible: undefined,
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
        selectTokenList: action.findAsset,
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
    default:
      break
  }
  return nextState
}
