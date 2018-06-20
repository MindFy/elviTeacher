import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import Toast from 'teaset/components/Toast/Toast'
import TKSelectionBar2 from '../../components/tkselectionbar2'
import TKInputItem from '../../components/TKInputItem'
import TKSpinner from '../../components/TKSpinner'
import TKButton from '../../components/TKButton'
import { common } from '../../constants/common'
import {
  updateForm,
  changeType,
  submitRequest,
  clearResponse,
} from '../../actions/otc'
import {
  requestBalanceList,
} from '../../actions/balance'
import findAssetList from '../../schemas/asset'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import cache from '../../utils/cache'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  scrollviewContentContainer: {
    marginHorizontal: common.margin10,
  },
  priceInput: { marginTop: common.margin20 },
  quantityInput: { marginTop: common.margin10 },
  total: {
    color: common.textColor,
    fontSize: common.font14,
  },
  totalView: {
    marginTop: common.margin10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipsContainer: {
    marginTop: common.margin15,
    color: common.textColor,
    fontSize: common.font12,
  },
  tipsContent: {
    marginTop: common.margin10,
    color: common.textColor,
    fontSize: common.font10,
    lineHeight: 14,
  },
})

class Otc extends Component {
  static navigationOptions(props) {
    const params = props.navigation.state.params || {}
    return {
      headerTitle: '法币',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerRight: (
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={params.detailPress}
        >
          <Text
            style={{
              marginRight: common.margin10,
              fontSize: common.font16,
              color: 'white',
            }}
          >明细</Text>
        </NextTouchableOpacity>
      ),
    }
  }

  constructor(props) {
    super(props)
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Otc')
    })
  }

  componentWillMount() {
    this.props.navigation.setParams({ detailPress: this._detailPress })
  }

  componentWillReceiveProps(nextProps) {
    const { response } = nextProps
    const { navigation, dispatch, type, loggedInResult } = this.props

    if (!response) return

    if (response.error) {
      const { error } = response
      if (error.code === 4001414) {
        Toast.fail('余额不足')
      } else if (error.code === 4001415) {
        Toast.fail('请先绑定银行卡')
        navigation.navigate('UpdateBank')
      } else if (error.code === 4001416) {
        Toast.fail('系统未提供可交易的商家')
      } else if (error.code === 4001417) {
        Toast.fail('商家未提供银行卡信息')
      } else if (error.code === 4001418) {
        navigation.navigate('Authentication')
        Toast.fail('请先进行身份认证')
      } else if (error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (error.code === 4031601) {
        Toast.fail('请登录后进行操作')
      } else {
        Toast.fail('挂单失败，请重试')
      }
    } else if (type === 'buy') {
      Toast.success('买入成功, 请在1小时内按要求完成付款并确认, 逾期订单将被取消!', 5000)
    } else {
      Toast.success('卖出成功')
      dispatch(requestBalanceList(findAssetList(loggedInResult.id)))
    }
    dispatch(clearResponse())
  }

  onSubmit() {
    Keyboard.dismiss()

    const {
      dispatch,
      loggedIn,
      formState: { quantity },
      type,
      navigation,
    } = this.props

    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }

    const q = new BigNumber(quantity)
    if (!quantity.length || q.eq(0)) {
      Toast.fail(`请输入${type === common.buy ? '买入' : '卖出'}数量`)
      return
    }
    if (q.lt(common.minQuantityLegalDeal)) {
      Toast.fail(`${type === common.buy ? '买入' : '卖出'}数量最少为${
        common.minQuantityLegalDeal}`)
      return
    }
    dispatch(submitRequest({
      type,
      quantity,
    }))
  }

  onQuantityChange(text) {
    const { dispatch } = this.props
    const q = new BigNumber(text)
    if (q.isNaN() && text.length) return // 1.限制只能输入数字、小数点
    if (!q.isNaN() && q.gt(common.maxQuantityLegalDeal)) {
      dispatch(updateForm(`${common.maxQuantityLegalDeal}`))
      return // 2.限制最大输入数量
    }
    const qArr = text.split('.')
    if (qArr.length === 1 && q.eq(0)) {
      dispatch(updateForm('0'))
      return // 3.输入0
    }
    if (qArr.length > 1 && qArr[1].length > 2) return // 4.小数长度限制
    dispatch(updateForm(text))
  }

  _detailPress = () => {
    Keyboard.dismiss()

    const { loggedIn, navigation } = this.props
    if (loggedIn) { navigation.navigate('OtcDetail') } else {
      setTimeout(() => {
        navigation.navigate('LoginStack')
      }, 50)
    }
  }

  prices = {
    buy: '1.00',
    sell: '0.99',
  }

  renderSelectionBar = () => {
    const titles = ['买入', '卖出']
    const { dispatch, type } = this.props
    const width = (common.sw - 2 * common.margin10) / titles.length

    return (
      <TKSelectionBar2
        titles={titles}
        initialIndexSelected={type === 'buy' ? 0 : 1}
        barItemStyle={{ width }}
        onPress={(e) => {
          const types = ['buy', 'sell']
          dispatch(changeType(types[e.index]))
          dispatch(updateForm(''))
        }}
      />)
  }

  renderPrice = () => {
    const { type } = this.props
    const price = this.prices[type]

    return (
      <TKInputItem
        viewStyle={styles.priceInput}
        value={price.toString()}
        extra="元"
        editable={false}
      />
    )
  }

  renderQuantity = () => {
    const { formState: { quantity }, type } = this.props
    const placeholder = `${type === common.buy ? '买入' : '卖出'}数量`

    return (
      <TKInputItem
        viewStyle={styles.quantityInput}
        placeholder={placeholder}
        value={quantity}
        extra="CNYT"
        onChangeText={e => this.onQuantityChange(e)}
        keyboardType="numeric"
      />
    )
  }

  renderTotal = () => {
    const { type, balanceList, amountVisible } = this.props
    let { formState: { quantity } } = this.props
    if (quantity.length === 0) quantity = 0

    let showTotal
    let showVisible
    const price = this.prices[type]
    const total = new BigNumber(price).times(new BigNumber(quantity)).toFixed(2, 1)
    if (type === common.buy) {
      showTotal = `买入总计:${total}元`
    } else {
      showTotal = `卖出总计:${total}元`
      let cnytVisible = '0.00'
      if (balanceList && balanceList.length !== 0) {
        balanceList.forEach((element) => {
          if (element.token.name === common.token.CNYT) {
            cnytVisible = new BigNumber(element.amount).toFixed(8, 1)
          }
        })
      } else if (amountVisible
        && Object.keys(amountVisible).length !== 0
        && amountVisible[common.token.CNYT]) {
        cnytVisible = new BigNumber(amountVisible[common.token.CNYT]).toFixed(8, 1)
      }
      const cnytVisibleTitle = `可用:${cnytVisible}CNYT`
      showVisible = (
        <Text style={styles.total}>
          {cnytVisibleTitle}
        </Text>
      )
    }

    return (
      <View style={styles.totalView}>
        <Text style={styles.total}>
          {showTotal}
        </Text>
        {showVisible}
      </View>
    )
  }

  renderSubmit = () => {
    const { type, formState } = this.props
    const { quantity } = formState
    const caption = type === common.buy ? '买入' : '卖出'
    const q = new BigNumber(quantity)
    let disabled = false
    let titleColor = common.btnTextColor
    if (!quantity.length || q.eq(0)) {
      disabled = true
    }
    if (disabled) {
      titleColor = common.placeholderColor
    }

    return (
      <TKButton
        style={{ marginTop: common.margin10, marginLeft: 0, marginRight: 0 }}
        titleStyle={{ color: titleColor }}
        theme="gray"
        target="global"
        caption={caption}
        onPress={() => this.onSubmit()}
        disabled={disabled}
      />
    )
  }

  renderTip = () => (
    <View>
      <Text
        style={styles.tipsContainer}
      >
        温馨提示
      </Text>
      <Text
        style={styles.tipsContent}
      >
        {'1. 买卖商户均为实地考察认证商户，并提供100万CNYT保证金，您每次兑换会冻结商户资产，商户资产不够时，不能接单，可放心兑换；\n2. 买卖商户均为实名认证商户，可放心兑换；\n3. 请使用本人绑定的银行卡进行汇款，其他任何方式汇款都会退款。（禁止微信和支付宝）\n4. 买入成功后，请在1小时内完成付款并确认“我已付款”，逾期订单将被取消。\n5. 卖出时，商家付款后您将会收到短信提示，请在24小时内“确认收款”，否则订单将会被自动确认。'}
      </Text>
    </View>
  )

  render() {
    const { loading } = this.props

    return (
      <View
        style={styles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollviewContentContainer}
        >
          {this.renderSelectionBar()}
          {this.renderPrice()}
          {this.renderQuantity()}
          {this.renderTotal()}
          {this.renderSubmit()}
          {this.renderTip()}
        </ScrollView>

        <TKSpinner isVisible={loading} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.otc,
    loggedIn: state.authorize.loggedIn,
    loggedInResult: state.authorize.loggedInResult,
    balanceList: state.balance.balanceList,
    amountVisible: state.asset.amountVisible,
  }
}

export default connect(mapStateToProps)(Otc)
