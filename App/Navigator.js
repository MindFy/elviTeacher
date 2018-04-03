import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'
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

const TabBar = TabNavigator(
  {
    Home: { screen: Home, navigationOptions: { header: null } },
    Market: { screen: Market },
    Transaction: { screen: Transactions },
    Balance: { screen: Balance },
    Me: { screen: Me },
  },
)

const RootStack = StackNavigator({
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

const RootNavigator = RootStack

export default RootNavigator
