import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import {
  Image,
} from 'react-native'
import {
  common,
} from './constants/common'

import Home from './views/home/Home'
import Buttons from './views/home/Buttons'
import Banner from './views/home/Banner'
import Announcement from './views/home/Announcement'
import Market from './views/market/Market'
import Transactions from './views/transactions/Transactions'
import Detail from './views/transactions/Detail'
import Delegate from './views/transactions/Delegate'
import Balance from './views/balance/Balance'
import History from './views/balance/History'
import Cash from './views/balance/Cash'
import Withdraw from './views/balance/Withdraw'
import Recharge from './views/balance/Recharge'
import AddAddress from './views/balance/AddAddress'
import Me from './views/me/Me'
import Authentication from './views/me/Authentication'
import SecurityCenter from './views/me/SecurityCenter'
import Rebates from './views/me/Rebates'
import UpdateEmail from './views/me/UpdateEmail'
import Settings from './views/me/Settings'
import UpdatePassword from './views/me/UpdatePassword'
import LegalDeal from './views/legalDeal/LegalDeal'
import LegalDealDetail from './views/legalDeal/LegalDealDetail'
import Payment from './views/legalDeal/Payment'
import UpdateBank from './views/legalDeal/UpdateBank'

import DismissableStackNavigator from './DismissableStackNavigator'
import Login from './views/login/Login'
import Register from './views/login/Register'
import ForgotPwd from './views/login/ForgotPwd'
import ConfirmPwd from './views/login/ConfirmPwd'
import Agreement from './views/login/Agreement'

const TabBar = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: common.h20,
              width: common.h20,
            }}
            source={focused ? require('./assets/首页.png') : require('./assets/首页copy2.png')}
          />
        ),
      },
    },
    Market: {
      screen: Market,
      navigationOptions: {
        tabBarLabel: '市场',
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: common.h20,
              width: common.h20,
            }}
            source={focused ? require('./assets/市场selected.png') : require('./assets/市场分析.png')}
          />
        ),
      },
    },
    LegalDeal: {
      screen: LegalDeal,
      navigationOptions: {
        tabBarLabel: '法币交易',
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: common.h20,
              width: common.h20,
            }}
            source={focused ? require('./assets/交易copy2.png') : require('./assets/交易.png')}
          />
        ),
      },
    },
    Balance: {
      screen: Balance,
      navigationOptions: {
        tabBarLabel: '资金',
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: common.h20,
              width: common.h20,
            }}
            source={focused ? require('./assets/个人资金copy.png') : require('./assets/个人资金.png')}
          />
        ),
      },
    },
    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: common.h20,
              width: common.h20,
            }}
            source={focused ? require('./assets/我的copy4.png') : require('./assets/我的.png')}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: common.btnTextColor,
      inactiveTintColor: common.placeholderColor,
      style: {
        backgroundColor: common.navBgColor,
      },
      labelStyle: {
        fontSize: common.font12,
      },
      indicatorStyle: {
        height: 0,
      },
    },
  },
)

const TabBarStack = StackNavigator({
  TabBar,
  Detail: {
    screen: Detail,
    navigationOptions: {
      header: null,
    },
  },
  Delegate,
  History,
  Withdraw,
  Recharge,
  AddAddress,
  Authentication,
  Settings,
  UpdatePassword,
  LegalDeal,
  LegalDealDetail,
  Payment,
  UpdateBank,
  Transactions,
  Banner,
  Announcement,
  SecurityCenter,
  UpdateEmail,
  Rebates: {
    screen: Rebates,
    navigationOptions: {
      // header: null,
    },
  },
  Buttons,
})

const LoginStack = DismissableStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPwd: {
    screen: ForgotPwd,
    navigationOptions: {
      header: null,
    },
  },
  ConfirmPwd: {
    screen: ConfirmPwd,
    navigationOptions: {
      header: null,
    },
  },
  Agreement: {
    screen: Agreement,
  },
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

const RootStack = StackNavigator({
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
    },
  },
}, {
  mode: 'modal',
})

export default RootStack
