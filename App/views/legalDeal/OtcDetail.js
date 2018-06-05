import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import RefreshListView from 'react-native-refresh-list-view'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import {
  common,
} from '../../constants/common'
import {
  requestOtcList,
  requestGetCode,
  requestConfirmPay,
  updateForm,
} from '../../actions/otcDetail'
import schemas from '../../schemas/index'

class OtcDetail extends Component {
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
      headerLeft: (
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

  constructor() {
    super()
    this.skip = 0
    this.limit = 10
  }

  componentDidMount() {
    const { loggedInResult } = this.props
    this.refreshOtcList({
      id: loggedInResult.id,
      skip: this.skip,
      limit: this.limit,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
  }

  onChangeText(text, tag) {
    const { dispatch, formState } = this.props
    switch (tag) {
      case 'code':
        dispatch(updateForm({ ...formState, code: text }))
        break
      default:
        break
    }
  }

  confirmPress(id) {
    const { dispatch, formState } = this.props
    const { code } = formState
    if (!code.length) {
      Toast.message('请输入验证码')
      return
    }
    dispatch(requestConfirmPay({ id, code }))
  }

  refreshOtcList(data) {
    const { dispatch } = this.props
    dispatch(requestOtcList(schemas.findOtcList(data)))
  }

  showOverlay(id, rid) {
    const { dispatch, loggedInResult } = this.props
    const overlayView = (
      <Overlay.View
        style={{ justifyContent: 'center' }}
        modal={false}
        overlayOpacity={0}
      >
        <TKViewCheckAuthorize
          mobile={loggedInResult.mobile}
          onChangeText={e => this.onChangeText(e, 'code')}
          codePress={() => {
            dispatch(requestGetCode({ mobile: loggedInResult.mobile, service: 'auth' }))
          }}
          confirmPress={() => this.confirmPress(id, rid)}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  errors = {
    4000101: '手机号码或服务类型错误',
    4000102: '一分钟内不能重复发送验证码',
    4000104: '手机号码已注册',
  }

  handleRequestGetCode(nextProps) {
    const { getCodeResult, getCodeError } = nextProps

    if (getCodeResult && getCodeResult !== this.props.getCodeResult) {
      Toast.success(getCodeResult.message, 2000, 'top')
    }
    if (getCodeError && getCodeError !== this.props.getCodeError) {
      if (getCodeError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        const msg = this.errors[getCodeError.code]
        if (msg) Toast.fail(msg)
        else Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  keyExtractor = item => item.createdAt

  renderRow(rd, rid) {
    const { navigation } = this.props
    const createdAt = common.dfFullDate(rd.createdAt)
    let textColor = 'white'
    let status = ''
    let direct = ''
    let paymentBtnTitle = ''
    let secBtnTitle = ''
    let cancelBtnDisabled = true
    let confirmPayDisabled = true
    let havedPayDisabled = true
    const dealPrice = new BigNumber(rd.dealPrice).toFixed(2)
    const quantity = new BigNumber(rd.quantity).toFixed(2)
    const amount = new BigNumber(dealPrice).multipliedBy(quantity).toFixed(2, 1)
    if (rd.direct === common.buy) {
      textColor = common.redColor
      direct = '买入'
      paymentBtnTitle = '收款信息'
      secBtnTitle = '确认付款'
    } else if (rd.direct === common.sell) {
      textColor = common.greenColor
      direct = '卖出'
      paymentBtnTitle = '付款信息'
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
              width: '20%',
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
            >{`价格:¥${dealPrice}`}</Text>
          </View>
          <View
            style={{
              width: '30%',
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
            >{`数量:${quantity} ${common.legalDeal.token}`}</Text>
          </View>
          <View
            style={{
              width: '30%',
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
            >{`总价:¥${amount}`}</Text>
          </View>
          <View
            style={{
              width: '20%',
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
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              style={{
                marginTop: common.margin8,
                alignSelf: 'center',
              }}
              disabled={cancelBtnDisabled}
              onPress={() => {
                // legalDeal[rid].status = common.legalDeal.status.cancel
                // dispatch(actions.legalDealCancel({ id: rd.id }, legalDeal.concat()))
              }}
            >
              <Text
                style={{
                  color: cancelBtnDisabled ? common.placeholderColor : common.btnTextColor,
                  fontSize: common.font10,
                }}
              >撤单</Text>
            </TouchableOpacity>
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
                    // legalDeal[rid].status = common.legalDeal.status.waitconfirm
                    // dispatch(actions.havedPay({ id: rd.id }, legalDeal.concat()))
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
    const { refreshState, loggedInResult, otcList } = this.props

    return (
      <RefreshListView
        style={{
          backgroundColor: common.blackColor,
        }}
        data={otcList}
        renderItem={({ item, index }) => this.renderRow(item, index)}
        keyExtractor={this.keyExtractor}
        refreshState={refreshState}
        onHeaderRefresh={() => {
          this.refreshOtcList({
            id: loggedInResult.id,
            skip: 0,
            limit: this.limit,
          })
        }}
        onFooterRefresh={() => {
          this.refreshOtcList({
            id: loggedInResult.id,
            skip: 0,
            limit: this.limit,
          })
        }}
        footerTextStyle={{
          color: common.textColor,
          fontSize: common.font14,
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.otcDetail,
    loggedInResult: state.authorize.loggedInResult,
  }
}

export default connect(
  mapStateToProps,
)(OtcDetail)
