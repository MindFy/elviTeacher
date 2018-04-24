import * as constants from '../constants/index'

export function createAddress(data) {
  return {
    type: constants.CREATE_ADDRESS_REQUEST,
    data,
  }
}

export function getAssets(data) {
  return {
    type: constants.GET_ASSETS_REQUEST,
    data,
  }
}

export function findAssetList(schema) {
  return {
    type: constants.FIND_ASSET_LIST_REQUEST,
    schema,
  }
}

export function findAssetListUpdate(data) {
  return {
    type: constants.FIND_ASSET_LIST_UPDATE,
    data,
  }
}
