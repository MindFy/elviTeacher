import {
  ADDRESS_ADD_REQUEST,
  ADDRESS_ADD_SUCCEED,
  ADDRESS_ADD_FAILED,

  FIND_ADDRESS_REQUEST,
  FIND_ADDRESS_SUCCEED,
  FIND_ADDRESS_FAILED,
} from '../constants/index'

const initialState = {
}

export default function address(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case ADDRESS_ADD_REQUEST:
      nextState = {
        ...state,
      }
      break
    case ADDRESS_ADD_SUCCEED:
      nextState = {
        ...state,
      }
      break
    case ADDRESS_ADD_FAILED:
      nextState = {
        ...state,
      }
      break
    case FIND_ADDRESS_REQUEST:
      nextState = {
        ...state,
      }
      break
    case FIND_ADDRESS_SUCCEED:
      nextState = {
        ...state,
      }
      break
    case FIND_ADDRESS_FAILED:
      nextState = {
        ...state,
      }
      break
    default:
      break
  }
  return nextState
}
