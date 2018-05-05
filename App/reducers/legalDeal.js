import { RefreshState } from 'react-native-refresh-list-view'
import * as constants from '../constants/index'
import {
  common,
} from '../constants/common'

const initialState = {
  legalDeal: [],
  direct: common.buy,
  priceBuy: 1,
  priceSell: 0.99,
  quantity: 0,
  skip: 0,
  refreshState: RefreshState.Idle,

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
    case constants.LEGAL_DEAL_CANCEL_SUCCEED:
      nextState = {
        ...state,
        legalDeal: action.legalDeal,
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
        legalDeal: action.legalDeal,
      }
      break
    case constants.CONFIRM_PAY_FAILED:
      nextState = {
        ...state,
        confirmPayVisible: false,
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
        quantity: 0,
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
        refreshState: action.refreshState,
      }
      break
    case constants.FIND_LEGAL_DEAL_SUCCEED:
      nextState = {
        ...state,
        legalDeal: state.refreshState === RefreshState.HeaderRefreshing
          ? action.legalDeal : state.legalDeal.concat(action.legalDeal),
        skip: (state.refreshState === RefreshState.FooterRefreshing
          && !action.legalDeal.length) ? 0 : (state.skip + 1),
        findLegalDealVisible: false,
        refreshState: (state.refreshState === RefreshState.FooterRefreshing
          && !action.legalDeal.length) ? RefreshState.NoMoreData : RefreshState.Idle,
      }
      break
    case constants.FIND_LEGAL_DEAL_FAILED:
      nextState = {
        ...state,
        findLegalDealVisible: false,
        refreshState: RefreshState.Failure,
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
        legalDeal: action.legalDeal,
      }
      break
    case constants.HAVED_PAY_FAILED:
      nextState = {
        ...state,
        havedPayVisible: false,
      }
      break

    case constants.LEGAL_DEAL_UPDATE:
      nextState = {
        ...state,
        direct: action.data.direct,
        quantity: action.data.quantity,
      }
      break
    default:
      break
  }
  return nextState
}
