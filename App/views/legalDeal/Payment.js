import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../common'

export default class Payment extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '付款/收款信息',
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
      <View />
    )
  }
}
