import React, { Component } from 'react'
import { WebView } from 'react-native'
import { common } from '../../constants/common'
import * as api from '../../services/api'

export default class KLine extends Component {
  componentDidMount() {
    const { kLineIndex } = this.props
    this.setLine(kLineIndex, 200)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.kLineIndex !== this.props.kLineIndex) {
      if (this.webView) {
        this.setValue(nextProps.kLineIndex)
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.goodsName === this.props.goodsName &&
      nextProps.currencyName === this.props.currencyName
    ) {
      return false
    }
    return true
  }

  componentDidUpdate(preProps) {
    const { goodsName, currencyName } = this.props
    if (preProps.goodsName !== goodsName ||
      preProps.currencyName !== currencyName
    ) {
      if (this.webView) {
        const nextUrl = `${api.API_ROOT}/mobile_black.html#${goodsName}/${currencyName}`
        this.webView.injectJavaScript(`window.location.href='${nextUrl}'`)
        this.webView.injectJavaScript('window.location.reload()')
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  setLine(kLineIndex, delay) {
    this.timer = setTimeout(() => {
      if (this.webView) {
        this.webView.injectJavaScript('window.location.reload()')
        this.setValue(kLineIndex)
      } else {
        this.setLine(kLineIndex, 500)
      }
    }, delay)
  }

  setValue(kLineIndex) {
    let resolution = '0'
    let type = 0
    const array = ['分时', '1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
    if (kLineIndex === 0) {
      resolution = 1
      type = 3
    } else {
      resolution = array[kLineIndex]
      type = 1
    }
    this.webView.injectJavaScript(`setChartType(${type})`)
    this.webView.injectJavaScript(`setResolution('${resolution}')`)
  }

  render() {
    const { goodsName, currencyName } = this.props
    return (
      <WebView
        ref={(e) => { this.webView = e }}
        javaScriptEnabled
        domStorageEnabled
        automaticallyAdjustContentInsets={false}
        style={{
          width: common.sw,
          height: common.getH(263),
          backgroundColor: 'transparent',
        }}
        source={{ uri: `${api.API_ROOT}/mobile_black.html#${goodsName}/${currencyName}` }}
      />
    )
  }
}
