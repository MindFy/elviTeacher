import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'

function* requestDailyChange() {
  const response = yield call(api.getRose, {})
  if (response.success) {
    const result = []
    const currentToken = yield select(state => state.balanceDetail.currentToken)
    const { name } = currentToken
    for (let i = 0; i < response.result.length; i++) {
      const ones = response.result[i]
      if (ones.name === name) {
        for (let j = 0; j < ones.sub.length; j++) {
          const one = ones.sub[j]
          result.push({
            goods: {
              id: one.id,
              name: one.name,
            },
            currency: {
              id: ones.id,
              name: ones.name,
            },
            cprice: one.cprice,
            hprice: one.hprice,
            lastprice: one.lastprice,
            lprice: one.lprice,
            quantity: one.quantity,
            rose: one.rose,
          })
        }
        break
      } else {
        for (let j = 0; j < ones.sub.length; j++) {
          const one = ones.sub[j]
          if (one.name === name) {
            result.push({
              goods: {
                id: one.id,
                name: one.name,
              },
              currency: {
                id: ones.id,
                name: ones.name,
              },
              cprice: one.cprice,
              hprice: one.hprice,
              lastprice: one.lastprice,
              lprice: one.lprice,
              quantity: one.quantity,
              rose: one.rose,
            })
          }
        }
      }
    }
    yield put({
      type: 'balanceDetail/request_daily_change_success',
      payload: result,
    })
  } else {
    yield put({
      type: 'balanceDetail/request_daily_change_failed',
      payload: response.error
      ,
    })
  }
}

export default function* watchRequestDailyChange() {
  yield takeEvery('balanceDetail/request_daily_change', requestDailyChange)
}
