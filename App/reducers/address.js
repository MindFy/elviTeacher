import * as constants from '../constants/index'
import {
  common,
} from '../constants/common'

const initialState = {
  address: [],
  remark: '',
  withdrawaddr: '',
  selectedIndex: undefined,
  selectedToken: common.selectedTokenDefault,
  tokenListSelected: false,

  addVisible: false,
  addResponse: undefined,

  findAddressVisible: false,
  findAddressResponse: undefined,
}

export default function address(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.ADD_UPDATE_REQUEST:
      nextState = {
        ...state,
        remark: action.data.remark,
        withdrawaddr: action.data.withdrawaddr,
      }
      break
    case constants.ADD_REQUEST:
      nextState = {
        ...state,
        addVisible: true,
      }
      break
    case constants.ADD_SUCCEED:
      nextState = {
        ...state,
        addVisible: false,
        addResponse: action.response,
      }
      break
    case constants.ADD_FAILED:
      nextState = {
        ...state,
        addVisible: false,
        addResponse: action.response,
      }
      break
    case constants.FIND_ADDRESS_REQUEST:
      nextState = {
        ...state,
        findAddressVisible: true,
      }
      break
    case constants.FIND_ADDRESS_SUCCEED:
      nextState = {
        ...state,
        findAddressVisible: false,
        findAddressResponse: action.response,
        address: action.response.result.data.find_address,
      }
      break
    case constants.FIND_ADDRESS_FAILED:
      nextState = {
        ...state,
        findAddressVisible: false,
        findAddressResponse: action.response,
      }
      break

    case constants.SELECT_TOKEN_UPDATE:
      nextState = {
        ...state,
        selectedToken: action.data.selectedToken,
        tokenListSelected: action.data.tokenListSelected,
        selectedIndex: action.data.selectedIndex,
      }
      break
    case constants.FIND_ASSET_SELECT_TOKEN_UPDATE:
      nextState = {
        ...state,
        selectedToken: state.selectedIndex
          ? action.findAsset[state.selectedIndex] : state.selectedToken,
      }
      break
    default:
      break
  }
  return nextState
}
