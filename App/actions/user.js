import {
  CHECK_VERIFICATE_CODE_REQUEST,

  
  GET_USER_UPDATE,
  GET_USER_REQUEST,

  LOGOUT_REQUEST,

  PASSWORD_UPDATE,
  PASSWORD_REQUEST,

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

export function checkVerificateCodeRequest(data) {
  return {
    type: CHECK_VERIFICATE_CODE_REQUEST,
    data,
  }
}

export function getUserUpdate(user) {
  return {
    type: GET_USER_UPDATE,
    user,
  }
}

export function getUserRequest(schema) {
  return {
    type: GET_USER_REQUEST,
    schema,
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function passwordUpdate(oldPassword, newPassword, newPasswordAgain) {
  return {
    type: PASSWORD_UPDATE,
    oldPassword,
    newPassword,
    newPasswordAgain,
  }
}

export function passwordRequest(data) {
  return {
    type: PASSWORD_REQUEST,
    data,
  }
}
