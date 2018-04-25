import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 取消法币交易单(只有waitpay状态的才可以取消) */
export function* legalDealCancel() {
  while (true) {
    const request = yield take(constants.LEGAL_DEAL_CANCEL_REQUEST)
    const response = yield call(api.legalDealCancel, request.data)
    if (response.success) yield put({ type: constants.LEGAL_DEAL_CANCEL_SUCCEED, response })
    else yield put({ type: constants.LEGAL_DEAL_CANCEL_FAILED, response })
  }
}

/* 确认收款(只有waitconfirm状态的才可以确认) 商户以及用户都会调用 */
export function* confirmPay() {
  while (true) {
    const request = yield take(constants.CONFIRM_PAY_REQUEST)
    const response = yield call(api.confirmPay, request.data)
    if (response.success) yield put({ type: constants.CONFIRM_PAY_SUCCEED, response })
    else yield put({ type: constants.CONFIRM_PAY_FAILED, response })
  }
}

/* 创建法币交易 */
export function* legalDealCreate() {
  while (true) {
    const request = yield take(constants.LEGAL_DEAL_CREATE_REQUEST)
    const response = yield call(api.legalDealCreate, request.data)
    if (response.success) yield put({ type: constants.LEGAL_DEAL_CREATE_SUCCEED, response })
    else yield put({ type: constants.LEGAL_DEAL_CREATE_FAILED, response })
  }
}

/* 用户、商户获取交易列表 */
export function* findLegalDeal() {
  while (true) {
    const request = yield take(constants.FIND_LEGAL_DEAL_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_LEGAL_DEAL_SUCCEED, response })
    else yield put({ type: constants.FIND_LEGAL_DEAL_FAILED, response })
  }
}

/* 我已付款(只有waitpay状态的才可以确认) 商户以及用户都会调用 */
export function* havedPay() {
  while (true) {
    const request = yield take(constants.HAVED_PAY_REQUEST)
    const response = yield call(api.graphql, request.data)
    if (response.success) yield put({ type: constants.HAVED_PAY_SUCCEED, response })
    else yield put({ type: constants.HAVED_PAY_FAILED, response })
  }
}
