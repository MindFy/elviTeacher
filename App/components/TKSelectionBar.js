import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

export default class TKSelectionBar extends Component {
  componentDidMount() { }

  render() {
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h40,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => {
            dispatch(actions.rechargeOrWithdrawUpdate({
              rechargeOrWithdraw: common.recharge,
            }))
          }}
        >
          <View
            style={{
              flex: 1,
              width: (common.sw - common.margin10 * 2) / 2,
              backgroundColor: common.navBgColor,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: common.font14,
                alignSelf: 'center',
                color: (rechargeOrWithdraw === common.recharge ?
                  common.btnTextColor : common.textColor),
              }}
            >充值记录</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => {
            dispatch(actions.rechargeOrWithdrawUpdate({
              rechargeOrWithdraw: common.withdraw,
            }))
          }}
        >
          <View
            style={{
              flex: 1,
              width: (common.sw - common.margin10 * 2) / 2,
              backgroundColor: common.navBgColor,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: common.font14,
                alignSelf: 'center',
                color: (rechargeOrWithdraw === common.withdraw ?
                  common.btnTextColor : common.textColor),
              }}
            >提现记录</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}