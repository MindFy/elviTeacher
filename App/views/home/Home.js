import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  AppState,
  StatusBar,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native'
import HotUpdate from 'rn-hotupdate-d3j'
import SplashScreen from 'react-native-splash-screen'
import {
  common,
} from '../../constants/common'
import HomeMarket from './HomeMarket'
import HomeSwiper from './HomeSwiper'
import TKButton from '../../components/TKButton'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import * as exchange from '../../actions/exchange'
import cache from '../../utils/cache'
import packageJson from '../../../package.json'

global.Buffer = require('buffer').Buffer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
})

class Home extends Component {
  constructor(props) {
    super(props)
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Home')
    })
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide()
    }, 200)
    cache.setObject('currentComponentVisible', 'Home')
    this.refreshData()
    const { dispatch } = this.props
    this.timeId = setInterval(() => {
      const page = cache.getObject('currentComponentVisible')
      if (page === 'Home' || page === 'Deal') {
        dispatch(actions.requestMarket())
      }
    }, common.refreshIntervalTime)

    this.checkUpdate()

    AppState.addEventListener('change',
      nextAppState => this._handleAppStateChange(nextAppState))
  }

  componentWillReceiveProps(props) {
    const { market, dispatch } = this.props
    const { selectedPair } = props
    for (let i = 0; i < market.length; i++) {
      const item = market[i]
      if (item.currency.id === selectedPair.currency.id
        && item.goods.id === selectedPair.goods.id) {
        if (item !== selectedPair) {
          dispatch(exchange.updatePair(item))
        }
        break
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change',
      nextAppState => this._handleAppStateChange(nextAppState))
    if (this.timeId) {
      clearInterval(this.timeId)
      this.timeId = null
    }
  }

  _handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.refreshData()
    }
  }

  checkUpdate() {
    const currentVersion = packageJson.jsVersion
    HotUpdate.setValueToUserStand(currentVersion, 'build', () => { })
    const url = `http://192.168.1.165:8989/update/${currentVersion}/${common.IsIOS ? 'ios' : 'android'}`
    fetch(url)
      .then(r => r.json())
      .then((r) => {
        if (r.version.toString() !== currentVersion.toString()) {
          const options = {
            zipPath: r.url,
            isAbort: false,
          }
          HotUpdate.downLoadBundleZipWithOption(options, () => {
            Alert.alert(
              '检测到新版本',
              '',
              [
                {
                  text: '立即更新',
                  onPress: () => HotUpdate.killApp(),
                },
                {
                  text: '取消',
                  onPress: () => {},
                },
              ],
            )
          })
        }
      })
      .catch((e) => { })
  }

  refreshData() {
    const { dispatch } = this.props
    dispatch(actions.requestBanners(schemas.findBanners()))
    dispatch(actions.requestAnnouncements(schemas.findAnnouncement()))
    dispatch(actions.requestMarket())
  }

  marketPress(rd) {
    const { navigation, dispatch } = this.props
    dispatch(exchange.updatePair(rd))
    navigation.navigate('Deal')
  }

  menuBtnPress = (i) => {
    const { navigation, user } = this.props
    const navigateKeys = ['Recharge', 'Withdraw', 'Orders', 'Orders']
    if (!user) {
      navigation.navigate('LoginStack')
    } else if (i === 2) {
      navigation.navigate('Orders', {
        title: '当前委托',
      })
    } else if (i === 3) {
      navigation.navigate('Orders', {
        title: '历史委托',
      })
    } else {
      navigation.navigate(navigateKeys[i])
    }
  }

  renderMenuBtns = () => {
    const btnTitles = ['充值', '提现', '当前委托', '历史委托']
    const menuBtns = []
    const icons = [
      require('../../assets/recharge.png'),
      require('../../assets/recharge2.png'),
      require('../../assets/currentDelegate.png'),
      require('../../assets/history_delegate.png'),
    ]

    for (let i = 0; i < btnTitles.length; i++) {
      menuBtns.push(
        <TKButton
          key={i}
          titleStyle={{ color: common.textColor }}
          theme={'home-balance'}
          caption={btnTitles[i]}
          icon={icons[i]}
          onPress={() => this.menuBtnPress(i)}
        />,
      )
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {menuBtns}
      </View>
    )
  }

  renderRefreshControl = () => {
    const { announcementsLoading, bannersLoading } = this.props
    return (
      <RefreshControl
        onRefresh={() => this.refreshData()}
        refreshing={
          !!((bannersLoading || announcementsLoading))
        }
        colors={[common.textColor]}
        progressBackgroundColor={common.navBgColor}
        progressViewOffset={0}
        tintColor={common.textColor}
      />
    )
  }

  render() {
    const { announcements, banners, market, navigation } = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <ScrollView
          refreshControl={this.renderRefreshControl()}
          showsVerticalScrollIndicator={false}
        >
          <HomeSwiper
            banners={banners}
            announcements={announcements}
            onPress={(e) => {
              navigation.navigate(e.type, { element: e.element })
            }}
          />

          {this.renderMenuBtns()}

          <HomeMarket
            data={market}
            onPress={rd => this.marketPress(rd)}
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.home,
    selectedPair: store.exchange.selectedPair,
    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Home)
