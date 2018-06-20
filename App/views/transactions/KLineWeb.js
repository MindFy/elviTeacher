import React, { Component } from 'react'
import { WebView } from 'react-native'
import { common } from '../../constants/common'
import * as api from '../../services/api'

export default class KLine extends Component {
  componentDidMount() {
    const { kLineIndex } = this.props
    this.setLine(kLineIndex)
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

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  setLine(kLineIndex) {
    this.timer = setTimeout(() => {
      if (this.webView) {
        this.setValue(kLineIndex)
      } else {
        this.setLine()
      }
    }, 2000)
  }

  setValue(kLineIndex) {
    let solution = '0'
    let type = 0
    const array = ['分时', '1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
    if (kLineIndex === 0) {
      solution = 1
      type = 3
    } else {
      solution = array[kLineIndex]
      type = 1
    }
    this.webView.injectJavaScript(`setChartType(${type})`)
    this.webView.injectJavaScript(`setResolution(${solution})`)
  }

  render() {
    const { goodsName, currencyName } = this.props
    return (
      <WebView
        ref={(e) => { this.webView = e }}
        style={{
          width: common.sw,
          height: common.getH(263),
          backgroundColor: 'transparent',
        }}
        source={{ uri: `http://192.168.1.165:8000/mobile_black.html#${goodsName}/${currencyName}` }}
      />
    )
  }
}
