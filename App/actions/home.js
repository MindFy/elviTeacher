import {
  FIND_BANNERS_REQUEST,

  BANNERS_ADD_REQUEST,
  BANNERS_ADD_UPDATE,

  SYNC_REQUEST,

  FIND_ANNOUNCEMENT_REQUEST,
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

export function syncRequest() {
  return {
    type: SYNC_REQUEST,
  }
}

export function findAnnouncementRequest(schema) {
  return {
    type: FIND_ANNOUNCEMENT_REQUEST,
    schema,
  }
}
