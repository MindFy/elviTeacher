import {
  DeviceEventEmitter,
} from 'react-native'
import {
  take, call, put,
} from 'redux-saga/effects'
import {
  Toast,
} from 'teaset'
import * as constants from '../constants/index'
import {
  common,
} from '../constants/common'
import * as api from '../services/api'

/* 取消所有委托单(只有dealing状态的才可以取消) */
export function* allCancel() {
  while (true) {
    yield take(constants.ALL_CANCEL_REQUEST)
    const response = yield call(api.allCancel)
    if (response.success) {
      Toast.success(response.result)
      DeviceEventEmitter.emit(common.delegateListenerNoti)
      yield put({ type: constants.ALL_CANCEL_SUCCEED, response })
    } else {
      Toast.fail(response.error.message)
      yield put({ type: constants.ALL_CANCEL_FAILED, response })
    }
  }
}
/* 取消委托单(只有dealing状态的才可以取消) */
export function* cancel() {
  while (true) {
    const request = yield take(constants.CANCEL_REQUEST)
    const response = yield call(api.cancel, request.data)
    if (response.success) {
      Toast.success(response.result)
      DeviceEventEmitter.emit(common.delegateListenerNoti)
      yield put({
        type: constants.CANCEL_SUCCEED,
        response,
        delegateSelfCurrent: request.delegateSelfCurrent,
      })
    } else {
      Toast.fail(response.error.message)
      yield put({ type: constants.CANCEL_FAILED, response })
    }
  }
}
/* 创建委托单 */
export function* create() {
  while (true) {
    const request = yield take(constants.CREATE_REQUEST)
    const response = yield call(api.create, request.data)
    if (response.success) {
      Toast.success('挂单成功')
      yield put({ type: constants.CREATE_SUCCEED, response })
    } else {
      Toast.fail(response.error.message)
      yield put({ type: constants.CREATE_FAILED, response })
    }
  }
}
/* 按交易币币对，查询深度图 */
export function* getDepthMap() {
  while (true) {
    const request = yield take(constants.GET_DEPTH_MAP_REQUEST)
    const response = yield call(api.getDepthMap, request.data)
    if (response.success) yield put({ type: constants.GET_DEPTH_MAP_SUCCEED, response })
    else yield put({ type: constants.GET_DEPTH_MAP_FAILED, response })
  }
}
/* 按交易币币对，查询委托的买卖的各10档 */
export function* getShelves() {
  while (true) {
    const request = yield take(constants.GET_SHELVES_REQUEST)
    const response = yield call(api.getShelves, request.data)
    if (response.success) {
      let shelvesBuy = []
      let shelvesSell = []
      shelvesBuy = response.result.buy.length > 5 ?
        response.result.buy.slice(0, 5) :
        response.result.buy
      shelvesSell = response.result.sell.length > 5 ?
        response.result.sell.slice(0, 5) :
        response.result.sell
      yield put({
        type: constants.GET_SHELVES_SUCCEED,
        data: {
          shelvesBuy,
          shelvesSell,
        },
      })
    } else {
      yield put({ type: constants.GET_SHELVES_FAILED, response })
    }
  }
}
/* 用户获取当前委托 */
export function* findDelegateSelfCurrent() {
  while (true) {
    const request = yield take(constants.FIND_DELEGATE_SELF_CURRENT_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      yield put({ type: constants.FIND_DELEGATE_SELF_CURRENT_SUCCEED, response })
    } else {

    }
  }
}
/* 用户获取历史委托 */
export function* findDelegateSelfHistory() {
  while (true) {
    const request = yield take(constants.FIND_DELEGATE_SELF_HISTORY_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_DELEGATE_SELF_HISTORY_SUCCEED, response })
  }
}
