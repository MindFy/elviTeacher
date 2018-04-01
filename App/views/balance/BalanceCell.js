import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import { common } from '../common'

export default class BalanceCell extends Component {
  componentDidMount() { }
  render() {
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h40,
          backgroundColor: common.borderColor,
          borderRadius: common.radius6,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            style={{
              marginLeft: common.margin15,
              height: common.w20,
              width: common.w20,
              alignSelf: 'center',
            }}
            source={this.props.leftImageSource}
          />
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{this.props.title}</Text>
        </View>

        <Text
          style={{
            marginRight: common.margin15,
            fontSize: common.font14,
            color: common.textColor,
            alignSelf: 'center',
          }}
        >{this.props.detail}</Text>
      </View>
    )
  }
}
