import {
  DeviceEventEmitter,
} from 'react-native'
import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'
import {
  common,
} from '../constants/common'
import ws from '../websocket/ws'

/* 获取交易中心的涨幅，包含：左上角以及顶上数据 */
export default function* getRose() {
  while (true) {
    const request = yield take(constants.GET_ROSE_REQUEST)
    const response = yield call(api.getRose)
    if (response.success) {
      const homeRose = []
      const rose = response.result
      let homeRoseSelected = request.data.homeRoseSelected
      const user = request.data.user
      let homeRoseSelectedTemp
      for (let i = 0; i < rose.length; i++) {
        const currency = rose[i]
        const sub = currency.sub

        for (let j = 0; j < sub.length; j++) {
          const element = {}
          const goods = sub[j]
          element.currency = { id: currency.id, name: currency.name }
          element.goods = { id: goods.id, name: goods.name }
          element.lastprice = goods.lastprice
          element.cprice = goods.cprice
          element.hprice = goods.hprice
          element.lprice = goods.lprice
          element.quantity = goods.quantity
          element.rose = goods.rose
          if (homeRoseSelected) {
            if ((homeRoseSelected.goods.id === element.goods.id)
              && (homeRoseSelected.currency.id === element.currency.id)) {
              homeRoseSelectedTemp = element
            }
          } else if (i === 0 && j === 0) {
            homeRoseSelectedTemp = element
            ws.onopen(homeRoseSelectedTemp.goods.id, homeRoseSelectedTemp.currency.id, user)
          }
          homeRose.push(element)
        }
      }
      console.log('+++++++++++++++++++--->', homeRoseSelected, homeRoseSelectedTemp)
      homeRoseSelected = homeRoseSelectedTemp

      if (rose.length) {
        DeviceEventEmitter.emit(common.noti.home, constants.GET_ROSE_SUCCEED, homeRoseSelected)
      }
      yield put({ type: constants.GET_ROSE_SUCCEED, data: { rose, homeRose, homeRoseSelected } })
    } else {
      yield put({ type: constants.GET_ROSE_FAILED })
    }
  }
}
