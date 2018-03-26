import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import Login from './login'
import Registration from './registration'
import ForgotPwd from './forgotPwd'
import ConfirmPwd from './confirmPwd'

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
  }, {
    initialRouteName: 'Login',
  },
)

export default class UserSystem extends Component {
  componentDidMount() {}
  render() {
    return (
      <Nav />
    )
  }
}
