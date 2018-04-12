import {
  REGISTER_REQUEST,
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  REGISTER_UPDATE,
  GETCODE,
  GETCODE_SUCCEED,
  GETCODE_FAILED,
} from '../../../constants/index'

const initialState = {
  mobile: '',
  code: '',
  password: '',
  passwordAgain: '',
  requestStatus: 0,
  isVisible: false,
  registerResult: {},

  getCodeVisible: false,
  getCodeStatus: 0,
  getCodeResult: {},
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
        requestStatus: 1,
        registerResult: action.result,
      }
      break
    case REGISTER_FAILED:
      nextState = {
        ...state,
        isVisible: false,
        requestStatus: -1,
        registerResult: action.error,
      }
      break
    case GETCODE:
      nextState = {
        ...state,
        getCodeVisible: true,
      }
      break
    case GETCODE_SUCCEED:
      nextState = {
        ...state,
        getCodeVisible: false,
        getCodeStatus: 1,
        getCodeResult: action.result,
      }
      break
    case GETCODE_FAILED:
      nextState = {
        ...state,
        getCodeVisible: false,
        getCodeStatus: -1,
        getCodeResult: action.error,
      }
      break
    default:
      break
  }
  return nextState
}
