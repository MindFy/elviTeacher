import * as constants from '../constants/index'

export function add(data) {
  return {
    type: constants.ADD_REQUEST,
    data,
  }
}

export function findAddress(schema) {
  return {
    type: constants.FIND_ADDRESS_REQUEST,
    schema,
  }
}

export function selectTokenUpdate(data) {
  return {
    type: constants.SELECT_TOKEN_UPDATE,
    data,
  }
}
