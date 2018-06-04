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
import * as api from '../services/api'
import {
  common,
} from '../constants/common'

/* 取消提币 */
export function* cancelWithdraw() {
  while (true) {
    const request = yield take(constants.CANCEL_WITH_DRAW_REQUEST)
    const response = yield call(api.cancelWithdraw, request.data)
    if (response.success) {
      Toast.success(response.result)
      yield put({
        type: constants.CANCEL_WITH_DRAW_SUCCEED,
        paymentWithdraw: request.paymentWithdraw,
      })
    } else {
      yield put({ type: constants.CANCEL_WITH_DRAW_FAILED, response })
      if (response.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (response.error.code === 4000611) {
        Toast.fail('撤单失败')
      } else if (response.error.code === 4000612) {
        Toast.fail('撤单失败, 提币记录不存在')
      } else {
        Toast.fail('撤单失败')
      }
    }
  }
}
/* 获取充值列表 */
export function* findPaymentListRecharge() {
  while (true) {
    const request = yield take(constants.FIND_PAYMENT_LIST_RECHARGE_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      const paymentRecharge = response.result.data.find_payment
      yield put({ type: constants.FIND_PAYMENT_LIST_RECHARGE_SUCCEED, paymentRecharge })
    } else {
      yield put({ type: constants.FIND_PAYMENT_LIST_RECHARGE_FAILED, response })
    }
  }
}
/* 获取提币列表 */
export function* findPaymentListWithdraw() {
  while (true) {
    const request = yield take(constants.FIND_PAYMENT_LIST_WITH_DRAW_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      const paymentWithdraw = response.result.data.find_payment
      yield put({ type: constants.FIND_PAYMENT_LIST_WITH_DRAW_SUCCEED, paymentWithdraw })
    } else {
      yield put({ type: constants.FIND_PAYMENT_LIST_WITH_DRAW_FAILED, response })
    }
  }
}
/* 充值接口 */
export function* recharge() {
  while (true) {
    const request = yield take(constants.RECHARGE_REQUEST)
    const response = yield call(api.recharge, request.data)
    if (response.success) yield put({ type: constants.RECHARGE_SUCCEED, response })
    else yield put({ type: constants.RECHARGE_FAILED, response })
  }
}
/* 提币操作 */
export function* withdraw() {
  while (true) {
    const request = yield take(constants.WITH_DRAW_REQUEST)
    const response = yield call(api.withdraw, request.data)
    if (response.success) {
      Toast.success('提现成功')
      DeviceEventEmitter.emit(common.noti.withdraw)
      yield put({ type: constants.WITH_DRAW_SUCCEED, response })
    } else {
      yield put({ type: constants.WITH_DRAW_FAILED, response })
      if (response.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (response.error.code === 4000601) {
        Toast.fail('提币失败')
      } else if (response.error.code === 4000602) {
        Toast.fail('提币数量太小')
      } else if (response.error.code === 4000603) {
        Toast.fail('仅支持BTC、ETH提币')
      } else if (response.error.code === 4000604) {
        Toast.fail('今日提币已达限额')
      } else if (response.error.code === 4000606) {
        Toast.fail('提币失败, 地址错误')
      } else if (response.error.code === 4000156) {
        Toast.fail('验证码不正确, 授权验证失败')
      } else if (response.error.code === 4000607) {
        Toast.fail('提现数量过小, 请重新输入')
      } else {
        Toast.fail('提币失败')
      }
    }
  }
}
