import React, { Component } from 'react'
import { WebView, PanResponder, View, AsyncStorage } from 'react-native'
import { common } from '../../constants/common'
import * as api from '../../services/api'
import * as exchange from '../../actions/exchange'

/* eslint-disable */
// fix issue https://github.com/facebook/react-native/issues/10865
const patchPostMessageFunction = () => {
  const originalPostMessage = window.postMessage
  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer)
  }
  patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
  window.postMessage = patchedPostMessage
}
const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`
/* eslint-enable */

const styles = {
  webView: {
    width: common.sw,
    height: common.getH(263),
    backgroundColor: 'transparent',
  },
}

export default class KLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateTime: 0,
    }
  }

  componentWillMount() {
    if (common.IsIOS) {
      this.panResponder = {
        panHandlers: {},
      }
    } else {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
          const { scrolViewHandler } = this.props
          if (scrolViewHandler) {
            scrolViewHandler(false)
          }
          return true
        },
        onPanResponderRelease: () => {
          const { scrolViewHandler } = this.props
          if (scrolViewHandler) {
            scrolViewHandler(true)
          }
        },
      })
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('savedKlineIndex')
      .then((savedIndex) => {
        if (savedIndex) {
          this.props.dispatch(exchange.updateKLineIndex(Number(savedIndex)))
          this.setLine(savedIndex, 0)
        } else {
          const { kLineIndex } = this.props
          this.setLine(kLineIndex, 0)
        }
      })
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
      nextProps.currencyName === this.props.currencyName &&
      nextProps.kLineIndex === this.props.kLineIndex
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
        const nextUrl = `${api.API_ROOT}/mobile.html?p=${goodsName}/${currencyName}`
        this.webView.injectJavaScript(`window.location.href='${nextUrl}'`)
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
        const { goodsName, currencyName } = this.props
        const nextUrl = `${api.API_ROOT}/mobile.html?p=${goodsName}/${currencyName}`
        this.webView.injectJavaScript(`window.location.href='${nextUrl}'`)
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
    if (this.webView) {
      this.webView.injectJavaScript(`setChartType(${type})`)
      this.webView.injectJavaScript(`setResolution('${resolution}')`)
    }
  }

  render() {
    const { goodsName, currencyName, kLineIndex } = this.props
    return (
      <View {...this.panResponder.panHandlers} >
        <WebView
          ref={(e) => { this.webView = e }}
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit={false}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          injectedJavaScript={patchPostMessageJsCode}
          source={{ uri: `${api.API_ROOT}/mobile.html?p=${goodsName}/${currencyName}` }}
          onMessage={() => setTimeout(() => this.setValue(kLineIndex), 100)}
        />
      </View>
    )
  }
}
