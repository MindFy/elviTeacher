import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
import { Overlay } from 'teaset'
import equal from 'deep-equal'
import { WebView, Animated, View, StatusBar, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { common } from '../../constants/common'
import * as api from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import cache from '../../utils/cache'
import transfer from '../../localization/utils'
import * as exchange from '../../actions/exchange'

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
    backgroundColor: '#101b23',
  },
  navBar: {
    width: '100%',
    height: common.IsIOS ? (common.navHeight - 64 + 50) : 50,
    paddingTop: common.IsIOS ? (common.navHeight - 64) : 0,
    backgroundColor: '#0E1820',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  detailShow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btc: {
    fontSize: 12,
    color: '#616989',
    marginRight: 10,
  },
  currentBtc: {
    color: '#DFE4FF',
    fontSize: 20,
  },
  increaseUp: {
    color: '#D54550',
    fontSize: 16,
  },
  increaseDown: {
    color: 'rgb(36, 199, 139)',
    fontSize: 16,
  },
  arrowStyle: {
    width: common.IsIOS ? 10 : 10 * common.scale,
    height: common.IsIOS ? 10 : 10 * common.scale,
    paddingHorizontal: common.IsIOS ? 5 : 5 * common.scale,
  },
  cny: {
    marginHorizontal: 5,
    fontSize: 12,
    color: '#DFE4FF',
  },
  priceUp: {
    color: '#D54550',
    fontSize: 12,
  },
  volume: {
    color: '#616989',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 3,
  },
  btcAmount: {
    color: '#DFE4FF',
    fontSize: 12,
  },
  priceDown: {
    color: 'rgb(36, 199, 139)',
    fontSize: 12,
  },
  backBtn: {
    width: 50,
    height: 50,
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
  footerView: {
    width: '100%',
    height: 35,
    backgroundColor: '#0E1820',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerItems: {
    flex: 1,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#DFE4FF',
    fontSize: 14,
  },
  textSelectedStyle: {
    color: '#FFD502',
    fontSize: 14,
  },
  arrowIcon: {
    width: 12,
    height: 6,
    marginLeft: 2,
  },
  btnCovers: {
    paddingHorizontal: 8,
    backgroundColor: '#0E1820',
    height: 92,
    width: 92,
    transform: [
      { rotateZ: '90deg' },
    ],
  },
  btnHourCovers: {
    paddingHorizontal: 8,
    backgroundColor: '#0E1820',
    height: 46,
    width: 46,
    transform: [
      { rotateZ: '90deg' },
    ],
  },
  popViewStyle: {
    backgroundColor: 'red',
    borderWidth: 0,
  },
  popItems: {
    color: '#DFE4FF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 23,
    height: 23,
  },
  popItemsSelected: {
    color: '#FFD502',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 23,
    height: 23,
  },
}

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
class KLineFullScreen extends Component {
  constructor(props) {
    super(props)
    this.minuteRotate = new Animated.Value(0)
    this.hourRotate = new Animated.Value(0)
    const { language } = this.props
    this.array = [
      '',
      transfer(language, 'exchange_1min'),
      transfer(language, 'exchange_5min'),
      transfer(language, 'exchange_15min'),
      transfer(language, 'exchange_30min'),
      transfer(language, 'exchange_1hour'),
      transfer(language, 'exchange_4hour'),
    ]
  }

  componentWillMount() {
    StatusBar.setHidden(true, true)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.kLineIndex !== this.props.kLineIndex) {
      if (this.webView) {
        this.setValue(nextProps.kLineIndex)
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!equal(nextProps.valuation, this.props.valuation)) {
      return true
    }
    if (nextProps.kLineIndex !== this.props.kLineIndex) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, true)
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

  baseBtnDidClick(idx) {
    const { dispatch } = this.props
    AsyncStorage.setItem('savedKlineIndex', idx.toString())
    dispatch(exchange.updateKLineIndex(idx))
  }

  minuteBtnDidClick(idx) {
    if (this.minuteShowKey) {
      Overlay.hide(this.minuteShowKey)
    }
    Animated.timing(
      this.minuteRotate, {
        toValue: 0,
        duration: 150,
      },
    ).start()
    const { dispatch } = this.props
    AsyncStorage.setItem('savedKlineIndex', idx.toString())
    dispatch(exchange.updateKLineIndex(idx))
  }

  hourBtnDidClick(idx) {
    if (this.hourShowKey) {
      Overlay.hide(this.hourShowKey)
    }
    Animated.timing(
      this.hourRotate, {
        toValue: 0,
        duration: 150,
      },
    ).start()
    const { dispatch } = this.props
    AsyncStorage.setItem('savedKlineIndex', idx.toString())
    dispatch(exchange.updateKLineIndex(idx))
  }

  showMinuteOverlay({ x, y, width, height }) {
    const fromBounds = { x, y, width, height }
    const { kLineIndex } = this.props
    const overlayView = (
      <Overlay.PopoverView
        onAppearCompleted={() => {
          Animated.timing(
            this.minuteRotate, {
              toValue: 0.5,
              duration: 150,
            },
          ).start()
        }}
        onDisappearCompleted={() => {
          this.minuteShowKey = undefined
          Animated.timing(
            this.minuteRotate, {
              toValue: 0,
              duration: 150,
            },
          ).start()
        }}
        popoverStyle={styles.popViewStyle}
        fromBounds={fromBounds}
        direction="right"
        align="start"
        directionInsets={4}
        showArrow={false}
      >
        <View style={styles.btnCovers}>
          <Text
            style={
              kLineIndex === 1 ?
                styles.popItemsSelected :
                styles.popItems
            }
            onPress={() => this.minuteBtnDidClick(1)}
          >
            {this.array[1]}
          </Text>
          <Text
            style={
              kLineIndex === 2 ?
                styles.popItemsSelected :
                styles.popItems
            }
            onPress={() => this.minuteBtnDidClick(2)}
          >
            {this.array[2]}
          </Text>
          <Text
            style={
              kLineIndex === 3 ?
                styles.popItemsSelected :
                styles.popItems
            }
            onPress={() => this.minuteBtnDidClick(3)}
          >
            {this.array[3]}
          </Text>
          <Text
            style={
              kLineIndex === 4 ?
                styles.popItemsSelected :
                styles.popItems
            }
            onPress={() => this.minuteBtnDidClick(4)}
          >
            {this.array[4]}
          </Text>
        </View>
      </Overlay.PopoverView>
    )
    this.minuteShowKey = Overlay.show(overlayView)
  }

  showHourOverlay({ x, y, width, height }) {
    const fromBounds = { x, y, width, height }
    const { kLineIndex } = this.props
    const overlayView = (
      <Overlay.PopoverView
        onAppearCompleted={() => {
          Animated.timing(
            this.hourRotate, {
              toValue: 0.5,
              duration: 150,
            },
          ).start()
        }}
        onDisappearCompleted={() => {
          this.hourShowKey = undefined
          Animated.timing(
            this.hourRotate, {
              toValue: 0,
              duration: 150,
            },
          ).start()
        }}
        popoverStyle={styles.popViewStyle}
        fromBounds={fromBounds}
        direction="right"
        align="start"
        directionInsets={4}
        showArrow={false}
      >
        <View style={styles.btnHourCovers}>
          <Text
            style={
              kLineIndex === 5 ?
                styles.popItemsSelected :
                styles.popItems
            }
            onPress={() => this.hourBtnDidClick(5)}
          >
            {this.array[5]}
          </Text>
          <Text
            style={
              kLineIndex === 6 ?
                styles.popItemsSelected :
                styles.popItems
            }
            onPress={() => this.hourBtnDidClick(6)}
          >
            {this.array[6]}
          </Text>
        </View>
      </Overlay.PopoverView>
    )
    this.hourShowKey = Overlay.show(overlayView)
  }

  pop() {
    this.props.navigation.goBack()
    setTimeout(() => {
      cache.removeObject('duration')
    }, 100)
  }

  renderHeaderBar() {
    const { selectedPair, valuation, language } = this.props
    const goodsName = selectedPair.goods.name
    const currencyName = selectedPair.currency.name
    let quantity = ''
    let cprice = ''
    const rose = selectedPair.rose
    let rmb = '0.00'

    if (selectedPair) {
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q) => {
        cprice = new BigNumber(selectedPair.cprice).toFixed(p, 1)
        quantity = new BigNumber(selectedPair.quantity).toFixed(q, 1)
      })
      if (valuation && valuation.rates) {
        rmb = valuation.rates[currencyName][common.token.CNYT]
        rmb = new BigNumber(cprice).multipliedBy(rmb).toFixed(2, 1)
      }
    }
    let cpriceColor
    let dirImageSource
    let newRose = new BigNumber(rose)
    if (newRose.gt(0)) {
      cpriceColor = common.redColor
      dirImageSource = require('../../assets/red_arrow_up.png')
    } else if (newRose.lt(0)) {
      cpriceColor = common.greenColor
      dirImageSource = require('../../assets/down_arrow_green.png')
    } else {
      cpriceColor = common.redColor
    }
    newRose = newRose.multipliedBy(100).toFixed(2, 1)
    return (<View style={styles.navBar}>
      <View style={styles.detailShow}>
        <Text style={styles.btc}>
          <Text style={styles.currentBtc}>{goodsName}</Text>/{currencyName}
        </Text>
        <Text style={cpriceColor === common.redColor ?
          styles.increaseUp :
          styles.increaseDown}
        >{cprice}
          <Image
            style={styles.arrowStyle}
            source={dirImageSource}
          />
        </Text>
        <Text style={styles.cny}>¥ {rmb}</Text>
        <Text style={cpriceColor === common.redColor ?
          styles.priceUp :
          styles.priceDown}
        >{`${cpriceColor === common.redColor ? `+${newRose}` : newRose}%`}</Text>
        <Text style={styles.volume}>{transfer(language, 'exchange_24changed')}:</Text>
        <Text style={styles.btcAmount}>{quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={common.activeOpacity}
        delay={0}
        onPress={() => this.pop()}
      >
        <Image
          resizeMode="contain"
          source={require('../../assets/full_screen_2.png')}
          style={styles.backImage}
        />
      </TouchableOpacity>
    </View>)
  }

  renderFooterBar() {
    const { language, kLineIndex } = this.props
    return (
      <View style={styles.footerView}>
        <NextTouchableOpacity
          style={styles.footerItems}
          activeOpacity={common.activeOpacity}
          onPress={() => this.baseBtnDidClick(0)}
          delay={100}
        >
          <Text
            style={
              kLineIndex === 0 ?
                styles.textSelectedStyle :
                styles.textStyle
            }
          >{transfer(language, 'exchange_time_l')}</Text>
        </NextTouchableOpacity>
        <TouchableOpacity
          style={styles.footerItems}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            this.showMinuteOverlay({
              x: 35,
              y: common.sh / 6 + (common.sh / 6 - 104) / 2,
              width: 0,
              height: 0,
            })
          }}
        >
          <Text
            style={
              (kLineIndex > 0 && kLineIndex <= 4) ?
                styles.textSelectedStyle :
                styles.textStyle
            }
          >{(kLineIndex > 0 && kLineIndex <= 4) ?
              this.array[kLineIndex] :
              transfer(language, 'exchange_minute')
            }</Text>
          <Animated.Image
            resizeMode="contain"
            style={[styles.arrowIcon,
              {
                transform: [
                  {
                    rotate: this.minuteRotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }]}
            source={require('../../assets/yellow_arrow_down.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItems}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            this.showHourOverlay({
              x: 35,
              y: common.sh / 3 + (common.sh / 6 - 46) / 2,
              width: 0,
              height: 0,
            })
          }}
        >
          <Text
            style={
              (kLineIndex > 4 && kLineIndex <= 6) ?
                styles.textSelectedStyle :
                styles.textStyle
            }
          >{(kLineIndex > 4 && kLineIndex <= 6) ?
              this.array[kLineIndex] :
              transfer(language, 'exchange_hour_l')
            }</Text>
          <Animated.Image
            resizeMode="contain"
            style={[styles.arrowIcon,
              {
                transform: [
                  {
                    rotate: this.hourRotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }]}
            source={require('../../assets/yellow_arrow_down.png')}
          />
        </TouchableOpacity>
        <NextTouchableOpacity
          style={styles.footerItems}
          activeOpacity={common.activeOpacity}
          delay={100}
          onPress={() => this.baseBtnDidClick(7)}
        >
          <Text
            style={
              kLineIndex === 7 ?
                styles.textSelectedStyle :
                styles.textStyle
            }
          >{transfer(language, 'exchange_dayLine')}</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.footerItems}
          activeOpacity={common.activeOpacity}
          delay={100}
          onPress={() => this.baseBtnDidClick(8)}
        >
          <Text
            style={
              kLineIndex === 8 ?
                styles.textSelectedStyle :
                styles.textStyle
            }
          >{transfer(language, 'exchange_weekLine')}</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.footerItems}
          activeOpacity={common.activeOpacity}
          delay={100}
          onPress={() => this.baseBtnDidClick(9)}
        >
          <Text
            style={
              kLineIndex === 9 ?
                styles.textSelectedStyle :
                styles.textStyle
            }
          >{transfer(language, 'exchange_monthLine')}</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    const { selectedPair, kLineIndex } = this.props
    const goodsName = selectedPair.goods.name
    const currencyName = selectedPair.currency.name
    return (
      <View style={styles.conatiner}>
        <View style={styles.box}>
          {this.renderHeaderBar()}
          <WebView
            ref={(e) => { this.webView = e }}
            javaScriptEnabled
            domStorageEnabled
            scalesPageToFit={false}
            automaticallyAdjustContentInsets={false}
            style={styles.webview}
            injectedJavaScript={patchPostMessageJsCode}
            source={{ uri: `${api.API_ROOT}/mobile.html?p=${goodsName}/${currencyName}` }}
            onMessage={() => setTimeout(() => this.setValue(kLineIndex), 100)}
          />
          {this.renderFooterBar()}
        </View>
      </View >
    )
  }
}

function mapStateToProps(state) {
  return {
    valuation: state.exchange.valuation,
    kLineIndex: state.exchange.kLineIndex,
    selectedPair: state.exchange.selectedPair,
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(KLineFullScreen)
