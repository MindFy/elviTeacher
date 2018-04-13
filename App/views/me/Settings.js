import React, { Component } from 'react'
import {
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import MeCell from './MeCell'

export default class Settings extends Component {
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
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }
  componentDidMount() { }
  render() {
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
          onPress={() => this.props.navigation.navigate('UpdatePassword')}
          title="修改密码"
        />
        <MeCell
          leftImageHide
          onPress={() => {}}
          title="语言选择"
        />
        <MeCell
          leftImageHide
          onPress={() => {}}
          title="版本显示"
        />

      </ScrollView>
    )
  }
}
