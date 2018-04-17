import {
  GET_ROSE_REQUEST,
  GET_ROSE_SUCCEED,
  GET_ROSE_FAILED,
} from '../constants/index'

const initialState = {
  rose: [],

  getRoseVisible: false,
  getRoseResponse: undefined,
}

export default function dealstat(state = initialState, action) {
  let nextState = state
  console.log('dealstat-action->', action)

  switch (action.type) {
    case GET_ROSE_REQUEST:
      nextState = {
        ...state,
        getRoseVisible: true,
      }
      break
    case GET_ROSE_SUCCEED:
      nextState = {
        ...state,
        getRoseVisible: false,
        getRoseResponse: action.response,
        rose: action.response.result,
      }
      break
    case GET_ROSE_FAILED:
      nextState = {
        ...state,
        getRoseVisible: false,
        getRoseResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
