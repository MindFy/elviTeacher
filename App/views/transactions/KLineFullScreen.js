import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView, View, StatusBar, Image } from 'react-native'
import { common } from '../../constants/common'
import * as api from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = {
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: common.sh,
    height: common.sw,
    transform: [
      { rotateZ: '90deg' },
    ],
    backgroundColor: common.navBgColor,
  },
  navBar: {
    width: '100%',
    height: 44,
    backgroundColor: common.navBgColor,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    width: 20,
    height: 20,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}

class KLineFullScreen extends Component {
  componentWillMount() {
    StatusBar.setHidden(true, true)
  }

  componentDidMount() {
    const { kLineIndex } = this.props
    this.setLine(kLineIndex, 500)
  }

  componentDidUpdate(preProps) {
    const { goodsName, currencyName } = this.props
    if (preProps.goodsName !== goodsName ||
      preProps.currencyName !== currencyName
    ) {
      if (this.webView) {
        const nextUrl = `${api.API_ROOT}/mobile_black.html#${goodsName}/${currencyName}`
        this.webView.injectJavaScript(`window.location.href='${nextUrl}'`)
        // this.webView.injectJavaScript('window.location.reload()')
      }
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, true)
  }

  setLine(kLineIndex, delay) {
    this.timer = setTimeout(() => {
      if (this.webView) {
        // this.webView.injectJavaScript('window.location.reload()')
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
    const { navigation } = this.props
    const { goodsName, currencyName } = navigation.state.params
    return (
      <View style={styles.conatiner}>
        <View style={styles.box}>
          <View style={styles.navBar}>
            <NextTouchableOpacity
              style={styles.backBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                resizeMode="contain"
                source={require('../../assets/arrow_left_left.png')}
                style={styles.backImage}
              />
            </NextTouchableOpacity>
          </View>
          <WebView
            ref={(e) => { this.webView = e }}
            javaScriptEnabled
            domStorageEnabled
            scalesPageToFit={false}
            automaticallyAdjustContentInsets={false}
            style={styles.webview}
            source={{ uri: `${api.API_ROOT}/mobile_black.html#${goodsName}/${currencyName}` }}
          />
        </View>
      </View >
    )
  }
}

function mapStateToProps(state) {
  return {
    kLineIndex: state.exchange.kLineIndex,
  }
}

export default connect(mapStateToProps)(KLineFullScreen)
