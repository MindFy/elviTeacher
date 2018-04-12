import {
  UPDATE_USER,
  LOGIN_REQUEST,
  REGISTER_UPDATE,
  REGISTER_REQUEST,
  GETCODE,
  RESETPASSWORD_UPDATE,
  RESETPASSWORD,
} from '../../constants/index'

export function updateUser(username, password) {
  return {
    type: UPDATE_USER,
    username,
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

export function getVerificateCode(data) {
  return {
    type: GETCODE,
    data,
  }
}

export function resetPasswordUpdate(mobile, code, password, passwordAgain) {
  return {
    type: RESETPASSWORD_UPDATE,
    mobile,
    code,
    password,
    passwordAgain,
  }
}

export function resetPassword(data) {
  return {
    type: RESETPASSWORD,
    data,
  }
}
