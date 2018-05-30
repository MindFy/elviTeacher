import {
  LOGIN_REQUEST,
  LOGIN_FORM_CHANGE,
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
