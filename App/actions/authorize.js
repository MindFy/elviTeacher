import {
  LOGIN_REQUEST,
  LOGIN_FORM_CHANGE,
  LOGIN_FLOW_CLEAR_ERROR,
} from '../constants/index'

export function login(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}

export function loginUpdate(payload) {
  return {
    type: LOGIN_FORM_CHANGE,
    payload,
  }
}

export function clearError() {
  return {
    type: LOGIN_FLOW_CLEAR_ERROR,
  }
}
