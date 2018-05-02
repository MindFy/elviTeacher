import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../../constants/common'

export default class Payment extends Component {
  static navigationOptions(props) {
    const { navigation } = props
    return {
      headerTitle: navigation.state.params.data.direct === common.buy ? '付款信息' : '收款信息',
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
    const { navigation } = this.props
    const rd = navigation.state.params.data
    let titleName = ''
    let titleBankName = ''
    let titleBankNo = ''
    let name = ''
    let bankName = ''
    let bankNo = ''
    let remark = ''
    let price = 0
    if (rd.direct === common.buy) {
      name = rd.traderPayinfo.name
      bankName = rd.traderPayinfo.bankName
      bankNo = rd.traderPayinfo.bankNo
      remark = rd.traderPayinfo.remark
      titleName = '收款方户名'
      titleBankName = '收款方开户行'
      titleBankNo = '收款方账号'
      price = rd.dealPrice
    } else if (rd.direct === common.sell) {
      name = rd.createrPayinfo.name
      bankName = rd.createrPayinfo.bankName
      bankNo = rd.createrPayinfo.bankNo
      remark = rd.createrPayinfo.remark
      titleName = '汇款方户名'
      titleBankName = '汇款方开户行'
      titleBankNo = '汇款方账号'
      price = 0.99
    }
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.blackColor,
        }}
      >
        <Text
          style={{
            marginTop: common.margin15,
            fontSize: common.font16,
            color: common.placeholderColor,
            alignSelf: 'center',
          }}
        >转账金额</Text>
        <Text
          style={{
            marginTop: common.margin20,
            fontSize: common.font30,
            color: common.textColor,
            alignSelf: 'center',
          }}
        >{`¥${common.bigNumber.multipliedBy(price, rd.quantity)}`}</Text>

        <View
          style={{
            marginTop: common.margin15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >{titleName}</Text>
          <Text
            style={{
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{name}</Text>
        </View>
        <View
          style={{
            marginTop: common.margin15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >{titleBankName}</Text>
          <Text
            style={{
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{bankName}</Text>
        </View>
        <View
          style={{
            marginTop: common.margin15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >{titleBankNo}</Text>
          <Text
            style={{
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{bankNo}</Text>
        </View>
        <View
          style={{
            marginTop: common.margin15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >备注信息</Text>
          <Text
            style={{
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{`${remark}（请务必填写）`}</Text>
        </View>

        <Text
          style={{
            marginTop: common.margin30,
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font12,
          }}
        >温馨提示</Text>
        <Text
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            color: common.textColor,
            fontSize: common.font10,
            lineHeight: 14,
          }}
        >{'1. 买卖商户均为实地考察认证商户，并提供100万usdt保证金，您每次兑换会冻结商户资产，商户资产不够时，不能接单，可放心兑换；\n2. 买卖商户均为实名认证商户，可放心兑换；\n3. 请使用本人绑定的银行卡进行汇款，其他任何方式汇款都会退款。（禁止微信和支付宝）'}</Text>
      </ScrollView>
    )
  }
}
