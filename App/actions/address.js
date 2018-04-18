import {
  ADD_REQUEST,

  FIND_ADDRESS_REQUEST,
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
