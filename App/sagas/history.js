import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestDepositWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    let newDeposit = response.result.data.find_payment
    const page = yield select(state => state.history.depositPage)
    if (page !== 0) {
      const deposit = yield select(state => state.history.deposit)
      newDeposit = deposit.concat(newDeposit)
    }
    yield put({
      type: 'history/request_deposit_succeed',
      payload: newDeposit,
    })
  } else {
    yield put({
      type: 'history/request_deposit_failed',
      payload: response.error,
    })
  }
}

export function* requestWithdrawWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    let newWithdraw = response.result.data.find_payment
    const page = yield select(state => state.history.withdrawPage)
    if (page !== 0) {
      const withdraw = yield select(state => state.history.withdraw)
      newWithdraw = withdraw.concat(newWithdraw)
    }
    yield put({
      type: 'history/request_withdraw_succeed',
      payload: newWithdraw,
    })
  } else {
    yield put({
      type: 'history/request_withdraw_failed',
      payload: response.error,
    })
  }
}

export function* requestOtcWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    let newOtc = response.result.data.find_legalDeal
    const page = yield select(state => state.history.otcPage)
    if (page !== 0) {
      const otc = yield select(state => state.history.otc)
      newOtc = otc.concat(newOtc)
    }
    yield put({
      type: 'history/request_otc_succeed',
      payload: newOtc,
    })
  } else {
    yield put({
      type: 'history/request_otc_failed',
      payload: response.error,
    })
  }
}

export function* withdrawCancelWorker(action) {
  const { payload } = action
  const response = yield call(api.cancelWithdraw, payload)

  if (response.success) {
    yield put({
      type: 'history/withdraw_cancel_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'history/withdraw_cancel_failed',
      payload: response.error,
    })
  }
}

export function* requestDeposit() {
  yield takeEvery('history/request_deposit', requestDepositWorker)
}

export function* requestWithdraw() {
  yield takeEvery('history/request_withdraw', requestWithdrawWorker)
}

export function* requestOtc() {
  yield takeEvery('history/request_otc', requestOtcWorker)
}

export function* withdrawCancel() {
  yield takeEvery('history/withdraw_cancel', withdrawCancelWorker)
}
