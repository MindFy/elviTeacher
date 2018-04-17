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
}

export default function asset(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
      nextState = {
        ...state,
      }
      break
    case CREATE_ADDRESS_SUCCEED:
      nextState = {
        ...state,
      }
      break
    case CREATE_ADDRESS_FAILED:
      nextState = {
        ...state,
      }
      break
    case GET_ASSETS_REQUEST:
      nextState = {
        ...state,
      }
      break
    case GET_ASSETS_SUCCEED:
      nextState = {
        ...state,
      }
      break
    case GET_ASSETS_FAILED:
      nextState = {
        ...state,
      }
      break
    case FIND_ASSET_LIST_REQUEST:
      nextState = {
        ...state,
      }
      break
    case FIND_ASSET_LIST_SUCCEED:
      nextState = {
        ...state,
      }
      break
    case FIND_ASSET_LIST_FAILED:
      nextState = {
        ...state,
      }
      break
    default:
      break
  }
  return nextState
}
