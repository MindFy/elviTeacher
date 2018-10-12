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
import { getDefaultLanguage } from '../../utils/languageHelper'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  container1: {
    flex: 1,
    backgroundColor: common.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#DFE4FF',
    marginHorizontal: 30,
    textAlign: 'center',
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
    const language = getDefaultLanguage()
    const title = transfer(language, 'Otc')
    if (language !== 'zh_hans') {
      return {
        headerTitle: title,
      }
    }
    const detail = transfer(language, 'Otc_detail')
    return {
      headerTitle: title,
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
          >{detail}</Text>
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
    const { navigation } = this.props
    navigation.setParams({
      detailPress: this._detailPress,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { response } = nextProps
    const { navigation, dispatch, type, loggedInResult, language } = this.props

    if (!response) return

    if (response.error) {
      const { error } = response
      if (error.code === 4001414) {
        Toast.fail(transfer(language, 'Otc_insufficient_balance'))
      } else if (error.code === 4001415) {
        Toast.fail(transfer(language, 'Otc_please_bind_bank_card_first'))
        navigation.navigate('UpdateBank')
      } else if (error.code === 4001416) {
        Toast.fail(transfer(language, 'Otc_system_does_not_provide_tradable_merchants'))
      } else if (error.code === 4001417) {
        Toast.fail(transfer(language, 'Otc_merchant_does_not_provide_bank_card_information'))
      } else if (error.code === 4001418) {
        navigation.navigate('Authentication')
        Toast.fail(transfer(language, 'Otc_please_perform_authentication_first'))
      } else if (error.code === 4001419) {
        Toast.fail(transfer(language, 'Otc_wait_legalDeal_more_than_2'))
      } else if (error.message === common.badNet) {
        Toast.fail(transfer(language, 'Otc_net_error'))
      } else if (error.code === 4031601) {
        Toast.fail(transfer(language, 'Otc_please_login_to_operate'))
      } else if (error.code === 4000667) {
        Toast.fail(transfer(language, 'Otc_account_frozen'))
      } else if (error.code === 4000156) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else {
        Toast.fail(transfer(language, 'Otc_order_pending'))
      }
    } else if (type === 'buy') {
      Toast.success(transfer(language, 'Otc_buy_success'), 3000)
      setTimeout(() => {
        this.props.navigation.navigate('ReceiverInfo', {
          receiverId: response.result.id,
          titleName: transfer(language, 'payment_b'),
        })
      }, 3000)
    } else {
      Toast.success(transfer(language, 'Otc_sell_success'))
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
      language,
    } = this.props

    if (!loggedIn) {
      navigation.navigate('LoginStack')
      return
    }

    const q = new BigNumber(quantity)
    if (!quantity.length || q.eq(0)) {
      const errorMsg = type === common.buy ?
        transfer(language, 'Otc_enter_the_number_of_purchases') :
        transfer(language, 'Otc_enter_the_quantity_sold')
      Toast.fail(errorMsg)
      return
    }
    if (q.lt(common.minQuantityLegalDeal)) {
      const errorMsg = type === common.buy ?
        transfer(language, 'Otc_minimum_purchase_amount') :
        transfer(language, 'Otc_minimum_quantity_sold')
      Toast.fail(`${errorMsg}${
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
    买入: '1.00',
    卖出: '0.99',
  }

  renderSelectionBar = () => {
    const { language } = this.props
    const titles = [transfer(language, 'Otc_buy'), transfer(language, 'Otc_sell')]
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
    const { type, language } = this.props
    const price = this.prices[type]

    return (
      <TKInputItem
        viewStyle={styles.priceInput}
        value={price.toString()}
        extra={transfer(language, 'Otc_yuan')}
        editable={false}
      />
    )
  }

  renderQuantity = () => {
    const { formState: { quantity }, type, language } = this.props
    // const placeholder = `${type === common.buy ? '买入' : '卖出'}数量`
    const placeholder =
      transfer(language, type === common.buy ? 'Otc_buy_amount' : 'Otc_sell_amount')
    return (
      <TKInputItem
        viewStyle={styles.quantityInput}
        placeholder={placeholder}
        value={quantity}
        extra={transfer(language, 'Otc_CNYT')}
        onChangeText={e => this.onQuantityChange(e)}
        keyboardType="numeric"
      />
    )
  }

  renderTotal = () => {
    const { type, balanceList, amountVisible, language } = this.props
    let { formState: { quantity } } = this.props
    if (quantity.length === 0) quantity = 0

    let showTotal
    let showVisible
    const price = this.prices[type]
    const total = new BigNumber(price).times(new BigNumber(quantity)).toFixed(2, 1)
    if (type === common.buy) {
      showTotal = `${transfer(language, 'Otc_buy_total')}:${total}${transfer(language, 'Otc_yuan')}`
    } else {
      showTotal = `${transfer(language, 'Otc_sell_total')}:${total}${transfer(language, 'Otc_yuan')}`
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
      const cnytVisibleTitle = `${transfer(language, 'Otc_available')}:${cnytVisible}CNYT`
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
    const { type, formState, loading, language } = this.props
    const { quantity } = formState
    const caption =
      transfer(language, type === common.buy ? 'Otc_buy' : 'Otc_sell')
    // const caption = type === common.buy ? '买入' : '卖出'
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
        disabled={disabled || loading}
      />
    )
  }

  renderTip = () => (
    <View>
      <Text
        style={styles.tipsContainer}
      >
        {transfer(this.props.language, 'Otc_pleaes_note')}
      </Text>
      <Text
        style={styles.tipsContent}
      >
        {transfer(this.props.language, 'Otc_please_note_content')}
      </Text>
    </View>
  )

  renderChineseVisible(language) {
    return (
      <View
        style={styles.container1}
      >
        <Text style={styles.txt}>{transfer(language, 'otc_visible_chinese')}</Text>
      </View>
    )
  }

  render() {
    const { loading, language } = this.props
    if (language !== 'zh_hans') {
      return this.renderChineseVisible(language)
    }
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
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(Otc)
