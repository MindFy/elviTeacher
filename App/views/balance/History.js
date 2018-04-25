import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import HistoryCell from './HistoryCell'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class History extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '历史记录',
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

  constructor(props) {
    super(props)
    const { dispatch, user } = props
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    if (user) {
      dispatch(actions.findPaymentListRecharge(schemas.findPaymentList(user.id, common.recharge)))
      dispatch(actions.findPaymentListWithdraw(schemas.findPaymentList(user.id, common.withdraw)))
    }
  }

  componentDidMount() { }

  renderRow(rd) {
    const { rechargeOrWithdraw } = this.props
    return (
      <HistoryCell
        rd={rd}
        rechargeOrWithdraw={rechargeOrWithdraw}
      />
    )
  }

  renderHeader() {
    const { rechargeOrWithdraw } = this.props
    return (
      <View style={{
        marginTop: common.margin10,
        marginLeft: common.margin10,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >时间</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >币种</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >数量</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
          }}
        >状态</Text>
        {
          rechargeOrWithdraw === common.withdraw ?
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font12,
              }}
            >操作</Text> : null
        }
      </View>
    )
  }

  render() {
    const { dispatch, rechargeOrWithdraw, paymentRecharge, paymentWithdraw } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />

        <TKSelectionBar
          leftTitle={'充值记录'}
          rightTitle={'提现记录'}
          leftBlock={() => {
            dispatch(actions.rechargeOrWithdrawUpdate({
              rechargeOrWithdraw: common.recharge,
            }))
          }}
          rightBlock={() => {
            dispatch(actions.rechargeOrWithdrawUpdate({
              rechargeOrWithdraw: common.withdraw,
            }))
          }}
        />

        <ListView
          dataSource={this.dataSource(rechargeOrWithdraw === common.recharge ?
            paymentRecharge : paymentWithdraw)}
          renderRow={rd => this.renderRow(rd)}
          renderHeader={() => this.renderHeader()}
          enableEmptySections
        />

        <ScrollView />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,
    asset: store.asset.asset,
    paymentRecharge: store.payment.paymentRecharge,
    paymentWithdraw: store.payment.paymentWithdraw,
    rechargeOrWithdraw: store.payment.rechargeOrWithdraw,
  }
}

export default connect(
  mapStateToProps,
)(History)
