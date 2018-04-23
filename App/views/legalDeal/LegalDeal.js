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

export default class LegalDeal extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '法币',
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
      headerRight:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.navigate('LegalDealDetail')}
          >
            <Text
              style={{
                marginRight: common.margin10,
                fontSize: common.font16,
                color: 'white',
              }}
            >明细</Text>
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
