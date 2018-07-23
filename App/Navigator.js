import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import {
  Image,
  Animated,
  StyleSheet,
} from 'react-native'
import deviceInfo from 'react-native-device-info'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import {
  common,
} from './constants/common'
import cache from './utils/cache'

import Home from './views/home/Home'
import Banner from './views/home/Banner'
import Announcement from './views/home/Announcement'
import Market from './views/market/Market'
import Deal from './views/transactions/Deal'
import Orders from './views/transactions/Orders'
import History from './views/balance/History'
import Withdraw from './views/balance/Withdraw'
import Recharge from './views/balance/Recharge'
import AddAddress from './views/balance/AddAddress'
import Me from './views/me/Me'
import Authentication from './views/me/Authentication'
import SecurityCenter from './views/me/SecurityCenter'
import Rebates from './views/me/Rebates'
import UpdateEmail from './views/me/UpdateEmail'
import Settings from './views/me/Settings'
import Language from './views/me/Language'
import UpdatePassword from './views/me/UpdatePassword'
import Otc from './views/legalDeal/Otc'
import OtcDetail from './views/legalDeal/OtcDetail'
import ReceiverInfo from './views/legalDeal/ReceiverInfo'
import Payment from './views/legalDeal/Payment'
import UpdateBank from './views/legalDeal/UpdateBank'
import ScanBarCode from './views/balance/ScanBarCode'
import KLineFullScreen from './views/transactions/KLineFullScreen'

import Balance from './views/balance/Balance'
import BalanceDetail from './views/balance/BalanceDetail'

import DismissableStackNavigator from './DismissableStackNavigator'
import Login from './views/login/Login'
import Register from './views/login/Register'
import ForgotPwd from './views/login/ForgotPwd'
import ConfirmPwd from './views/login/ConfirmPwd'
import Agreement from './views/login/Agreement'
import transfer from './localization/utils'

let systemLanguage = 'en'
const evt = deviceInfo.getDeviceLocale()
if (evt.indexOf('zh') > -1) {
  systemLanguage = 'zh_cn'
}

const styles = StyleSheet.create({
  tabBarIcon: {
    height: common.h20,
    width: common.h20,
  },
})

const tabBarIcon = ({ focused, focusedSource, customSource }) => (
  <Image
    style={styles.tabBarIcon}
    source={focused ? focusedSource : customSource}
  />
)

const TabBar = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        tabBarLabel: transfer(systemLanguage, 'homeTab'),
        tabBarIcon: ({ focused }) => tabBarIcon({
          focused,
          focusedSource: require('./assets/home_selected.png'),
          customSource: require('./assets/home.png'),
        }),
      },
    },
    Market: {
      screen: Market,
      navigationOptions: {
        tabBarLabel: transfer(systemLanguage, 'marketTab'),
        tabBarIcon: ({ focused }) => tabBarIcon({
          focused,
          focusedSource: require('./assets/market_selected.png'),
          customSource: require('./assets/market.png'),
        }),
      },
    },
    Otc: {
      screen: Otc,
      navigationOptions: {
        tabBarLabel: transfer(systemLanguage, 'otcTab'),
        tabBarIcon: ({ focused }) => tabBarIcon({
          focused,
          focusedSource: require('./assets/transaction_yellow.png'),
          customSource: require('./assets/transaction_white.png'),
        }),
      },
    },
    Balance: {
      screen: Balance,
      navigationOptions: {
        tabBarLabel: transfer(systemLanguage, 'balancesTab'),
        tabBarIcon: ({ focused }) => tabBarIcon({
          focused,
          focusedSource: require('./assets/personal_funds_selected.png'),
          customSource: require('./assets/personal_funds.png'),
        }),
      },
    },
    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: transfer(systemLanguage, 'accountTab'),
        tabBarIcon: ({ focused }) => tabBarIcon({
          focused,
          focusedSource: require('./assets/me_selected.png'),
          customSource: require('./assets/me.png'),
        }),
      },
    },
  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: common.btnTextColor,
      inactiveTintColor: common.placeholderColor,
      style: {
        backgroundColor: common.navBgColor,
      },
      labelStyle: {
        marginTop: 0,
        marginBottom: common.IsIOS ? common.margin5 : 0,
        width: common.sw / 5,
        fontSize: common.font12,
      },
      indicatorStyle: {
        height: 0,
      },
    },
  },
)

const TransitionConfiguration = () => ({
  transitionSpec: {
    timing: Animated.timing,
    duration: cache.getObject('duration') || 250,
  },
  screenInterpolator: (sceneProps) => {
    const { scene } = sceneProps
    const { route } = scene
    const params = route.params || {}
    const transition = params.transition || 'forHorizontal'
    return CardStackStyleInterpolator[transition](sceneProps)
  },
})

const TabBarStack = StackNavigator(
  {
    TabBar,
    Deal: {
      screen: Deal,
      navigationOptions: {
        header: null,
      },
    },
    Market2: { screen: Market },
    Orders,
    ScanBarCode,
    History,
    Withdraw,
    Recharge,
    AddAddress,
    Authentication,
    Settings,
    Language,
    UpdatePassword,
    Otc,
    OtcDetail,
    ReceiverInfo,
    Payment,
    UpdateBank,
    Banner,
    BalanceDetail,
    Announcement,
    SecurityCenter,
    UpdateEmail,
    KLineFullScreen: {
      screen: KLineFullScreen,
      navigationOptions: {
        header: null,
      },
    },
    Rebates: {
      screen: Rebates,
    },
  }, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: common.font16,
      },
      // headerLeft: <View />,
      // headerRight: <View />,
    },
    headerMode: 'screen',
    transitionConfig: TransitionConfiguration,
  },
)

const LoginStack = DismissableStackNavigator(
  {
    Login,
    Register,
    ForgotPwd,
    ConfirmPwd,
    Agreement,
  }, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: common.font16,
      },
      // headerLeft: <View />,
      // headerRight: <View />,
    },
    headerMode: 'screen',
    transitionConfig: TransitionConfiguration,
  })
const loginStackDefaultGetStateForAction = LoginStack.router.getStateForAction
LoginStack.router.getStateForAction = (action, state) => {
  if (state && action.type === 'Navigation/BACK' && action.key) {
    const backRoute = state.routes.find(route => route.routeName === action.key)
    if (backRoute) {
      const backRouteIndex = state.routes.indexOf(backRoute)
      const purposeState = {
        ...state,
        routes: state.routes.slice(0, backRouteIndex + 1),
        index: backRouteIndex,
      }
      return purposeState
    }
  }
  return loginStackDefaultGetStateForAction(action, state)
}

const RootStack = StackNavigator(
  {
    TabBarStack: {
      screen: TabBarStack,
      navigationOptions: {
        header: null,
      },
    },
    LoginStack: {
      screen: LoginStack,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  }, {
    mode: 'modal',
  })

export default RootStack
