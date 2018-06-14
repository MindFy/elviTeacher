import React, { Component } from 'react'
import {
  WebView,
} from 'react-native'
import { common } from '../../constants/common'

export default class KLine extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.goodsName === this.props.goodsName &&
      nextProps.currencyName === this.props.currencyName
    ) {
      return false
    }
    return true
  }

  render() {
    const { goodsName, currencyName } = this.props
    return (
      <WebView
        style={{
          width: common.sw,
          height: common.sw * common.sw / common.sh,
          backgroundColor: 'transparent',
        }}
        source={{ uri: `http://192.168.1.126:8000/mobile_black.html#${goodsName}/${currencyName}` }}
      // bounces={false}
      // contentInset={{
      //   top: 0,
      //   left: 0,
      //   bottom: 0,
      //   right: 0,
      // }}
      // scalesPageToFit={false}
      // scrollEnabled={false}
      // source={require('./build/index.html')}
      // source={{ uri: 'https://demo_chart.tradingview.com/' }}
      />
    )
  }
}
