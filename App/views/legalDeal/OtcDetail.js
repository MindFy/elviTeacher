import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import {
  common,
} from '../../constants/common'
import {
  requestOtcList,
  requestGetCode,
  requestConfirmPay,
  requestCancel,
  requestHavedPay,
  requestAllege,
  updateForm,
  updateOtcList,
  updateAuthCodeType,
  check2GoogleAuth,
  check2GoogleAuthSetResponse,
} from '../../actions/otcDetail'
import schemas from '../../schemas/index'
import AllegeView from './AllegeView'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import WithdrawAuthorizeCode from '../../views/balance/components/WithdrawAuthorizeCode'

const styles = StyleSheet.create({
  row: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    backgroundColor: common.navBgColor,
  },
  statusView: {
    height: common.h30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: common.borderColor,
    borderBottomWidth: 0,
  },
  coin: {
    marginLeft: common.margin5,
    color: common.textColor,
    fontSize: common.font12,
  },
  direct: {
    marginLeft: common.margin20,
    fontSize: common.font12,
  },
  createdAt: {
    marginLeft: common.margin20,
    color: common.textColor,
    fontSize: common.font10,
  },
  status: {
    position: 'absolute',
    right: common.margin5,
    color: common.textColor,
    fontSize: common.font12,
  },
  rowBorderView: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  priceView: {
    width: '20%',
    borderWidth: 1,
    borderColor: common.borderColor,
    justifyContent: 'center',
  },
  price: {
    color: common.textColor,
    fontSize: common.font10,
    textAlign: 'center',
  },
  paymentBtn: {
    marginTop: common.margin10,
    alignSelf: 'center',
  },
  paymentTitle: {
    color: common.btnTextColor,
    fontSize: common.font10,
  },
  havedPayBtn: {
    marginTop: common.margin8,
    alignSelf: 'center',
    marginBottom: common.margin10,
  },
})

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
        <NextTouchableOpacity
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
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  constructor() {
    super()
    this.limit = 10
    this.state = {
      refreshState: RefreshState.Idle,
      skip: 0,
      showAllegeView: false,
    }
    this.codeTitles = ['短信验证码', '谷歌验证码']
  }

  componentDidMount() {
    const { loggedInResult } = this.props
    this.refreshOtcList({
      id: loggedInResult.id,
      skip: 0,
      limit: this.limit,
    }, RefreshState.HeaderRefreshing)
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleRequestCancel(nextProps)
    this.handleRequestConfirmPay(nextProps)
    this.handleRequestHavedPay(nextProps)
    this.handleRequestOtcList(nextProps)
    this.handleRequestAllege(nextProps)
    this.handleRequestCheck2GoogleCode(nextProps)
  }

  componentWillUnmount() {
    const { dispatch, formState } = this.props
    dispatch(updateForm({ ...formState, code: '', allegeText: '' }))
  }

  onChangeText(text, tag) {
    const { dispatch, formState } = this.props
    if (tag === 'code') {
      dispatch(updateForm({ ...formState, code: text }))
    } else if (tag === 'allege') {
      if (text.length > 50) return
      dispatch(updateForm({ ...formState, allegeText: text }))
    }
  }

  confirmPayPress(id) {
    Keyboard.dismiss()
    Overlay.hide(this.overlayViewKeyID)
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      const { code } = formState
      if (!code.length) {
        Toast.fail('请输入验证码')
        return
      }
      dispatch(requestConfirmPay({ id, code }))
    } else {
      const { googleCode } = formState
      if (!googleCode.length) {
        Toast.fail('请输入谷歌验证码')
        return
      }
      this.id = id
      dispatch(check2GoogleAuth({
        googleCode: formState.googleCode,
      }))
    }
  }

  cancelPress(title, id) {
    const { dispatch, formState } = this.props
    if (title === '撤单') {
      dispatch(requestCancel({ id }))
    } else if (title === '投诉') {
      dispatch(updateForm({ ...formState, allegeText: '' }))
      this.setState({
        showAllegeView: true,
        allegeId: id,
      })
    }
  }

  havedPayPress(title, id) {
    const { dispatch } = this.props
    if (title === '我已付款') {
      dispatch(requestHavedPay({ id }))
    } else if (title === '确认收款') {
      this.showAuthCode(id)
    }
  }

  allegeConfirmPress(data) {
    const { dispatch } = this.props
    dispatch(requestAllege(data))
  }

  refreshOtcList(data, refreshState) {
    const { dispatch } = this.props
    dispatch(requestOtcList(schemas.findOtcList(data)))
    this.setState({
      refreshState,
    })
  }

  authCodeChanged = (e, code) => {
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      dispatch(updateForm({
        ...formState,
        code,
      }))
    } else {
      dispatch(updateForm({
        ...formState,
        googleCode: code,
      }))
    }
  }

  segmentValueChanged = (e) => {
    const { dispatch, formState } = this.props
    dispatch(updateAuthCodeType(e.title))

    if (e.title === '谷歌验证码') {
      dispatch(updateForm({
        ...formState,
        code: '',
      }))
    } else {
      dispatch(updateForm({
        ...formState,
        googleCode: '',
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { loggedInResult, dispatch } = this.props
    dispatch(requestGetCode({ mobile: loggedInResult.mobile, service: 'auth' }))
  }

  showAuthCode = (id) => {
    const { dispatch, loggedInResult, formState } = this.props
    dispatch(updateAuthCodeType('短信验证码'))
    dispatch(updateForm({
      ...formState,
      SMSCode: '',
      googleCode: '',
    }))
    const overlayView = (
      <Overlay.View
        style={{ top: '35%' }}
        modal={false}
        overlayOpacity={0}
      >
        <WithdrawAuthorizeCode
          titles={this.codeTitles}
          mobile={loggedInResult.mobile}
          onChangeText={this.authCodeChanged}
          segmentValueChanged={this.segmentValueChanged}
          smsCodePress={this.SMSCodePress}
          confirmPress={() => this.confirmPayPress(id)}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  errors = {
    4000101: '手机号码或服务类型错误',
    4000102: '一分钟内不能重复发送验证码',
    4000104: '手机号码已注册',
    4000156: '授权验证失败',
    4001480: '订单状态已过期',
    4001421: '订单状态已过期',
  }

  handleRequestGetCode(nextProps) {
    const { getCodeResult, getCodeError } = nextProps

    if (getCodeResult && getCodeResult !== this.props.getCodeResult) {
      Toast.success(getCodeResult.message)
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

  handleRequestCancel(nextProps) {
    const { dispatch, cancelResult, cancelError, otcList } = nextProps

    if (cancelResult && cancelResult !== this.props.cancelResult) {
      Toast.success('撤销成功')
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].status = 'cancel'
      dispatch(updateOtcList(nextOtcList))
    }
    if (cancelError && cancelError !== this.props.cancelError) {
      if (cancelError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        const msg = this.errors[cancelError.code]
        if (msg) Toast.fail(msg)
        else Toast.fail('撤单失败，请稍后重试')
      }
    }
  }

  handleRequestConfirmPay(nextProps) {
    const { dispatch, confirmPayResult, confirmPayError, otcList } = nextProps

    if (confirmPayResult && confirmPayResult !== this.props.confirmPayResult) {
      Toast.success('确认成功')
      Overlay.hide(this.overlayViewKey)
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].status = 'complete'
      dispatch(updateOtcList(nextOtcList))
    }
    if (confirmPayError && confirmPayError !== this.props.confirmPayError) {
      if (confirmPayError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        const msg = this.errors[confirmPayError.code]
        if (msg) Toast.fail(msg)
        else Toast.fail('确认失败，请稍后重试')
      }
    }
  }

  handleRequestHavedPay(nextProps) {
    const { dispatch, havedPayResult, havedPayError, otcList } = nextProps

    if (havedPayResult && havedPayResult !== this.props.havedPayResult) {
      Toast.success('确认成功')
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].status = 'waitconfirm'
      dispatch(updateOtcList(nextOtcList))
    }
    if (havedPayError && havedPayError !== this.props.havedPayError) {
      if (havedPayError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        const msg = this.errors[havedPayError.code]
        if (msg) Toast.fail(msg)
        else Toast.fail('操作失败，请稍后重试')
      }
    }
  }

  handleRequestCheck2GoogleCode(nextProps) {
    if (!nextProps.googleCodeLoading && this.props.googleCodeLoading) {
      const { googleCodeResponse, dispatch, formState } = nextProps
      if (googleCodeResponse.success) {
        dispatch(requestConfirmPay({ id: this.id, googleCode: formState.googleCode }))
      } else {
        const errCode = googleCodeResponse.error.code
        if (errCode === 4000171) {
          Toast.fail('请先绑定谷歌验证码!')
        } else {
          Toast.fail('谷歌验证码错误!')
        }
      }
      dispatch(check2GoogleAuthSetResponse(null))
    }
  }

  handleRequestAllege(nextProps) {
    const { dispatch, allegeResult, allegeError, otcList } = nextProps

    if (allegeResult && allegeResult !== this.props.allegeResult) {
      Toast.success('投诉成功')
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].isAllege = 'yes'
      dispatch(updateOtcList(nextOtcList))
      this.setState({ showAllegeView: false })
    }
    if (allegeError && allegeError !== this.props.allegeError) {
      if (allegeError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        const msg = this.errors[allegeError.code]
        if (msg) Toast.fail(msg)
        else Toast.fail('投诉失败，请稍后重试')
      }
      this.setState({ showAllegeView: false })
    }
  }

  handleRequestOtcList(nextProps) {
    const { dispatch, otcList } = nextProps
    const { refreshState, skip } = this.state
    if (refreshState === RefreshState.HeaderRefreshing) {
      this.setState({
        refreshState: RefreshState.Idle,
      })
    }
    if (!otcList.length && refreshState === RefreshState.FooterRefreshing) {
      this.setState({
        skip: 0,
        refreshState: RefreshState.NoMoreData,
      })
      dispatch(updateOtcList(this.props.otcList))
    } else if (otcList.length && refreshState === RefreshState.FooterRefreshing) {
      this.setState({
        skip: skip + 1,
        refreshState: RefreshState.Idle,
      })
      const nextOtcList = this.props.otcList.concat(otcList)
      dispatch(updateOtcList(nextOtcList))
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
    let havedPayTitle = ''
    let cancelBtnDisabled = true
    let confirmPayDisabled = true
    let havedPayDisabled = true
    let cancelBtnTitle
    const dealPrice = new BigNumber(rd.dealPrice).toFixed(2)
    const quantity = new BigNumber(rd.quantity).toFixed(2)
    const amount = new BigNumber(dealPrice).multipliedBy(quantity).toFixed(2, 1)
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
    if (rd.direct === common.buy) {
      textColor = common.redColor
      direct = '买入'
      paymentBtnTitle = '收款方信息'
      havedPayTitle = '我已付款'
      cancelBtnTitle = '撤单'
    } else if (rd.direct === common.sell) {
      textColor = common.greenColor
      direct = '卖出'
      paymentBtnTitle = '付款方信息'
      havedPayTitle = '确认收款'
      cancelBtnTitle = '投诉'
      havedPayDisabled = confirmPayDisabled
    }
    const coin = common.legalDeal.token
    let cancelTitleColor = common.placeholderColor
    let havedPayTitleColor = common.placeholderColor
    if (!havedPayDisabled) {
      havedPayTitleColor = common.btnTextColor
    }
    if (cancelBtnTitle === '投诉') {
      if (!havedPayDisabled && rd.isAllege === 'no') {
        cancelBtnDisabled = false
      } else {
        cancelBtnDisabled = true
      }
    }
    if (!cancelBtnDisabled) {
      cancelTitleColor = common.btnTextColor
    }
    return (
      <View style={styles.row}>
        <View style={styles.statusView}>
          <Text style={styles.coin}>
            {coin}</Text>
          <Text style={[styles.direct, { color: textColor }]}>
            {direct}</Text>
          <Text style={styles.createdAt}>
            {createdAt}</Text>
          <Text style={styles.status}>
            {status}</Text>
        </View>
        <View style={styles.rowBorderView}>
          <View style={styles.priceView}>
            <Text style={styles.price}>
              {`单价:¥${dealPrice}`}</Text>
          </View>
          <View style={[styles.priceView, { width: '30%' }]}>
            <Text style={styles.price}>
              {`数量:${quantity} ${common.legalDeal.token}`}</Text>
          </View>
          <View style={[styles.priceView, { width: '30%' }]}>
            <Text style={styles.price}>
              {`总价:¥${amount}`}</Text>
          </View>
          <View style={styles.priceView}>
            <NextTouchableOpacity
              style={styles.paymentBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                navigation.navigate('Payment', { data: rd })
              }}
            >
              <Text style={styles.paymentTitle}>
                {paymentBtnTitle}</Text>
            </NextTouchableOpacity>
            <NextTouchableOpacity
              style={[styles.paymentBtn, {
                marginTop: common.margin8,
              }]}
              activeOpacity={common.activeOpacity}
              disabled={cancelBtnDisabled}
              onPress={() => {
                this.operateIndex = rid
                this.cancelPress(cancelBtnTitle, rd.id)
              }}
            >
              <Text
                style={{
                  color: cancelTitleColor,
                  fontSize: common.font10,
                }}
              >{cancelBtnTitle}</Text>
            </NextTouchableOpacity>
            <NextTouchableOpacity
              activeOpacity={common.activeOpacity}
              style={styles.havedPayBtn}
              disabled={havedPayDisabled}
              onPress={() => {
                this.operateIndex = rid
                this.havedPayPress(havedPayTitle, rd.id)
              }}
            >
              <Text
                style={{
                  color: havedPayTitleColor,
                  fontSize: common.font10,
                }}
              >{havedPayTitle}</Text>
            </NextTouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderAllegeView() {
    const { formState } = this.props
    const { showAllegeView, allegeId } = this.state
    const { allegeText } = formState

    if (showAllegeView) {
      return (
        <AllegeView
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
          }}
          onPress={() => this.setState({ showAllegeView: false })}
          inputValue={allegeText}
          onChangeText={e => this.onChangeText(e, 'allege')}
          placeholder={'请填写投诉事由，50个字之内'}
          cancelPress={() => this.setState({ showAllegeView: false })}
          confirmPress={() => {
            Keyboard.dismiss()
            if (!formState.allegeText || formState.allegeText.length > 50) {
              Toast.fail('请填写投诉事由，50个字之内')
              return
            }
            const data = { legaldeal_id: allegeId, reason: formState.allegeText }
            this.allegeConfirmPress(data)
          }}
        />
      )
    }
    return null
  }

  render() {
    const { loggedInResult, otcList } = this.props
    const { refreshState, skip } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: common.blackColor }}>
        <RefreshListView
          data={otcList}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={this.keyExtractor}
          refreshState={refreshState}
          onHeaderRefresh={() => {
            if ((refreshState !== RefreshState.NoMoreData)
              || (refreshState !== RefreshState.FooterRefreshing)) {
              this.refreshOtcList({
                id: loggedInResult.id,
                skip: 0,
                limit: this.limit,
              }, RefreshState.HeaderRefreshing)
            }
          }}
          onFooterRefresh={() => {
            if ((refreshState !== RefreshState.NoMoreData)
              || (refreshState !== RefreshState.HeaderRefreshing)) {
              this.refreshOtcList({
                id: loggedInResult.id,
                skip: skip + 1,
                limit: this.limit,
              }, RefreshState.FooterRefreshing)
            }
          }}
          footerTextStyle={{
            color: common.textColor,
            fontSize: common.font14,
          }}
        />
        {this.renderAllegeView()}
      </View>
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
