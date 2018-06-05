import {
  LOGIN_FORM_CHANGE,
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
  LOGIN_FLOW_CLEAR_ERROR,
} from '../constants'

const initialState = {
  syncing: false,
  formState: {
    mobile: '15913913913',
    password: '123456',
  },
  error: null,
  loading: false,
  loggedIn: false,
  loggedInResult: null, // 登录成功返回数据
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
        loggedInResult: payload,
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
        loggedInResult: null,
      }
      break
    case LOGOUT_FAILED:
      nextState = {
        ...state,
        loading: false,
        error: payload,
      }
      break
    case LOGIN_FLOW_CLEAR_ERROR:
      nextState = {
        ...state,
        error: null,
      }
      break
    case 'authorize/sync_request':
      nextState = {
        ...state,
        syncing: true,
      }
      break
    case 'authorize/sync_request_succeed':
      nextState = {
        ...state,
        syncing: false,
      }
      break
    case 'authorize/sync_request_failed':
      nextState = {
        ...state,
        syncing: false,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
