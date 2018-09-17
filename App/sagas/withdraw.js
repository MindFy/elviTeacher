import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestCoinListWorker() {
  // const response = yield call(api.api_here, param_here)

  yield put({
    type: 'withdraw/request_coin_list_succeed',
    payload: ['BTC', 'ETH', 'ETC', 'LTC'],
  })
}

export function* requestBalanceWorker(action) {
  const response = yield call(api.getAssets, action.payload)

  if (response.success) {
    const respData = response.result
    let one
    if (Object.keys(respData).length === 0) {
      one = 0
    } else {
      one = respData[(action.payload.token_ids)[0]].amount
    }
    yield put({
      type: 'withdraw/request_balance_succeed',
      payload: one,
    })
  } else {
    yield put({
      type: 'withdraw/request_balance_failed',
      payload: response.error,
    })
  }
}

export function* requestValuationWorker() {
  const response = yield call(api.getValuation)

  if (response.success) {
    yield put({
      type: 'withdraw/requset_valuation_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'withdraw/requset_valuation_failed',
      payload: response.error,
    })
  }
}

export function* requestWithdrawWorker(action) {
  const response = yield call(api.withdraw, action.payload)

  if (response.success) {
    yield put({
      type: 'withdraw/request_withdraw_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'withdraw/request_withdraw_failed',
      payload: response.error,
    })
  }
}

export function* requestWithdrawAddressWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)
  if (response.success) {
    yield put({
      type: 'withdraw/request_withdraw_address_succeed',
      payload: response.result.data.find_address,
    })
  } else {
    yield put({
      type: 'withdraw/request_withdraw_address_failed',
      payload: response.error,
    })
  }
}

export function* requsetCheck2GoogleAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.check2GoogleAuth, payload)
  if (response.success) {
    yield put({
      type: 'withdraw/check2_google_auth_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'withdraw/check2_google_auth_failed',
      payload: response.error,
    })
  }
}

export function* requsetCheck2SMSAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.checkVerificateCode, payload)
  if (response.success) {
    yield put({
      type: 'withdraw/check2_sms_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'withdraw/check2_sms_auth_set_response',
      payload: response,
    })
  }
}

export function* requsetCheck2SmtpAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.checkVerificateSmtpCode, payload)
  if (response.success) {
    yield put({
      type: 'withdraw/check2_smtp_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'withdraw/check2_smtp_auth_set_response',
      payload: response,
    })
  }
}

export function* requestGetCodeWorker(action) {
  const { payload } = action
  const response = yield call(api.getVerificateCode, payload)

  if (response.success) {
    yield put({
      type: 'withdraw/request_get_code_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'withdraw/request_get_code_failed',
      payload: response.error,
    })
  }
}

// 转换币币对配置信息
function parseConfig(data) {
  const { tokens, coinPairs } = data
  const canWithdrawCoins = []
  const canRechargeAddress = []
  const coinIdDic = {}
  const accuracy = {}
  tokens.forEach((e) => {
    if (e.name !== 'CNY') {
      coinIdDic[e.name] = {
        id: e.id,
        fee: e.withdrawFee,
        minAmount: e.withdrawMin,
        name: e.name,
        cnName: e.cnName,
      }
      if (e.allowWithdraw) {
        canWithdrawCoins.push(e.name)
      }
      if (e.allowRecharge) {
        canRechargeAddress.push(e.name)
      }
    }
  })

  // 配置精度
  coinPairs.forEach((e) => {
    e.pairs.forEach((elem) => {
      accuracy[`${elem.name}_${e.name}`] = {
        priceLimit: Number(elem.priceLimit),
        quantityLimit: Number(elem.quantityLimit),
        moneyLimit: Number(elem.moneyLimit),
      }
    })
  })
  return {
    canWithdrawCoins,
    canRechargeAddress,
    coinIdDic,
    accuracy,
  }
}

function* requestPairsWorker() {
  const response = yield call(api.getToken)
  if (response.success) {
    yield put({
      type: 'withdraw/request_pair_success',
      payload: parseConfig(response.result),
    })
  } else {
    yield put({
      type: 'withdraw/request_pair_failed',
      payload: undefined,
    })
  }
}

export function* requestPairs() {
  yield takeEvery('withdraw/request_pair_request', requestPairsWorker)
}

export function* requestCoinList() {
  yield takeEvery('withdraw/request_coin_list', requestCoinListWorker)
}

export function* requestBalance() {
  yield takeEvery('withdraw/request_balance', requestBalanceWorker)
}

export function* requestValuation() {
  yield takeEvery('withdraw/requset_valuation', requestValuationWorker)
}

export function* requestWithdraw() {
  yield takeEvery('withdraw/request_withdraw', requestWithdrawWorker)
}

export function* requestWithdrawAddress() {
  yield takeEvery('withdraw/request_withdraw_address', requestWithdrawAddressWorker)
}

export function* requsetCheck2GoogleAuth() {
  yield takeEvery('withdraw/check2_google_auth', requsetCheck2GoogleAuthWorker)
}

export function* requsetCheck2SMSAuth() {
  yield takeEvery('withdraw/check2_sms_auth', requsetCheck2SMSAuthWorker)
}

export function* requsetCheck2SmtpAuth() {
  yield takeEvery('withdraw/check2_smtp_auth', requsetCheck2SmtpAuthWorker)
}

export function* requestGetCode() {
  yield takeEvery('withdraw/request_get_code', requestGetCodeWorker)
}
