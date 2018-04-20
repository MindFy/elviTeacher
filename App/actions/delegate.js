import * as constants from '../constants/index'

export function allCancel(data) {
  return {
    type: constants.ALL_CANCEL_REQUEST,
    data,
  }
}

export function cancel(data) {
  return {
    type: constants.CANCEL_REQUEST,
    data,
  }
}

export function create(data) {
  return {
    type: constants.CREATE_REQUEST,
    data,
  }
}

export function getDepthMap(data) {
  return {
    type: constants.GET_DEPTH_MAP_REQUEST,
    data,
  }
}

export function getShelves(data) {
  return {
    type: constants.GET_SHELVES_REQUEST,
    data,
  }
}

export function findDelegateList(schema) {
  return {
    type: constants.FIND_DELEGATE_LIST_REQUEST,
    schema,
  }
}

export function findDelegateSelf(schema) {
  return {
    type: constants.FIND_DELEGATE_SELF_REQUEST,
    schema,
  }
}

export function currentOrHistoryUpdate(data) {
  return {
    type: constants.CURRENT_OR_HISTORY_UPDATE,
    data,
  }
}
