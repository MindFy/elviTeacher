import * as constants from '../constants/index'

export function selectionBarUpdate(data) {
  return {
    type: constants.SELECTION_BAR_UPDATE,
    data,
  }
}

export function kLineOrDepthUpdate(data) {
  return {
    type: constants.KLINE_DEPTH_UPDATE,
    data,
  }
}

export function averagePriceOrPriceUpdate(data) {
  return {
    type: constants.AVERAGE_PRICE_PRICE_UPDATE,
    data,
  }
}

export function dealledOrQuantityUpdate(data) {
  return {
    type: constants.DEALLED_QUANTITY_UPDATE,
    data,
  }
}

export function cashAccountUpdate(data) {
  return {
    type: constants.CASH_ACCOUNT_UPDATE,
    data,
  }
}

export function codeAuthUpdate(data) {
  return {
    type: constants.CODE_AUTH_UPDATE,
    data,
  }
}

export function bankTextInputUpdate(data) {
  return {
    type: constants.BANK_TEXT_INPUT_UPDATE,
    data,
  }
}
