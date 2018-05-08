
import {
  DeviceEventEmitter,
} from 'react-native'
import ReconnectingWebSocket from 'reconnecting-websocket'
import {
  common,
} from '../constants/common'
import * as api from '../services/api'

const ws = new ReconnectingWebSocket(api.ws)

ws.onopen = (goodsId, currencyId, user) => {
  const userid = user ? user.id : undefined
  // console.log('ws open-------------->', goodsId, currencyId, userid)
  ws.send(JSON.stringify({
    act: 'on',
    userid,
    ch: `channel_${goodsId}_${currencyId}`,
    timestamp: Date.now(),
  }))
}

ws.addEventListener('close', () => {
  // console.log('WebSocket close!')
})

ws.addEventListener('message', (event) => {
  const { data } = event
  const dataParse = JSON.parse(data)
  // console.log('ws message----------->', dataParse)
  if (!dataParse.data) return

  if (dataParse.data.handicap) {
    const type = common.ws.handicap
    const handicap = dataParse.data.handicap
    let shelvesBuy = []
    let shelvesSell = []
    shelvesBuy = handicap.buy.length > 5 ?
      handicap.buy.slice(0, 5) :
      handicap.buy
    shelvesSell = handicap.sell.length > 5 ?
      handicap.sell.slice(handicap.sell.length - 5, handicap.sell.length) :
      handicap.sell
    const result = { shelvesBuy, shelvesSell }
    DeviceEventEmitter.emit(common.listenerNoti, type, result)
  }
  if (dataParse.data.market) {
    const type = common.ws.market
    const result = dataParse.data.market
    DeviceEventEmitter.emit(common.listenerNoti, type, result)
  }
  if (dataParse.data.deals) {
    const type = common.ws.deals
    const result = dataParse.data.deals
    DeviceEventEmitter.emit(common.listenerNoti, type, result)
  }
  if (dataParse.data.delegates) {
    const type = common.ws.delegates
    const result = dataParse.data
    DeviceEventEmitter.emit(common.listenerNoti, type, result)
  }
})

export default ws
