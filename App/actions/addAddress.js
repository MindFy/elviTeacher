import {
  ADDRESS_ADD_REQUEST,
  FIND_ADDRESS_REQUEST,
} from '../constants/index'

export function addressAddRequest(data) {
  return {
    type: ADDRESS_ADD_REQUEST,
    data,
  }
}

export function findAddressRequest(schema) {
  return {
    type: FIND_ADDRESS_REQUEST,
    schema,
  }
}
