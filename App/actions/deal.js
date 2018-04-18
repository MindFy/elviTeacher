import {
  FIND_LIST_SELF_REQUEST,

  LATEST_DEALS_REQUEST,
} from '../constants/index'

export function findListSelf(schema) {
  return {
    type: FIND_LIST_SELF_REQUEST,
    schema,
  }
}

export function latestDeals(data) {
  return {
    type: LATEST_DEALS_REQUEST,
    data,
  }
}
