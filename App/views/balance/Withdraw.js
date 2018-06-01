import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import {
  Toast,
  Overlay,
  ActionSheet,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import SelectToken from './SelectToken'
import {
  coinSelected,
  toggleForm,
  requestCoinList,
  requestCoinListSucceed,
  requestCoinListFailed,
  updateForm,
} from '../../actions/withdraw'
import schemas from '../../schemas/index'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'

class WithDraw extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '提现',
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
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }

  showForm() {
    const { dispatch, user } = this.props

    dispatch(updateForm())
    dispatch(requestCoinList(user.id))
  }

  coinSelector() {
    const { currCoin, listToggled } = this.props

    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.showForm()}
      >
        <View
          style={{
            marginTop: common.margin10,
            height: common.h40,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{currCoin}</Text>
          <View
            style={{
              alignSelf: 'center',
            }}
          >
            <Image
              style={listToggled ? {
                width: common.h20,
                height: common.w10,
              } : {
                marginRight: common.margin10,
                height: common.h20,
                width: common.w10,
              }}
              source={(listToggled ?
                require('../../assets/下拉--向下.png') :
                require('../../assets/下拉--向右.png'))}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  form() {
    const {
      balance,
      currCoin,
      formState,
      minAmount,
      fee,
      dispatch,
    } = this.props

    return ['ETC', 'BTC', 'ETH'].includes(currCoin) ? (
      (
        <View>
          <Text style={{
            marginTop: common.margin22,
            fontSize: common.font16,
            color: common.placeholderColor,
            alignSelf: 'center',
          }}
          >可用</Text>
          <Text style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            fontSize: common.font30,
            alignSelf: 'center',
            textAlign: 'center',
            color: 'white',
          }}
          >{balance}</Text>
          {
            (['ETC', 'BTC', 'ETH'].includes(currCoin))
              ? <View>
                <TKInputItem
                  viewStyle={{
                    marginTop: common.margin35,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h35,
                  }}
                  inputStyle={{
                    textAlign: 'center',
                  }}
                  placeholder="提现金额"
                  value={formState.withDrawAmount}
                  onChangeText={withDrawAmount => dispatch(updateForm({
                    ...formState,
                    withDrawAmount,
                  }))}
                />

                <View
                  style={{
                    marginTop: common.margin5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      marginLeft: common.margin10,
                      color: common.textColor,
                      fontSize: common.font12,
                      alignSelf: 'center',
                    }}
                  >{`手续费：${fee}${currCoin}`}</Text>
                  <Text
                    style={{
                      marginRight: common.margin10,
                      marginLeft: common.margin10,
                      color: common.textColor,
                      fontSize: common.font12,
                      alignSelf: 'center',
                    }}
                  >{formState.withDrawAmount.length ? `实际到账：${formState.withDrawAmount - fee}${currCoin}` : 0}</Text>
                </View>

                <TKInputItem
                  viewStyle={{
                    marginTop: common.margin30,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h35,
                  }}
                  inputStyle={{
                    textAlign: 'center',
                  }}
                  placeholder="地址"
                  value={formState.withDrawAddress}
                  onChangeText={withDrawAddress => dispatch(updateForm({
                    ...formState,
                    withDrawAddress,
                  }))}
                  extra={() => (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                      }}
                      activeOpacity={common.activeOpacity}
                      onPress={() => this.showActionSheets()}
                    >
                      <Image
                        style={{
                          width: common.w20,
                          height: common.w20,
                        }}
                        source={require('../../assets/二维码.png')}
                      />
                    </TouchableOpacity>
                  )}
                />

                <TKButton
                  style={{ marginTop: common.margin40 }}
                  onPress={() => this.withdrawPress()}
                  theme={'gray'}
                  caption={'提现'}
                />
                <Text
                  style={{
                    marginTop: common.margin10,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    color: common.textColor,
                    fontSize: common.font12,
                    lineHeight: common.h15,
                  }}
                >温馨提示:</Text>
                <Text
                  style={{
                    marginTop: common.margin10,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    color: common.textColor,
                    fontSize: common.font10,
                    lineHeight: common.h15,
                  }}
                >{`1. 最小提币数量为：${minAmount} ${currCoin}
2. 最大提币数量为：未身份认证：单日限1 BTC或等额其他币种， 已身份认证：单日限50 BTC或等额其他币种`}</Text>
              </View> : null
          }
        </View>
      )
    ) : null
  }

  withdrawPress() {

  }

  renderCoinList() {
    const { dispatch, currCoin, listToggled, coinList } = this.props

    return !listToggled ? null : coinList.map(ele => (
      <TouchableOpacity
        key={ele}
        activeOpacity={common.activeOpacity}
        onPress={() => {
          dispatch(coinSelected(ele))
        }}
      >
        <View
          style={{
            marginTop: common.margin5,
            height: common.h40,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{ele}</Text>
        </View>
      </TouchableOpacity>
    ))
  }

  render() {
    const {
      dispatch,
      listToggled,
      currCoin,
    } = this.props

    const coinSelector = this.coinSelector()
    const coinList = this.renderCoinList()
    const form = this.form()

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          {coinSelector}
          {coinList}
          {form}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.withdraw,
    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(WithDraw)
