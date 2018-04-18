import {
  ADD_REQUEST,

  FIND_ADDRESS_REQUEST,

  SELECT_TOKEN_UPDATE,
} from '../constants/index'

export function add(data) {
  return {
    type: ADD_REQUEST,
    data,
  }
}

export function findAddress(schema) {
  return {
    type: FIND_ADDRESS_REQUEST,
    schema,
  }
}

export function selectTokenUpdate(data) {
  return {
    type: SELECT_TOKEN_UPDATE,
    data,
  }
}
