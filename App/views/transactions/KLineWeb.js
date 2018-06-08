import React, { Component } from 'react'
import {
  WebView,
} from 'react-native'
import { common } from '../../constants/common'

export default class KLine extends Component {
  componentDidMount() { }
  render() {
    return (
      <WebView
        style={{
          width: common.sw,
          height: common.sw * common.sw / common.sh,
        }}
        // source={{ uri: 'http://192.168.1.165:8000/tpl.html' }}
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
