import * as constants from '../constants/index'

export function checkVerificateCode(data) {
  return {
    type: constants.CHECK_VERIFICATE_CODE_REQUEST,
    data,
  }
}

export function getVerificateCode(data) {
  return {
    type: constants.GET_VERIFICATE_CODE_REQUEST,
    data,
  }
}

export function findUser(schema) {
  return {
    type: constants.FIND_USER_REQUEST,
    schema,
  }
}

export function findUserUpdate(user) {
  return {
    type: constants.FIND_USER_UPDATE,
    user,
  }
}

export function idCardAuth(data) {
  return {
    type: constants.ID_CARD_AUTH_REQUEST,
    data,
  }
}

export function idCardAuthUpdate(data) {
  return {
    type: constants.ID_CARD_AUTH_UPDATE,
    data,
  }
}

export function isExist(data) {
  return {
    type: constants.IS_EXIST_REQUEST,
    data,
  }
}

export function login(data) {
  return {
    type: constants.LOGIN_REQUEST,
    data,
  }
}

export function loginUpdate(data) {
  return {
    type: constants.LOGIN_UPDATE,
    data,
  }
}

export function logout() {
  return {
    type: constants.LOGOUT_REQUEST,
  }
}

export function register(data) {
  return {
    type: constants.REGISTER_REQUEST,
    data,
  }
}

export function registerUpdate(data) {
  return {
    type: constants.REGISTER_UPDATE,
    data,
  }
}

export function resetPassword(data) {
  return {
    type: constants.RESET_PASSWORD_REQUEST,
    data,
  }
}

export function sync() {
  return {
    type: constants.SYNC_REQUEST,
  }
}

export function updatePassword(data) {
  return {
    type: constants.UPDATE_PASSWORD_REQUEST,
    data,
  }
}

export function updatePasswordUpdate(data) {
  return {
    type: constants.UPDATE_PASSWORD_UPDATE,
    data,
  }
}
