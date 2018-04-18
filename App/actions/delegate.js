import {
  ALL_CANCEL_REQUEST,

  CANCEL_REQUEST,

  CREATE_REQUEST,

  GET_DEPTH_MAP_REQUEST,

  GET_SHELVES_REQUEST,

  FIND_DELEGATE_LIST_REQUEST,

  FIND_DELEGATE_SELF_REQUEST,

  BUY_OR_SELL_UPDATE,
  CURRENT_TOKENS_UPDATE,
  TEXTINPUT_DELEGATE_UPDATE,

} from '../constants/index'

export function allCancel(data) {
  return {
    type: ALL_CANCEL_REQUEST,
    data,
  }
}

export function cancel(data) {
  return {
    type: CANCEL_REQUEST,
    data,
  }
}

export function create(data) {
  return {
    type: CREATE_REQUEST,
    data,
  }
}

export function getDepthMap(data) {
  return {
    type: GET_DEPTH_MAP_REQUEST,
    data,
  }
}

export function getShelves(data) {
  return {
    type: GET_SHELVES_REQUEST,
    data,
  }
}

export function findDelegateList(schema) {
  return {
    type: FIND_DELEGATE_LIST_REQUEST,
    schema,
  }
}

export function findDelegateSelf(schema) {
  return {
    type: FIND_DELEGATE_SELF_REQUEST,
    schema,
  }
}

export function buyOrSellUpdate(buyOrSell) {
  return {
    type: BUY_OR_SELL_UPDATE,
    buyOrSell,
  }
}

export function currentTokensUpdate(goods, currency) {
  return {
    type: CURRENT_TOKENS_UPDATE,
    goods,
    currency,
  }
}

export function textInputDelegateUpdate(price, quantity, amount) {
  return {
    type: TEXTINPUT_DELEGATE_UPDATE,
    price,
    quantity,
    amount,
  }
}
