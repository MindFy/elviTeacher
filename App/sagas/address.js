import {
  take,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'
import { common } from '../constants/common'

/* 增加一个提币地址 */
// export function* addAddress() {
//   while (true) {
//     const request = yield take(constants.ADD_REQUEST)
//     const response = yield call(api.add, request.data)
//     if (response.success) {
//       // Toast.success('添加成功')
//       yield put({ type: constants.ADD_SUCCEED, response })
//     } else {
//       yield put({ type: constants.ADD_FAILED, response })
//       if (response.error.message === common.badNet) {
//         // Toast.fail('网络连接失败，请稍后重试')
//       } else if (response.error.code === 4000411) {
//         // Toast.fail('货币或地址有误')
//       } else if (response.error.code === 4000412) {
//         // Toast.fail('货币不存在')
//       } else if (response.error.code === 4000413) {
//         // Toast.fail('提现地址长度有误，请输入正确的提现地址')
//       } else if (response.error.code === 4000414) {
//         // Toast.fail('地址已存在')
//       } else if (response.error.code === 4000415) {
//         // Toast.fail('仅支持BTC、ETH添加地址')
//       } else if (response.error.code === 4000416) {
//         // Toast.fail('无效的提现地址')
//       } else if (response.error.code === 4000156) {
//         // Toast.fail('授权验证失败')
//       } else {
//         // Toast.fail('添加失败')
//       }
//     }
//   }
// }

export function* fetchAddress(action) {
  const { schema } = action
  const response = yield call(api.graphql, schema)

  if (response.success) {
    yield put({ type: constants.FIND_ADDRESS_SUCCEED, response })
  } else {
    yield put({ type: constants.FIND_ADDRESS_FAILED, response })
  }
}

export function* addAddress_(action) {
  const response = yield call(api.add, action.data)

  if (response.success) {
    yield put({ type: constants.ADD_SUCCEED, response })
  } else {
    yield put({ type: constants.ADD_FAILED, response })
  }
}

export function* findAddress() {
  yield takeEvery(constants.FIND_ADDRESS_REQUEST, fetchAddress)
}

export function* addAddress() {
  yield takeEvery(constants.ADD_REQUEST, addAddress_)
}
