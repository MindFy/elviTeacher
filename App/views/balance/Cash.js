import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import {
  ActionSheet,
} from 'teaset'
import { common } from '../../constants/common'
import SelectToken from './SelectToken'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Cash extends Component {
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
  constructor() {
    super()

    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    dispatch(actions.findAddress(schemas.findAddress(user.id)))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.selectTokenUpdate({
      selectedToken: common.selectedTokenDefault,
      tokenListSelected: false,
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, cashAccount, currentAddress } = this.props

    if (tag === 'cashAccount') {
      const temp = isNaN(Number(text)) ? 0 : Number(text)
      dispatch(actions.cashAccountUpdate({ cashAccount: temp, currentAddress }))
    } else if (tag === 'currentAddress') {
      dispatch(actions.cashAccountUpdate({ cashAccount, currentAddress: text }))
    }
  }

  selectAddress(element) {
    const { dispatch, cashAccount } = this.props
    dispatch(actions.cashAccountUpdate({
      cashAccount,
      currentAddress: element.withdrawaddr,
    }))
  }

  showActionSheets() {
    const { address } = this.props
    const items = []
    for (let i = 0; i < address.length; i++) {
      const element = address[i]
      items.push({
        title: element.withdrawaddr,
        onPress: () => this.selectAddress(element),
      })
    }
    items.push({
      title: '+添加新地址',
      onPress: () => this.addAddressPress(),
    })
    const cancelItem = { title: '取消' }
    ActionSheet.show(items, cancelItem)
  }

  addAddressPress() {
    const { selectedToken } = this.props
    this.props.navigation.navigate('AddAddress', { selectedToken })
  }

  renderRow(rd) {
    return (
      <View
        style={{
          marginTop: common.margin35,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h35,
          borderWidth: 1,
          borderRadius: 1,
          borderColor: common.borderColor,
          backgroundColor: common.navBgColor,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >{rd.withdrawaddr}</Text>
      </View>
    )
  }

  renderBottomView() {
    const { selectedToken, dispatch, cashAccount, currentAddress } = this.props
    if (selectedToken !== common.selectedTokenDefault) {
      let charge = 0
      if (selectedToken.token.name === common.token.BTC) {
        charge = common.payment.charge.BTC
      } else if (selectedToken.token.name === common.token.ETH) {
        charge = common.payment.charge.ETH
      }
      const actualAccount = common.bigNumber.multipliedBy(cashAccount, 1 - charge)
      return (
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
            fontSize: common.font30,
            alignSelf: 'center',
            color: 'white',
          }}
          >{selectedToken.amount}</Text>
          {
            (selectedToken.token.name === common.token.BTC
              || selectedToken.token.name === common.token.ETH)
              ? <View>
                <TextInput
                  style={{
                    marginTop: common.margin35,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h35,
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: common.borderColor,
                    backgroundColor: common.navBgColor,
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: common.font12,
                    color: 'white',
                  }}
                  placeholder="提现金额"
                  placeholderTextColor={common.placeholderColor}
                  value={cashAccount === 0 ? '' : `${cashAccount}`}
                  onChange={e => this.onChange(e, 'cashAccount')}
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
                  >{`手续费：${charge}${selectedToken.token.name}`}</Text>
                  <Text
                    style={{
                      marginRight: common.margin10,
                      marginLeft: common.margin10,
                      color: common.textColor,
                      fontSize: common.font12,
                      alignSelf: 'center',
                    }}
                  >{`实际到账：${actualAccount}${selectedToken.token.name}`}</Text>
                </View>

                <View
                  style={{
                    marginTop: common.margin30,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    borderColor: common.borderColor,
                    borderWidth: 1,
                    borderRadius: 1,
                    backgroundColor: common.navBgColor,
                    height: common.h35,
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    style={{
                      fontSize: common.font12,
                      textAlign: 'center',
                      color: 'white',
                    }}
                    placeholder={'地址'}
                    placeholderTextColor={common.placeholderColor}
                    value={currentAddress}
                    onChange={e => this.onChange(e, 'currentAddress')}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: common.margin10,
                      alignSelf: 'center',
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
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: common.margin40,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h40,
                    backgroundColor: common.navBgColor,
                    justifyContent: 'center',
                  }}
                  activeOpacity={common.activeOpacity}
                  onPress={() => {
                    dispatch(actions.withdraw({
                      token_id: selectedToken.token.id,
                      amount: cashAccount,
                      toaddr: currentAddress,
                    }))
                  }}
                >
                  <Text
                    style={{
                      color: common.btnTextColor,
                      fontSize: common.font14,
                      alignSelf: 'center',
                    }}
                  >提现</Text>
                </TouchableOpacity>
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
                >{`1. 最小提币数量为：${charge} ${selectedToken.token.name}
2. 最大提币数量为：未身份认证：单日限1 ${selectedToken.token.name}或等额其他币种， 已身份认证：单日限50 ${selectedToken.token.name}或等额其他币种
3. 为保障资金安全，请务必确认电脑及浏览器安全，防止信息被篡改或泄露。`}</Text>
              </View> : null
          }
        </View>
      )
    }
    return null
  }
  render() {
    const { dispatch, selectedToken, asset, tokenListSelected } = this.props
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <StatusBar barStyle={'light-content'} />
        <ScrollView>
          <SelectToken
            asset={asset}
            selectedToken={selectedToken}
            tokenListSelected={tokenListSelected}
            dispatch={dispatch}
            selectedTokenBlock={() => { }}
          />

          {this.renderBottomView()}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    asset: store.asset.asset,

    address: store.address.address,
    selectedToken: store.address.selectedToken,
    tokenListSelected: store.address.tokenListSelected,

    cashAccount: store.ui.cashAccount,
    currentAddress: store.ui.currentAddress,
  }
}

export default connect(
  mapStateToProps,
)(Cash)
