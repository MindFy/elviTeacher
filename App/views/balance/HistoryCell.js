import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'

export default class History extends Component {
  componentDidMount() { }
  render() {
    const { rd, rechargeOrWithdraw } = this.props
    const btnTitleColor = rd.status === '待审核' ? common.btnTextColor : common.placeholderColor
    const btnDisabled = rd.status !== '待审核'
    return (
      <View style={{
        marginTop: common.margin10,
        marginLeft: common.margin10,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >{rd.createdAt}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >{rd.token.name}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >{rd.amount}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >{rd.status}</Text>
        {
          rechargeOrWithdraw === common.withdraw ?
            <TouchableOpacity
              onPress={() => { }}
              disabled={btnDisabled}
            >
              <Text
                style={{
                  color: btnTitleColor,
                  fontSize: common.font12,
                }}
              >撤单</Text>
            </TouchableOpacity> : null
        }
      </View>
    )
  }
}
