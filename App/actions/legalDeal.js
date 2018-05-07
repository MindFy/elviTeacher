import * as constants from '../constants/index'

export function legalDealCancel(data, legalDeal) {
  return {
    type: constants.LEGAL_DEAL_CANCEL_REQUEST,
    data,
    legalDeal,
  }
}

export function confirmPay(data, legalDeal) {
  return {
    type: constants.CONFIRM_PAY_REQUEST,
    data,
    legalDeal,
  }
}

export function legalDealCreate(data) {
  return {
    type: constants.LEGAL_DEAL_CREATE_REQUEST,
    data,
  }
}

export function findLegalDeal(schema, refreshState) {
  return {
    type: constants.FIND_LEGAL_DEAL_REQUEST,
    schema,
    refreshState,
  }
}

export function havedPay(data, legalDeal) {
  return {
    type: constants.HAVED_PAY_REQUEST,
    data,
    legalDeal,
  }
}

export function legalDealUpdate(data) {
  return {
    type: constants.LEGAL_DEAL_UPDATE,
    data,
  }
}

export function skipLegalDealUpdate(data) {
  return {
    type: constants.SKIP_LEGAL_DEAL_UPDATE,
    data,
  }
}
