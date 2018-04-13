import {
  USERINFO_UPDATE,
  USERINFO_REQUEST,
  USERINFO_SUCCEED,
  USERINFO_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,

  PASSWORD_UPDATE,
  PASSWORD_REQUEST,
  PASSWORD_SUCCEED,
  PASSWORD_FAILED,
} from '../constants/index'

const initialState = {
  userInfo: undefined,
  oldPassword: '',
  newPassword: '',
  newPasswordAgain: '',

  userInfoVisible: false,
  userInfoResponse: undefined,

  logoutVisible: false,
  logoutResponse: undefined,

  passwordVisible: false,
  passwordResponse: undefined,
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
    case PASSWORD_UPDATE:
      nextState = {
        ...state,
        oldPassword: action.oldPassword,
        newPassword: action.newPassword,
        newPasswordAgain: action.newPasswordAgain,
      }
      break
    case PASSWORD_REQUEST:
      nextState = {
        ...state,
        passwordVisible: true,
      }
      break
    case PASSWORD_SUCCEED:
      nextState = {
        ...state,
        passwordVisible: false,
        passwordResponse: action.response,
      }
      break
    case PASSWORD_FAILED:
      nextState = {
        ...state,
        passwordVisible: false,
        passwordResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
