import * as constants from '../constants/index'

const initialState = {

  legalDealCancelVisible: false,
  legalDealCancelResponse: undefined,

  confirmPayVisible: false,
  confirmPayResponse: undefined,

  legalDealCreateVisible: false,
  legalDealCreateResponse: undefined,

  findLegalDealVisible: false,
  findLegalDealResponse: undefined,

  havedPayVisible: false,
  havedPayResponse: undefined,
}

export default function legalDeal(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.LEGAL_DEAL_CANCEL_REQUEST:
      nextState = {
        ...state,
        legalDealCancelVisible: true,
      }
      break
    case constants.LEGAL_DEAL_CANCEL_SUCCEED:
      nextState = {
        ...state,
        legalDealCancelVisible: false,
        legalDealCancelResponse: action.response,
      }
      break
    case constants.LEGAL_DEAL_CANCEL_FAILED:
      nextState = {
        ...state,
        legalDealCancelVisible: false,
        legalDealCancelResponse: action.response,
      }
      break
    case constants.CONFIRM_PAY_REQUEST:
      nextState = {
        ...state,
        confirmPayVisible: true,
      }
      break
    case constants.CONFIRM_PAY_SUCCEED:
      nextState = {
        ...state,
        confirmPayVisible: false,
        confirmPayResponse: action.response,
      }
      break
    case constants.CONFIRM_PAY_FAILED:
      nextState = {
        ...state,
        confirmPayVisible: false,
        confirmPayResponse: action.response,
      }
      break
    case constants.LEGAL_DEAL_CREATE_REQUEST:
      nextState = {
        ...state,
        legalDealCreateVisible: true,
      }
      break
    case constants.LEGAL_DEAL_CREATE_SUCCEED:
      nextState = {
        ...state,
        legalDealCreateVisible: false,
        legalDealCreateResponse: action.response,
      }
      break
    case constants.LEGAL_DEAL_CREATE_FAILED:
      nextState = {
        ...state,
        legalDealCreateVisible: false,
        legalDealCreateResponse: action.response,
      }
      break
    case constants.FIND_LEGAL_DEAL_REQUEST:
      nextState = {
        ...state,
        findLegalDealVisible: true,
      }
      break
    case constants.FIND_LEGAL_DEAL_SUCCEED:
      nextState = {
        ...state,
        findLegalDealVisible: false,
        findLegalDealResponse: action.response,
      }
      break
    case constants.FIND_LEGAL_DEAL_FAILED:
      nextState = {
        ...state,
        findLegalDealVisible: false,
        findLegalDealResponse: action.response,
      }
      break
    case constants.HAVED_PAY_REQUEST:
      nextState = {
        ...state,
        havedPayVisible: true,
      }
      break
    case constants.HAVED_PAY_SUCCEED:
      nextState = {
        ...state,
        havedPayVisible: false,
        havedPayResponse: action.response,
      }
      break
    case constants.HAVED_PAY_FAILED:
      nextState = {
        ...state,
        havedPayVisible: false,
        havedPayResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
