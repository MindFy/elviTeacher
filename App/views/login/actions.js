import {
  UPDATE_USER,
  LOGIN_REQUEST,
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
