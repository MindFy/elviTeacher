import {
  REGISTER_UPDATE,
  REGISTER_REQUEST,
  REGISTER_SUCCEED,
  REGISTER_FAILED,

  GET_VERIFICATE_CODE_REQUEST,
  GET_VERIFICATE_CODE_SUCCEED,
  GET_VERIFICATE_CODE_FAILED,
} from '../constants/index'

const initialState = {
  mobile: '',
  code: '',
  password: '',
  passwordAgain: '',

  isVisible: false,
  registerResponse: undefined,

  getVerificateCodeVisible: false,
  getVerificateCodeResponse: undefined,
}

export default function register(state = initialState, action) {
  let nextState = state

  switch (action.type) {
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
    default:
      break
  }
  return nextState
}
