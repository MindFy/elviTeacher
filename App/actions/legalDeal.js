import * as constants from '../constants/index'

export function legalDealCancel(data, legalDeal) {
  return {
    type: constants.LEGAL_DEAL_CANCEL_REQUEST,
    data,
    legalDeal,
  }
}

export function confirmPay(data) {
  return {
    type: constants.CONFIRM_PAY_REQUEST,
    data,
  }
}

export function legalDealCreate(data) {
  return {
    type: constants.LEGAL_DEAL_CREATE_REQUEST,
    data,
  }
}

export function findLegalDeal(schema) {
  return {
    type: constants.FIND_LEGAL_DEAL_REQUEST,
    schema,
  }
}

export function havedPay(data) {
  return {
    type: constants.HAVED_PAY_REQUEST,
    data,
  }
}

export function legalDealUpdate(data) {
  return {
    type: constants.LEGAL_DEAL_UPDATE,
    data,
  }
}
