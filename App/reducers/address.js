import * as constants from '../constants/index'
import {
  common,
} from '../views/common'

const initialState = {
  address: [],
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
      }
      break
    default:
      break
  }
  return nextState
}
