import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import {
  common,
} from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class LegalDealDetail extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '交易订单',
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
    this.showGetVerificateCodeResponse = false
  }

  componentDidMount() {
    this.onHeaderRefresh()
    this.listener = DeviceEventEmitter.addListener(common.confirmPayNoti, () => {
      Overlay.hide(this.overlayViewKey)
    })
  }

  componentWillUnmount() {
    const { dispatch, mobile, password, passwordAgain } = this.props
    dispatch(actions.registerUpdate({ mobile, code: '', password, passwordAgain }))
    dispatch(actions.skipLegalDealUpdate({
      skip: 0,
      refreshState: RefreshState.Idle,
    }))
    this.listener.remove()
  }

  onHeaderRefresh() {
    const { dispatch, user } = this.props
    if (user) {
      dispatch(actions.findLegalDeal(schemas.findLegalDeal(user.id, 0, common.legalDeal.limit),
        RefreshState.HeaderRefreshing))
    }
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, password, passwordAgain } = this.props
    switch (tag) {
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password, passwordAgain }))
        break
      default:
        break
    }
  }

  showOverlay(id, rid) {
    const { dispatch, user, code, legalDeal } = this.props
    const overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <TKViewCheckAuthorize
          mobile={user.mobile}
          code={code}
          onChange={e => this.onChange(e, 'code')}
          codePress={(count) => {
            this.count = count
            dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => {
            if (!this.props.code.length) {
              Toast.message('请输入验证码')
              return
            }
            const temp = legalDeal.concat()
            temp[rid].status = common.legalDeal.status.complete
            dispatch(actions.confirmPay({ id, code: this.props.code }, temp))
          }}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        this.count()
        Toast.success(getVerificateCodeResponse.result.message, 2000, 'top')
      } else if (getVerificateCodeResponse.error.code === 4000101) {
        Toast.fail('手机号码或服务类型错误')
      } else if (getVerificateCodeResponse.error.code === 4000102) {
        Toast.fail('一分钟内不能重复发送验证码')
      } else if (getVerificateCodeResponse.error.code === 4000104) {
        Toast.fail('手机号码已注册')
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  renderRow(rd, rid) {
    const { navigation, dispatch, legalDeal } = this.props
    const createdAt = common.dfFullDate(rd.createdAt)
    let textColor = 'white'
    let status = ''
    let direct = ''
    let paymentBtnTitle = ''
    let secBtnTitle = ''
    let cancelBtnDisabled = true
    let confirmPayDisabled = true
    let havedPayDisabled = true
    let price = 0
    if (rd.direct === common.buy) {
      price = rd.dealPrice
      textColor = common.redColor
      direct = '买入'
      paymentBtnTitle = '付款信息'
      secBtnTitle = '确认付款'
    } else if (rd.direct === common.sell) {
      price = 0.99
      textColor = common.greenColor
      direct = '卖出'
      paymentBtnTitle = '收款信息'
      secBtnTitle = '我已收款'
    }
    switch (rd.status) {
      case common.legalDeal.status.waitpay:
        status = rd.direct === common.buy ? '待付款' : '待收款'
        cancelBtnDisabled = false
        havedPayDisabled = false
        break
      case common.legalDeal.status.waitconfirm:
        status = '待确认'
        confirmPayDisabled = false
        break
      case common.legalDeal.status.complete:
        status = '已完成'
        break
      case common.legalDeal.status.cancel:
        status = '已取消'
        break
      default:
        break
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          backgroundColor: common.navBgColor,
        }}
      >
        <View
          style={{
            height: common.h30,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: common.borderColor,
            borderBottomWidth: 0,
          }}
        >
          <Text
            style={{
              marginLeft: common.margin5,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{common.legalDeal.token}</Text>
          <TouchableOpacity
            style={{
              marginLeft: common.margin20,
            }}
            activeOpacity={common.activeOpacity}
          >
            <Text
              style={{
                color: textColor,
                fontSize: common.font12,
              }}
            >{direct}</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: common.margin20,
              color: common.textColor,
              fontSize: common.font10,
            }}
          >{createdAt}</Text>
          <Text
            style={{
              position: 'absolute',
              right: common.margin5,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{status}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                textAlign: 'center',
              }}
            >{`价格:¥${rd.dealPrice}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                textAlign: 'center',
              }}
            >{`数量:${rd.quantity} ${common.legalDeal.token}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                textAlign: 'center',
              }}
            >{`总价:¥${common.bigNumber.multipliedBy(price, rd.quantity)}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: common.margin10,
                alignSelf: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                navigation.navigate('Payment', {
                  data: rd,
                })
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >{paymentBtnTitle}</Text>
            </TouchableOpacity>
            {
              rd.direct === common.buy ?
                <TouchableOpacity
                  activeOpacity={common.activeOpacity}
                  style={{
                    marginTop: common.margin8,
                    alignSelf: 'center',
                  }}
                  disabled={cancelBtnDisabled}
                  onPress={() => {
                    legalDeal[rid].status = common.legalDeal.status.cancel
                    dispatch(actions.legalDealCancel({ id: rd.id }, legalDeal.concat()))
                  }}
                >
                  <Text
                    style={{
                      color: cancelBtnDisabled ? common.placeholderColor : common.btnTextColor,
                      fontSize: common.font10,
                    }}
                  >撤单</Text>
                </TouchableOpacity> : null
            }
            {
              rd.direct === common.buy
                ? <TouchableOpacity
                  activeOpacity={common.activeOpacity}
                  style={{
                    marginTop: common.margin8,
                    alignSelf: 'center',
                    marginBottom: common.margin10,
                  }}
                  disabled={havedPayDisabled}
                  onPress={() => {
                    legalDeal[rid].status = common.legalDeal.status.waitconfirm
                    dispatch(actions.havedPay({ id: rd.id }, legalDeal.concat()))
                  }}
                >
                  <Text
                    style={{
                      color: havedPayDisabled ? common.placeholderColor : common.btnTextColor,
                      fontSize: common.font10,
                    }}
                  >{secBtnTitle}</Text>
                </TouchableOpacity>
                : <TouchableOpacity
                  activeOpacity={common.activeOpacity}
                  style={{
                    marginTop: common.margin8,
                    alignSelf: 'center',
                    marginBottom: common.margin10,
                  }}
                  disabled={confirmPayDisabled}
                  onPress={() => {
                    this.showOverlay(rd.id, rid)
                  }}
                >
                  <Text
                    style={{
                      color: confirmPayDisabled ? common.placeholderColor : common.btnTextColor,
                      fontSize: common.font10,
                    }}
                  >{secBtnTitle}</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { dispatch, user, legalDeal, refreshState, skip } = this.props
    this.handleGetVerificateCodeRequest()

    return (
      <RefreshListView
        style={{
          backgroundColor: common.blackColor,
        }}
        data={legalDeal}
        renderItem={({ item, index }) => this.renderRow(item, index)}
        refreshState={refreshState}
        onHeaderRefresh={() => {
          if (refreshState !== RefreshState.NoMoreData
            || refreshState !== RefreshState.FooterRefreshing) {
            dispatch(actions.findLegalDeal(
              schemas.findLegalDeal(user.id, 0, common.legalDeal.limit)
              , RefreshState.HeaderRefreshing))
          }
        }}
        onFooterRefresh={() => {
          if (user && refreshState !== RefreshState.NoMoreData
            || refreshState !== RefreshState.HeaderRefreshing) {
            dispatch(actions.findLegalDeal(
              schemas.findLegalDeal(user.id, common.legalDeal.limit * skip, common.legalDeal.limit)
              , RefreshState.FooterRefreshing))
          }
        }}
        footerTextStyle={{
          color: common.textColor,
          fontSize: common.font14,
        }}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    skip: store.legalDeal.skip,
    legalDeal: store.legalDeal.legalDeal,
    refreshState: store.legalDeal.refreshState,

    user: store.user.user,

    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,
    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,
    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(LegalDealDetail)
