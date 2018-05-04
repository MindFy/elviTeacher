import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import actions from '../../actions/index'

class TransactionsTopBar extends Component {
  componentDidMount() { }

  topBarPress(b) {
    const { dispatch, buyOrSell } = this.props
    if (buyOrSell !== b) {
      dispatch(actions.buyOrSellUpdate(b))
      dispatch(actions.textInputDelegateUpdate({ price: 0, quantity: 0, amount: 0 }))
    }
  }

  render() {
    const { buyOrSell, navigation, user } = this.props

    return (
      <View
        style={{
          height: common.h32,
          backgroundColor: common.navBgColor,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flex: 1,
            paddingBottom: common.margin10,
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.topBarPress(true)}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: buyOrSell ? common.btnTextColor : common.textColor,
                textAlign: 'center',
              }}
            >买入</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingBottom: common.margin10,
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.topBarPress(false)}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: !buyOrSell ? common.btnTextColor : common.textColor,
                textAlign: 'center',
              }}
            >卖出</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            paddingBottom: common.margin10,
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => {
              if (!user) {
                navigation.navigate('LoginStack')
              } else {
                navigation.navigate('Delegate')
              }
            }}
          >
            <Text
              style={{
                marginRight: common.margin22,
                fontSize: common.font14,
                color: common.textColor,
                textAlign: 'right',
              }}
            >当前委托</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    buyOrSell: store.deal.buyOrSell,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(TransactionsTopBar)
