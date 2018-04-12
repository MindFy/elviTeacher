import {
  USERINFO_UPDATE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
} from '../constants/index'

const initialState = {
  user: null,

  logoutVisible: false,
  logoutResponse: undefined,
}

export default function me(state = initialState, action) {
  let nextState = state
  console.log('-me->', action)

  switch (action.type) {
    case USERINFO_UPDATE:
      nextState = {
        ...state,
        user: action.userInfo,
      }
      break
    case LOGOUT_REQUEST:
      nextState = {
        ...state,
        logoutVisible: true,
      }
      break
    case LOGOUT_SUCCEED:
      nextState = {
        ...state,
        logoutVisible: false,
        logoutResponse: action.response,
      }
      break
    case LOGOUT_FAILED:
      nextState = {
        ...state,
        logoutVisible: false,
        logoutResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
