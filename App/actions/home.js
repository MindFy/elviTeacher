import {
  FIND_BANNERS_REQUEST,

  BANNERS_ADD_REQUEST,
  BANNERS_ADD_UPDATE,
} from '../constants/index'

export function findBannersRequest(schema) {
  return {
    type: FIND_BANNERS_REQUEST,
    schema,
  }
}

export function banndersAddRequest(imghash, title) {
  return {
    type: BANNERS_ADD_REQUEST,
    imghash,
    title,
  }
}

export function banndersAddUpdate(data) {
  return {
    type: BANNERS_ADD_UPDATE,
    data,
  }
}
