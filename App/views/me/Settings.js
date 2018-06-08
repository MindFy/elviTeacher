import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import MeCell from './MeCell'

class Settings extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '设置',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          <TouchableOpacity
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/arrow_left_left.png')}
            />
          </TouchableOpacity>
        ),
    }
  }
  componentDidMount() { }
  render() {
    const { navigation, loggedIn } = this.props
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />

        <MeCell
          viewStyle={{
            marginTop: common.margin10,
          }}
          leftImageHide
          onPress={() => {
            if (loggedIn) navigation.navigate('UpdatePassword')
            else navigation.navigate('LoginStack')
          }}
          title="修改密码"
        />
        <MeCell
          leftImageHide
          rightImageHide
          onPress={() => { }}
          title="V 1.0.0"
        />

      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authorize.loggedIn,
  }
}

export default connect(
  mapStateToProps,
)(Settings)
