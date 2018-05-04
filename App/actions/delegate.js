import * as constants from '../constants/index'

export function allCancel() {
  return {
    type: constants.ALL_CANCEL_REQUEST,
  }
}

export function cancel(data, delegateSelfCurrent) {
  return {
    type: constants.CANCEL_REQUEST,
    data,
    delegateSelfCurrent,
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

export function wsGetShelvesUpdate(data) {
  return {
    type: constants.WS_GET_SHELVES_UPDATE,
    data,
  }
}

export function findDelegateSelfCurrent(schema) {
  return {
    type: constants.FIND_DELEGATE_SELF_CURRENT_REQUEST,
    schema,
  }
}

export function wsDelegatesCurrentUpdate(data) {
  return {
    type: constants.WS_DELEGATES_CURRENT_UPDATE,
    data,
  }
}

export function findDelegateSelfHistory(schema) {
  return {
    type: constants.FIND_DELEGATE_SELF_HISTORY_REQUEST,
    schema,
  }
}

export function currentOrHistoryUpdate(data) {
  return {
    type: constants.CURRENT_OR_HISTORY_UPDATE,
    data,
  }
}

export function textInputDelegateUpdate(data) {
  return {
    type: constants.TEXTINPUT_DELEGATE_UPDATE,
    data,
  }
}
