import { StackNavigator } from 'react-navigation'
import Tabbar from './tabbar'
import Login from './views/login/Login'
import Registration from './views/login/Registration'
import ForgotPwd from './views/login/ForgotPwd'
import ConfirmPwd from './views/login/ConfirmPwd'
import Me from './views/me/Me'
import Settings from './views/me/Settings'
import SetPwd from './views/me/SetPwd'
import Authentication from './views/me/Authentication'

export default StackNavigator(
  {
    Tabbar: {
      screen: Tabbar,
      navigationOptions: {
        header: null,
      },
    },
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
    Me: {
      screen: Me,
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
