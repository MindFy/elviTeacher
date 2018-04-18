import {
  CREATE_ADDRESS_REQUEST,

  GET_ASSETS_REQUEST,

  FIND_ASSET_LIST_REQUEST,
} from '../constants/index'

export function createAddress(data) {
  return {
    type: CREATE_ADDRESS_REQUEST,
    data,
  }
}

export function getAssets(data) {
  return {
    type: GET_ASSETS_REQUEST,
    data,
  }
}

export function findAssetList(schema) {
  return {
    type: FIND_ASSET_LIST_REQUEST,
    schema,
  }
}
