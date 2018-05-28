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
    const request = yield take(constants.ALL_CANCEL_REQUEST)
    const response = yield call(api.allCancel, request.data)
    if (response.success) {
      Toast.success(response.result)
      DeviceEventEmitter.emit(common.noti.delegateAllCancel)
      yield put({ type: constants.ALL_CANCEL_SUCCEED, response })
    } else {
      yield put({ type: constants.ALL_CANCEL_FAILED, response })
      Toast.fail('撤销失败')
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
      if (request.fromDetail) {
        yield put({
          type: constants.CANCEL_DELEGATE_SELF_CURRENT_DEAL_SUCCEED,
          response,
          delegateCurrent: request.delegateSelfCurrent,
        })
      } else {
        yield put({
          type: constants.CANCEL_SUCCEED,
          response,
          delegateSelfCurrent: request.delegateSelfCurrent,
        })
      }
    } else {
      yield put({ type: constants.CANCEL_FAILED, response })
      if (response.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (response.error.code === 4000516) {
        Toast.fail('委托单为空')
      } else if (response.error.code === 4000517) {
        Toast.fail('委托单不存在')
      } else if (response.error.code === 4000518) {
        Toast.fail('委托单正在交易')
      } else {
        Toast.fail('撤销失败')
      }
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
      yield put({ type: constants.CREATE_FAILED, response })
      if (response.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (response.error.code === 4000311) {
        Toast.fail('货币或商品不存在')
      } else if (response.error.code === 4000312) {
        Toast.fail('挂单失败，订单已经创建')
      } else if (response.error.code === 4000510) {
        Toast.fail('参数为空')
      } else if (response.error.code === 4000511) {
        Toast.fail('挂单失败，无效的输入')
      } else if (response.error.code === 4000513) {
        Toast.fail('挂单失败，余额不足')
      } else if (response.error.code === 4000514) {
        Toast.fail('挂单失败，交易额发生错误')
      } else {
        Toast.fail('挂单失败')
      }
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
        response.result.sell.slice(response.result.sell.length - 5, response.result.sell.length) :
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
      const findDelegate = response.result.data.find_delegate
      yield put({ type: constants.FIND_DELEGATE_SELF_CURRENT_SUCCEED, findDelegate })
    } else {
      yield put({ type: constants.FIND_DELEGATE_SELF_CURRENT_FAILED, response })
    }
  }
}
/* 交易UI获取当前委托 */
export function* findDelegateSelfCurrentWithGoodsId() {
  while (true) {
    const request = yield take(constants.FIND_DELEGATE_SELF_CURRENT_DEAL_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      const findDelegate = response.result.data.find_delegate
      yield put({ type: constants.DETAIL_DEAL_UPDATEKV, k: 'delegateCurrent', v: findDelegate })
    }
  }
}
/* 用户获取历史委托 */
export function* findDelegateSelfHistory() {
  while (true) {
    const request = yield take(constants.FIND_DELEGATE_SELF_HISTORY_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      const findDelegate = response.result.data.find_delegate
      yield put({ type: constants.FIND_DELEGATE_SELF_HISTORY_SUCCEED, findDelegate })
    } else {
      yield put({ type: constants.FIND_DELEGATE_SELF_HISTORY_FAILED, response })
    }
  }
}
