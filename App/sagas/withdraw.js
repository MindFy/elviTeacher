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

export function* requestGetCodeWorker(action) {
  const { payload } = action
  const response = yield call(api.requestVerificateCode, payload)
  if (response.success) {
    yield put({
      type: 'withdraw/request_get_code_succeed',
      payload: response,
    })
  } else {
    yield put({
      type: 'withdraw/request_get_code_failed',
      payload: response,
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
        contract: e.contract,
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
  const response = yield call(api.getToken, {pairs_type: 'show'})
  if (response.success) {
    yield put({
      type: 'withdraw/request_pair_success',
      payload: {requestRawPair: response.result, requestPair: parseConfig(response.result)},
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

export function* requestGetCode() {
  yield takeEvery('withdraw/request_get_code', requestGetCodeWorker)
}
