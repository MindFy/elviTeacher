import {
  CHECK_VERIFICATE_CODE_REQUEST,
  CHECK_VERIFICATE_CODE_SUCCEED,
  CHECK_VERIFICATE_CODE_FAILED,

  
  GET_USER_UPDATE,
  GET_USER_REQUEST,
  GET_USER_SUCCEED,
  GET_USER_FAILED,

  LOGIN_UPDATE,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCEED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,

  PASSWORD_UPDATE,
  PASSWORD_REQUEST,
  PASSWORD_SUCCEED,
  PASSWORD_FAILED,

  REGISTER_UPDATE,
  REGISTER_REQUEST,
  REGISTER_SUCCEED,
  REGISTER_FAILED,

  GET_VERIFICATE_CODE_REQUEST,
  GET_VERIFICATE_CODE_SUCCEED,
  GET_VERIFICATE_CODE_FAILED,

  RESET_PASSWORD_UPDATE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCEED,
  RESET_PASSWORD_FAILED,

} from '../constants/index'

const initialState = {
  user: undefined,

  mobile: '',
  code: '',
  password: '',
  passwordAgain: '',

  oldPassword: '',
  newPassword: '',
  newPasswordAgain: '',

  isVisible: false,
  registerResponse: undefined,

  getVerificateCodeVisible: false,
  getVerificateCodeResponse: undefined,

  loginResponse: undefined,

  resetPasswordResponse: undefined,

  checkVerificateCodeVisible: false,
  checkVerificateCodeResponse: undefined,

  getUserVisible: false,
  getUserResponse: undefined,

  logoutVisible: false,
  logoutResponse: undefined,

  passwordVisible: false,
  passwordResponse: undefined,
}

export default function user(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case LOGIN_UPDATE:
      nextState = {
        ...state,
        mobile: action.mobile,
        password: action.password,
      }
      break
    case LOGIN_REQUEST:
      nextState = {
        ...state,
        isVisible: true,
      }
      break
    case LOGIN_SUCCEED:
      nextState = {
        ...state,
        isVisible: false,
        loginResponse: action.response,
      }
      break
    case LOGIN_FAILED:
      nextState = {
        ...state,
        isVisible: false,
        loginResponse: action.response,
      }
      break

    case GET_USER_UPDATE:
      nextState = {
        ...state,
        user: action.user,
      }
      break
    case GET_USER_REQUEST:
      nextState = {
        ...state,
        userInfoVisible: true,
      }
      break
    case GET_USER_SUCCEED:
      nextState = {
        ...state,
        userInfoVisible: false,
        userInfoResponse: action.response,
      }
      break
    case GET_USER_FAILED:
      nextState = {
        ...state,
        userInfoVisible: false,
        userInfoResponse: action.response,
      }
      break

    case REGISTER_UPDATE:
      nextState = {
        ...state,
        mobile: action.mobile,
        code: action.code,
        password: action.password,
        passwordAgain: action.passwordAgain,
      }
      break
    case REGISTER_REQUEST:
      nextState = {
        ...state,
        isVisible: true,
      }
      break
    case REGISTER_SUCCEED:
      nextState = {
        ...state,
        isVisible: false,
        registerResponse: action.response,
      }
      break
    case REGISTER_FAILED:
      nextState = {
        ...state,
        isVisible: false,
        registerResponse: action.response,
      }
      break
    case GET_VERIFICATE_CODE_REQUEST:
      nextState = {
        ...state,
        getVerificateCodeVisible: true,
      }
      break
    case GET_VERIFICATE_CODE_SUCCEED:
      nextState = {
        ...state,
        getVerificateCodeVisible: false,
        getVerificateCodeResponse: action.response,
      }
      break
    case GET_VERIFICATE_CODE_FAILED:
      nextState = {
        ...state,
        getVerificateCodeVisible: false,
        getVerificateCodeResponse: action.response,
      }
      break

    case RESET_PASSWORD_UPDATE:
      nextState = {
        ...state,
        mobile: action.mobile,
        code: action.code,
        password: action.password,
        passwordAgain: action.passwordAgain,
      }
      break
    case RESET_PASSWORD_REQUEST:
      nextState = {
        ...state,
        isVisible: true,
      }
      break
    case RESET_PASSWORD_SUCCEED:
      nextState = {
        ...state,
        isVisible: false,
        resetPasswordResponse: action.response,
      }
      break
    case RESET_PASSWORD_FAILED:
      nextState = {
        ...state,
        isVisible: false,
        resetPasswordResponse: action.response,
      }
      break
    case CHECK_VERIFICATE_CODE_REQUEST:
      nextState = {
        ...state,
        checkVerificateCodeVisible: true,
      }
      break
    case CHECK_VERIFICATE_CODE_SUCCEED:
      nextState = {
        ...state,
        checkVerificateCodeVisible: false,
        checkVerificateCodeResponse: action.response,
      }
      break
    case CHECK_VERIFICATE_CODE_FAILED:
      nextState = {
        ...state,
        checkVerificateCodeVisible: false,
        checkVerificateCodeResponse: action.response,
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
