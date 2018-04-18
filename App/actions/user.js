import {
  CHECK_VERIFICATE_CODE_REQUEST,

  GET_VERIFICATE_CODE_REQUEST,

  GET_USER_REQUEST,
  GET_USER_UPDATE,

  ID_CARD_AUTH_REQUEST,

  IS_EXIST_REQUEST,

  LOGIN_REQUEST,

  LOGOUT_REQUEST,

  REGISTER_REQUEST,

  RESET_PASSWORD_REQUEST,

  SYNC_REQUEST,

  UPDATE_PASSWORD_REQUEST,
} from '../constants/index'

export function checkVerificateCode(data) {
  return {
    type: CHECK_VERIFICATE_CODE_REQUEST,
    data,
  }
}

export function getVerificateCode(data) {
  return {
    type: GET_VERIFICATE_CODE_REQUEST,
    data,
  }
}

export function findUser(schema) {
  return {
    type: GET_USER_REQUEST,
    schema,
  }
}

export function findUserUpdate(user) {
  return {
    type: GET_USER_UPDATE,
    user,
  }
}

export function idCardAuth(data) {
  return {
    type: ID_CARD_AUTH_REQUEST,
    data,
  }
}

export function isExist(data) {
  return {
    type: IS_EXIST_REQUEST,
    data,
  }
}

export function login(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  }
}

export function logout(data) {
  return {
    type: LOGOUT_REQUEST,
    data,
  }
}

export function register(data) {
  return {
    type: REGISTER_REQUEST,
    data,
  }
}

export function resetPassword(data) {
  return {
    type: RESET_PASSWORD_REQUEST,
    data,
  }
}

export function sync(data) {
  return {
    type: SYNC_REQUEST,
    data,
  }
}

export function updatePassword(data) {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    data,
  }
}
