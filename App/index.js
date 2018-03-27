import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import Login from './login/Login'
import Registration from './login/Registration'
import ForgotPwd from './login/ForgotPwd'
import ConfirmPwd from './login/ConfirmPwd'
import Mine from './me/Mine'
import Settings from './me/Settings'
import SetPwd from './me/SetPwd'
import Authentication from './me/Authentication'

const Nav = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Registration: {
      screen: Registration,
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
    Mine: {
      screen: Mine,
      navigationOptions: {
        header: null,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },
    SetPwd: {
      screen: SetPwd,
      navigationOptions: {
        header: null,
      },
    },
    Authentication: {
      screen: Authentication,
      navigationOptions: {
        header: null,
      },
    },
  }, {
    initialRouteName: 'Login',
  },
)

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Nav />
    )
  }
}
