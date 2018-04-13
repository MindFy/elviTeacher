import {
  RESET_PASSWORD_UPDATE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCEED,
  RESET_PASSWORD_FAILED,

  GET_VERIFICATE_CODE_REQUEST,
  GET_VERIFICATE_CODE_SUCCEED,
  GET_VERIFICATE_CODE_FAILED,

  CHECK_VERIFICATE_CODE_REQUEST,
  CHECK_VERIFICATE_CODE_SUCCEED,
  CHECK_VERIFICATE_CODE_FAILED,
} from '../constants/index'

const initialState = {
  mobile: '',
  code: '',
  password: '',
  passwordAgain: '',

  isVisible: false,
  resetPasswordResponse: undefined,

  getVerificateCodeVisible: false,
  getVerificateCodeResponse: undefined,

  checkVerificateCodeVisible: false,
  checkVerificateCodeResponse: undefined,
}

export default function resetPassword(state = initialState, action) {
  let nextState = state

  switch (action.type) {
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
    default:
      break
  }
  return nextState
}
