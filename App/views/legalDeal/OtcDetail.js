import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StyleSheet,
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
  requestCancel,
  requestHavedPay,
  updateForm,
} from '../../actions/otcDetail'
import schemas from '../../schemas/index'

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

  confirmPayPress(id) {
    const { dispatch, formState } = this.props
    const { code } = formState
    if (!code.length) {
      Toast.message('请输入验证码')
      return
    }
    dispatch(requestConfirmPay({ id, code }))
  }

  cancelPress(title, id) {
    const { dispatch } = this.props
    if (title === '撤单') {
      dispatch(requestCancel({ id }))
    } else if (title === '投诉') {
      // 投诉
    }
  }

  havedPayPress(title, id) {
    const { dispatch } = this.props
    if (title === '我已付款') {
      dispatch(requestHavedPay({ id }))
    } else if (title === '确认收款') {
      this.showOverlay(id)
    }
  }

  refreshOtcList(data) {
    const { dispatch } = this.props
    dispatch(requestOtcList(schemas.findOtcList(data)))
  }

  showOverlay(id) {
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
          confirmPress={() => this.confirmPayPress(id)}
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

  handleRequestCancel(nextProps) {
    const { cancelResult, cancelError, loggedInResult } = nextProps

    if (cancelResult && cancelResult !== this.props.cancelResult) {
      Toast.success(cancelResult.message)
      this.refreshOtcList({
        id: loggedInResult.id,
        skip: this.skip,
        limit: this.limit,
      })
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
    const { confirmPayResult, confirmPayError, loggedInResult } = nextProps

    if (confirmPayResult && confirmPayResult !== this.props.confirmPayResult) {
      Toast.success(confirmPayResult.message)
      this.refreshOtcList({
        id: loggedInResult.id,
        skip: this.skip,
        limit: this.limit,
      })
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
    const { havedPayResult, havedPayError, loggedInResult } = nextProps

    if (havedPayResult && havedPayResult !== this.props.havedPayResult) {
      Toast.success(havedPayResult.message)
      this.refreshOtcList({
        id: loggedInResult.id,
        skip: this.skip,
        limit: this.limit,
      })
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

  keyExtractor = item => item.createdAt

  renderRow(rd) {
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
    if (!cancelBtnDisabled) {
      cancelTitleColor = common.btnTextColor
    }
    let havedPayTitleColor = common.placeholderColor
    if (!havedPayDisabled) {
      havedPayTitleColor = common.btnTextColor
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
            <TouchableOpacity
              style={styles.paymentBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                navigation.navigate('Payment', { data: rd })
              }}
            >
              <Text style={styles.paymentTitle}>
                {paymentBtnTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentBtn, {
                marginTop: common.margin8,
              }]}
              activeOpacity={common.activeOpacity}
              disabled={cancelBtnDisabled}
              onPress={() => this.cancelPress(cancelBtnTitle, rd.id)}
            >
              <Text
                style={{
                  color: cancelTitleColor,
                  fontSize: common.font10,
                }}
              >{cancelBtnTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              style={styles.havedPayBtn}
              disabled={havedPayDisabled}
              onPress={() => this.havedPayPress(havedPayTitle, rd.id)}
            >
              <Text
                style={{
                  color: havedPayTitleColor,
                  fontSize: common.font10,
                }}
              >{havedPayTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { refreshState, loggedInResult, otcList } = this.props

    return (
      <RefreshListView
        style={{ backgroundColor: common.blackColor }}
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
