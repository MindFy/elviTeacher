import {
  LOGIN_UPDATE,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
} from '../constants/index'

const initialState = {
  mobile: '',
  password: '',

  isVisible: false,
  loginResponse: undefined,
}

export default function login(state = initialState, action) {
  let nextState = state
  console.log('-login->', action)

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
    default:
      break
  }
  return nextState
}
