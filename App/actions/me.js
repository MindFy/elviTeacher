import {
  USERINFO_UPDATE,
  USERINFO_REQUEST,

  LOGOUT_REQUEST,

  PASSWORD_UPDATE,
  PASSWORD_REQUEST,
} from '../constants/index'

export function userInfoUpdate(userInfo) {
  return {
    type: USERINFO_UPDATE,
    userInfo,
  }
}

export function userInfoRequest(schema) {
  return {
    type: USERINFO_REQUEST,
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
