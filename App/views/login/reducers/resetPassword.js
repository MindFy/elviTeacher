import {
  RESETPASSWORD_UPDATE,
  GETCODE,
  GETCODE_SUCCEED,
  GETCODE_FAILED,
  RESETPASSWORD,
  RESETPASSWORD_SUCCEED,
  RESETPASSWORD_FAILED,
} from '../../../constants/index'

const initialState = {
  mobile: '',
  code: '',
  password: '',
  passwordAgain: '',
  getCodeVisible: false,
  getCodeStatus: 0,
  getCodeResult: {},
  isVisible: false,
  resetPasswordStatus: 0,
  resetPasswordResult: {},
}

export default function resetPassword(state = initialState, action) {
  let nextState = state
  console.log('->', action)

  switch (action.type) {
    case RESETPASSWORD_UPDATE:
      nextState = {
        ...state,
        mobile: action.mobile,
        code: action.code,
        password: action.password,
        passwordAgain: action.passwordAgain,
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
    case RESETPASSWORD:
      nextState = {
        ...state,
        isVisible: true,
      }
      break
    case RESETPASSWORD_SUCCEED:
      nextState = {
        ...state,
        isVisible: false,
        resetPasswordStatus: 1,
        resetPasswordResult: action.result,
      }
      break
    case RESETPASSWORD_FAILED:
      nextState = {
        ...state,
        isVisible: false,
        resetPasswordStatus: -1,
        resetPasswordResult: action.error,
      }
      break
    default:
      break
  }
  return nextState
}
