import * as constants from '../constants/index'

export function allCancel(data) {
  return {
    type: constants.ALL_CANCEL_REQUEST,
    data,
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

export function findDelegateSelfCurrent(schema, refreshStateCurrent) {
  return {
    type: constants.FIND_DELEGATE_SELF_CURRENT_REQUEST,
    schema,
    refreshStateCurrent,
  }
}

export function wsDelegatesCurrentUpdate(data) {
  return {
    type: constants.WS_DELEGATES_CURRENT_UPDATE,
    data,
  }
}

export function findDelegateSelfHistory(schema, refreshStateHistory) {
  return {
    type: constants.FIND_DELEGATE_SELF_HISTORY_REQUEST,
    schema,
    refreshStateHistory,
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

export function skipDelegateUpdate(data) {
  return {
    type: constants.SKIP_DELEGATE_UPDATE,
    data,
  }
}
