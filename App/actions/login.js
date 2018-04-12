import {
  LOGIN_UPDATE,
  LOGIN_REQUEST,

  REGISTER_UPDATE,
  REGISTER_REQUEST,

  RESET_PASSWORD_UPDATE,
  RESET_PASSWORD_REQUEST,

  GET_VERIFICATE_CODE_REQUEST,
} from '../constants/index'

export function loginUpdate(mobile, password) {
  return {
    type: LOGIN_UPDATE,
    mobile,
    password,
  }
}

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  }
}

export function registerUpdate(mobile, code, password, passwordAgain) {
  return {
    type: REGISTER_UPDATE,
    mobile,
    code,
    password,
    passwordAgain,
  }
}

export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data,
  }
}

export function resetPasswordUpdate(mobile, code, password, passwordAgain) {
  return {
    type: RESET_PASSWORD_UPDATE,
    mobile,
    code,
    password,
    passwordAgain,
  }
}

export function resetPasswordRequest(data) {
  return {
    type: RESET_PASSWORD_REQUEST,
    data,
  }
}

export function getVerificateCodeRequest(data) {
  return {
    type: GET_VERIFICATE_CODE_REQUEST,
    data,
  }
}
