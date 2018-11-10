import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_FORM_CHANGE,
  LOGIN_FLOW_CLEAR_ERROR,
  LOGIN_FAILED,
} from '../constants/index'

export function login(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}

export function logout() {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function clearLogin() {
  return {
    type: LOGIN_FAILED,
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

export function toggleAutoLogin(payload) {
  return {
    type: 'authorize/toggle_auto_login',
    payload,
  }
}
