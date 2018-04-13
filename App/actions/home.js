import {
  FIND_BANNERS_REQUEST,

  BANNERS_ADD_REQUEST,
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
