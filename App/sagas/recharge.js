import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestCoinListWorker() {
  // const { payload } = action
  // const response = yield call(api.api_here, payload)

  // if (response.success) {
  //   yield put({
  //     type: 'recharge/request_coin_list_succeed',
  //     payload: response.result,
  //   })
  // } else {
  //   yield put({
  //     type: 'recharge/request_coin_list_failed',
  //     payload: response.error,
  //   })
  // }
  yield put({
    type: 'recharge/request_coin_list_succeed',
    payload: [
      // { name: 'TK', id: 1 },
      { name: 'BTC', id: 2 },
      // { name: 'CNYT', id: 3 },
      { name: 'ETH', id: 5 },
      { name: 'ETC', id: 6 },
      { name: 'LTC', id: 7 },
    ],
  })
}

export function* requestRechargeAddressWorker(action) {
  const { payload } = action
  const response = yield call(api.getAssets, payload)
  if (response.success) {
    const tokenId = (payload.token_ids)[0]
    if (Object.keys(response.result).length
    && response.result[tokenId]
    && response.result[tokenId].rechargeaddr) {
      const addressObjc = response.result
      yield put({
        type: 'recharge/request_recharge_address_succeed',
        payload: addressObjc,
      })
    } else {
      yield put({
        type: 'recharge/request_create_address',
        payload: {
          token_id: tokenId,
        },
      })
    }
  } else {
    const tokenId = (payload.token_ids)[0]
    const addressObjc = {
      [tokenId]: { rechargeaddr: '暂无可充值地址' },
    }
    yield put({
      type: 'recharge/request_recharge_address_failed',
      payload: addressObjc,
    })
  }
}

export function* requestCreateAddressWorker(action) {
  const { payload } = action
  const response = yield call(api.createAddress, payload)
  if (response.success) {
    const addressObjc = {
      [payload.token_id]: { rechargeaddr: response.result.rechargeaddr },
    }
    yield put({
      type: 'recharge/request_create_address_succeed',
      payload: addressObjc,
    })
  } else {
    const tokenId = payload.token_id
    const addressObjc = {
      [tokenId]: { rechargeaddr: '暂无可充值地址' },
    }
    yield put({
      type: 'recharge/request_create_address_failed',
      payload: addressObjc,
    })
  }
}

export function* requestCoinList() {
  yield takeEvery('recharge/request_coin_list', requestCoinListWorker)
}

export function* requestRechargeAddress() {
  yield takeEvery('recharge/request_recharge_address', requestRechargeAddressWorker)
}

export function* requestCreateAddress() {
  yield takeEvery('recharge/request_create_address', requestCreateAddressWorker)
}
