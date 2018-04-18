import {
  ADD_REQUEST,
  ADD_SUCCEED,
  ADD_FAILED,

  FIND_ADDRESS_REQUEST,
  FIND_ADDRESS_SUCCEED,
  FIND_ADDRESS_FAILED,
} from '../constants/index'

const initialState = {
  addVisible: false,
  addResponse: undefined,

  findAddressVisible: false,
  findAddressResponse: undefined,
}

export default function address(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case ADD_REQUEST:
      nextState = {
        ...state,
        addVisible: true,
      }
      break
    case ADD_SUCCEED:
      nextState = {
        ...state,
        addVisible: false,
        addResponse: action.response,
      }
      break
    case ADD_FAILED:
      nextState = {
        ...state,
        addVisible: false,
        addResponse: action.response,
      }
      break
    case FIND_ADDRESS_REQUEST:
      nextState = {
        ...state,
        findAddressVisible: true,
      }
      break
    case FIND_ADDRESS_SUCCEED:
      nextState = {
        ...state,
        findAddressVisible: false,
        findAddressResponse: action.response,
      }
      break
    case FIND_ADDRESS_FAILED:
      nextState = {
        ...state,
        findAddressVisible: false,
        findAddressResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
