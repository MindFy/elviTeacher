import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import Toast from 'teaset/components/Toast/Toast'
import TKSelectionBar from '../../components/TKSelectionBar'
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
    marginTop: common.margin10,
    marginLeft: common.margin10,
    color: common.textColor,
    fontSize: common.font14,
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
      headerRight:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => {
              props.navigation.navigate('LegalDealDetail')
            }}
          >
            <Text
              style={{
                marginRight: common.margin10,
                fontSize: common.font16,
                color: 'white',
              }}
            >明细</Text>
          </TouchableOpacity>
        ),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { response } = nextProps
    const { navigation, dispatch, type } = this.props

    if (!response) return

    if (response.error) {
      const { error } = response
      if (error.code === 4001414) {
        Toast.fail('余额不足')
      } else if (error.code === 4001415) {
        Toast.fail('银行卡信息未绑定')
        navigation.navigate('UpdateBank')
      } else if (error.code === 4001416) {
        Toast.fail('系统未提供可交易的商家')
      } else if (error.code === 4001417) {
        Toast.fail('商家未提供银行卡信息')
      } else if (error.code === 4001418) {
        Toast.fail('未实名认证')
      } else if (error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (error.code === 4031601) {
        Toast.fail('请登录后进行操作')
      } else {
        Toast.fail('挂单失败，请重试')
      }
    } else {
      Toast.success(`${type === 'buy' ? '买入' : '卖出'}成功`)
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

    const q = new BigNumber(quantity)
    if (!quantity.length || q.eq(0)) {
      Toast.message(`请输入${type === common.buy ? '买入' : '卖出'}数量`)
      return
    }

    if (q.lt(common.minQuantityLegalDeal)) {
      Toast.message(`${type === common.buy ? '买入' : '卖出'}数量最少为${
        common.minQuantityLegalDeal}`)
      return
    }

    if (loggedIn) {
      dispatch(submitRequest({
        type,
        quantity,
      }))
    } else {
      navigation.navigate('LoginStack')
    }
  }

  onQuantityChange(text) {
    const { dispatch } = this.props
    dispatch(updateForm(text))
  }

  renderSelectionBar = () => {
    const titles = ['买入', '卖出']
    const { dispatch } = this.props
    const width = (common.sw - 2 * common.margin10) / titles.length

    return (
      <TKSelectionBar
        titles={titles}
        barItemStyle={{ width }}
        onPress={(e) => {
          const types = ['buy', 'sell']
          dispatch(changeType(types[e.index]))
        }}
      />)
  }

  renderPrice = () => {
    const { type } = this.props
    const prices = {
      buy: '1',
      sell: '0.99',
    }
    const price = prices[type]

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
    const { formState: { quantity }, buy } = this.props
    const placeholder = `${buy === common.buy ? '买入' : '卖出'}数量`

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
    const { type } = this.props
    let { formState: { quantity } } = this.props
    if (quantity.length === 0) quantity = 0

    const showTotal = type === common.buy ?
      `买入总计:${new BigNumber('1').times(new BigNumber(quantity)).toFixed()}元` :
      `卖出总计:${new BigNumber('0.99').times(new BigNumber(quantity)).toFixed()}元`

    return (
      <Text
        style={styles.total}
      >{showTotal}</Text>
    )
  }

  renderSubmit = () => {
    const { type } = this.props
    const caption = type === common.buy ? '买入' : '卖出'

    return (
      <TKButton
        style={{ marginTop: common.margin10, marginLeft: 0, marginRight: 0 }}
        theme="gray"
        caption={caption}
        onPress={() => this.onSubmit()}
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
        {'1. 买卖商户均为实地考察认证商户，并提供100万CNYT保证金，您每次兑换会冻结商户资产，商户资产不够时，不能接单，可放心兑换；\n2. 买卖商户均为实名认证商户，可放心兑换；\n3. 请使用本人绑定的银行卡进行汇款，其他任何方式汇款都会退款。（禁止微信和支付宝）'}
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
          keyboardDismissMode="on-drag"
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
  }
}

export default connect(mapStateToProps)(Otc)
