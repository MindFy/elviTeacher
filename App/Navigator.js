import { StackNavigator, TabNavigator } from 'react-navigation'
import Home from './views/home/Home'
import Detail from './views/home/Detail'
import Market from './views/market/Market'
import Transactions from './views/transactions/Transactions'
import Consignation from './views/transactions/Consignation'
import Balance from './views/balance/Balance'
import History from './views/balance/History'
import Cash from './views/balance/Cash'
import Recharge from './views/balance/Recharge'
import AddAddress from './views/balance/AddAddress'
import Me from './views/me/Me'
import Authentication from './views/me/Authentication'
import Settings from './views/me/Settings'
import SetPwd from './views/me/SetPwd'

import DismissableStackNavigator from './DismissableStackNavigator'
import Login from './views/login/Login'
import Register from './views/login/Register'
import ForgotPwd from './views/login/ForgotPwd'
import ConfirmPwd from './views/login/ConfirmPwd'

const TabBar = TabNavigator(
  {
    Home: { screen: Home, navigationOptions: { header: null } },
    Market: { screen: Market },
    Transaction: { screen: Transactions },
    Balance: { screen: Balance },
    Me: { screen: Me },
  },
)

const TabBarStack = StackNavigator({
  TabBar,
  Detail,
  Consignation,
  History,
  Cash,
  Recharge,
  AddAddress,
  Authentication,
  Settings,
  SetPwd,
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
})

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
