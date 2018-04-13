import {
  USERINFO_UPDATE,
  USERINFO_REQUEST,
  USERINFO_SUCCEED,
  USERINFO_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
} from '../constants/index'

const initialState = {
  userInfo: undefined,

  userInfoVisible: false,
  userInfoResponse: undefined,

  logoutVisible: false,
  logoutResponse: undefined,
}

export default function me(state = initialState, action) {
  let nextState = state
  console.log('me action response ->', action.response)

  switch (action.type) {
    case USERINFO_UPDATE:
      nextState = {
        ...state,
        userInfo: action.userInfo,
      }
      break
    case USERINFO_REQUEST:
      nextState = {
        ...state,
        userInfoVisible: true,
      }
      break
    case USERINFO_SUCCEED:
      nextState = {
        ...state,
        userInfoVisible: false,
        userInfoResponse: action.response,
      }
      break
    case USERINFO_FAILED:
      nextState = {
        ...state,
        userInfoVisible: false,
        userInfoResponse: action.response,
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
