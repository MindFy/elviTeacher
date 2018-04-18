import {
  CHECK_VERIFICATE_CODE_REQUEST,
  CHECK_VERIFICATE_CODE_SUCCEED,
  CHECK_VERIFICATE_CODE_FAILED,

  GET_VERIFICATE_CODE_FAILED,
  GET_VERIFICATE_CODE_REQUEST,
  GET_VERIFICATE_CODE_SUCCEED,

  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCEED,
  GET_USER_UPDATE,

  ID_CARD_AUTH_FAILED,
  ID_CARD_AUTH_REQUEST,
  ID_CARD_AUTH_SUCCEED,

  IS_EXIST_FAILED,
  IS_EXIST_REQUEST,
  IS_EXIST_SUCCEED,

  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCEED,

  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,

  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCEED,

  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCEED,

  SYNC_FAILED,
  SYNC_REQUEST,
  SYNC_SUCCEED,

  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCEED,
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

  checkVerificateCodeVisible: false,
  checkVerificateCodeResponse: undefined,

  getVerificateCodeVisible: false,
  getVerificateCodeResponse: undefined,

  getUserVisible: false,
  getUserResponse: undefined,

  idCardAuthVisible: false,
  idCardAuthResponse: undefined,

  isExistVisible: false,
  isExistResponse: undefined,

  loginVisible: false,
  loginResponse: undefined,

  logoutVisible: false,
  logoutResponse: undefined,

  registerVisible: false,
  registerResponse: undefined,

  resetPasswordVisible: false,
  resetPasswordResponse: undefined,

  syncVisible: false,
  syncResponse: undefined,

  updatePasswordVisible: false,
  updatePasswordResponse: undefined,
}

export default function user(state = initialState, action) {
  let nextState = state

  switch (action.type) {
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
    case GET_USER_REQUEST:
      nextState = {
        ...state,
        getUserVisible: true,
      }
      break
    case GET_USER_SUCCEED:
      nextState = {
        ...state,
        getUserVisible: false,
        getUserResponse: action.response,
      }
      break
    case GET_USER_FAILED:
      nextState = {
        ...state,
        getUserVisible: false,
        getUserResponse: action.response,
      }
      break
    case GET_USER_UPDATE:
      nextState = {
        ...state,
        user: action.user,
      }
      break
    case ID_CARD_AUTH_REQUEST:
      nextState = {
        ...state,
        idCardAuthVisible: true,
      }
      break
    case ID_CARD_AUTH_SUCCEED:
      nextState = {
        ...state,
        idCardAuthVisible: false,
        idCardAuthResponse: action.response,
      }
      break
    case ID_CARD_AUTH_FAILED:
      nextState = {
        ...state,
        idCardAuthVisible: false,
        idCardAuthResponse: action.response,
      }
      break
    case IS_EXIST_REQUEST:
      nextState = {
        ...state,
        isExistVisible: true,
      }
      break
    case IS_EXIST_SUCCEED:
      nextState = {
        ...state,
        isExistVisible: false,
        isExistResponse: action.response,
      }
      break
    case IS_EXIST_FAILED:
      nextState = {
        ...state,
        isExistVisible: false,
        isExistResponse: action.response,
      }
      break
    case LOGIN_REQUEST:
      nextState = {
        ...state,
        loginVisible: true,
      }
      break
    case LOGIN_SUCCEED:
      nextState = {
        ...state,
        loginVisible: false,
        loginResponse: action.response,
      }
      break
    case LOGIN_FAILED:
      nextState = {
        ...state,
        loginVisible: false,
        loginResponse: action.response,
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
    case REGISTER_REQUEST:
      nextState = {
        ...state,
        registerVisible: true,
      }
      break
    case REGISTER_SUCCEED:
      nextState = {
        ...state,
        registerVisible: false,
        registerResponse: action.response,
      }
      break
    case REGISTER_FAILED:
      nextState = {
        ...state,
        registerVisible: false,
        registerResponse: action.response,
      }
      break
    case RESET_PASSWORD_REQUEST:
      nextState = {
        ...state,
        resetPasswordVisible: true,
      }
      break
    case RESET_PASSWORD_SUCCEED:
      nextState = {
        ...state,
        resetPasswordVisible: false,
        resetPasswordResponse: action.response,
      }
      break
    case RESET_PASSWORD_FAILED:
      nextState = {
        ...state,
        resetPasswordVisible: false,
        resetPasswordResponse: action.response,
      }
      break
    case SYNC_REQUEST:
      nextState = {
        ...state,
        syncVisible: true,
      }
      break
    case SYNC_SUCCEED:
      nextState = {
        ...state,
        syncVisible: false,
        syncResponse: action.response,
      }
      break
    case SYNC_FAILED:
      nextState = {
        ...state,
        syncVisible: false,
        syncResponse: action.response,
      }
      break
    case UPDATE_PASSWORD_REQUEST:
      nextState = {
        ...state,
        updatePasswordVisible: true,
      }
      break
    case UPDATE_PASSWORD_SUCCEED:
      nextState = {
        ...state,
        updatePasswordVisible: false,
        updatePasswordResponse: action.response,
      }
      break
    case UPDATE_PASSWORD_FAILED:
      nextState = {
        ...state,
        updatePasswordVisible: false,
        updatePasswordResponse: action.response,
      }
      break

    default:
      break
  }

  return nextState
}
