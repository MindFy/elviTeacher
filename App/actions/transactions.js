import {
  BUY_OR_SELL_UPDATE,
  GET_SHELVES_REQUEST,
  LATEST_DEALS_REQUEST,
  CURRENT_TOKENS_UPDATE,
  TEXTINPUT_DELEGATE_UPDATE,
  DELEGATE_CREATE_REQUEST,
  GET_DEPTH_MAP_REQUEST,
} from '../constants/index'

export function buyOrSellUpdate(buyOrSell) {
  return {
    type: BUY_OR_SELL_UPDATE,
    buyOrSell,
  }
}

export function getShelvesRequest(data) {
  return {
    type: GET_SHELVES_REQUEST,
    data,
  }
}

export function latestDealsRequest(data) {
  return {
    type: LATEST_DEALS_REQUEST,
    data,
  }
}

export function currentTokensUpdate(goods, currency) {
  return {
    type: CURRENT_TOKENS_UPDATE,
    goods,
    currency,
  }
}

export function TextInputDelegateUpdate(price, quantity, amount) {
  return {
    type: TEXTINPUT_DELEGATE_UPDATE,
    price,
    quantity,
    amount,
  }
}

export function delegateCreateRequest(data) {
  return {
    type: DELEGATE_CREATE_REQUEST,
    data,
  }
}

export function getDepthMapRequest(data) {
  return {
    type: GET_DEPTH_MAP_REQUEST,
    data,
  }
}
