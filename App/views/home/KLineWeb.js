import React, { Component } from 'react'
import {
  WebView,
} from 'react-native'

export default class KLine extends Component {
  componentDidMount() { }
  render() {
    const { width, height } = this.props
    return (
      <WebView
        style={{
          width,
          height,
        }}
        // bounces={false}
        // contentInset={{
        //   top: 0,
        //   left: 0,
        //   bottom: 0,
        //   right: 0,
        // }}
        // scalesPageToFit={false}
        // scrollEnabled={false}
        source={require('./build/index.html')}
        // source={{ uri: 'https://demo_chart.tradingview.com/' }}
      />
    )
  }
}
