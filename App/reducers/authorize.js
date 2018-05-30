import {
  LOGIN_FORM_CHANGE,
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
} from '../constants'

const initialState = {
  formState: {
    mobile: '',
    password: '',
  },
  error: null,
  loading: false,
  loggedIn: false,
}

export default function authorize(state = initialState, action) {
  const { type, payload } = action
  let nextState

  switch (type) {
    case LOGIN_FORM_CHANGE:
      nextState = {
        ...state,
        formState: payload,
      }
      break
    case LOGIN_REQUEST:
      nextState = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCEED:
      nextState = {
        ...state,
        formState: {},
        loading: false,
        loggedIn: true,
      }
      break
    case LOGIN_FAILED:
      nextState = {
        ...state,
        loading: false,
        error: payload,
      }
      break
    case LOGOUT_REQUEST:
      nextState = {
        ...state,
        loading: true,
      }
      break
    case LOGOUT_SUCCEED:
      nextState = {
        ...state,
        loading: false,
        loggedIn: false,
      }
      break
    case LOGOUT_FAILED:
      nextState = {
        ...state,
        loading: false,
        error: payload,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
