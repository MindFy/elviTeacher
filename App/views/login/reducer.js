import {
  UPDATE_USER,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
} from '../../constants/index'

const initialState = {
  username: '',
  password: '',
  loginStatus: 0,
  isVisible: false,
}

export default function user(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case UPDATE_USER:
      nextState = {
        ...state,
        username: action.username,
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
        loginStatus: 1,
        isVisible: false,
      }
      break
    case LOGIN_FAILED:
      nextState = {
        ...state,
        loginStatus: -1,
        isVisible: false,
      }
      break
    default:
      break
  }
  return nextState
}
