import * as constants from '../constants/index'

export function findListSelf(schema) {
  return {
    type: constants.FIND_LIST_SELF_REQUEST,
    schema,
  }
}

export function latestDeals(data) {
  return {
    type: constants.LATEST_DEALS_REQUEST,
    data,
  }
}

export function buyOrSellUpdate(buyOrSell) {
  return {
    type: constants.BUY_OR_SELL_UPDATE,
    buyOrSell,
  }
}

export function homeRoseSelectedUpdate(data) {
  return {
    type: constants.HOME_ROSE_SELECTED_UPDATE,
    data,
  }
}

export function textInputDelegateUpdate(price, quantity, amount) {
  return {
    type: constants.TEXTINPUT_DELEGATE_UPDATE,
    price,
    quantity,
    amount,
  }
}
