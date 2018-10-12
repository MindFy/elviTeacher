import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native'
import { RefreshState } from 'react-native-refresh-list-view'
import {
  Toast,
} from 'teaset'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import TKSpinner from '../../components/TKSpinner'
import HistoryList from './HistoryList'
import {
  requestDeposit,
  requestWithdraw,
  requestOtc,
  withdrawCancel,
  withdrawUpdate,
  depositPageUpdate,
  withdrawPageUpdate,
  otcPageUpdate,
} from '../../actions/history'
import schemas from '../../schemas/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  headerLeft: {
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  headerLeftImage: {
    marginLeft: 10,
    width: 10,
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
})

class History extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
      headerLeft: (
        <NextTouchableOpacity
          style={styles.headerLeft}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.headerLeftImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }
  constructor() {
    super()
    this.state = {
      depositState: RefreshState.Idle,
      withdrawState: RefreshState.Idle,
      otcState: RefreshState.Idle,
      selectionBar: 'deposit',
    }
    this.limit = 10
    this.depositSkip = 0
    this.withdrawSkip = 0
    this.otcSkip = 0
    this.firstRequestDeposit = true
  }

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'recharge_historyList'),
    })
  }

  componentDidMount() {
    const { dispatch, loggedInResult } = this.props

    dispatch(requestDeposit(schemas.findPaymentListRecharge(
      loggedInResult.id,
      0,
      this.limit,
    )))
    dispatch(requestWithdraw(schemas.findPaymentListWithdraw(
      loggedInResult.id,
      0,
      this.limit,
    )))
    dispatch(requestOtc(schemas.findOtcList({
      id: loggedInResult.id,
      skip: 0,
      limit: this.limit,
    })))
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestDeposit(nextProps)
    this.handleRequestWithdraw(nextProps)
    this.handleRequestOtc(nextProps)
    this.handleWithdrawCancel(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(depositPageUpdate(0))
    dispatch(withdrawPageUpdate(0))
    dispatch(otcPageUpdate(0))
  }

  errors = {
    4000156: 'login_codeError',
    4000612: 'withdraw_doesnt_exist',
  }

  handleRequestDeposit(nextProps) {
    const { depositLoading, depositError, deposit } = nextProps
    if (!depositLoading && this.props.depositLoading) {
      this.firstRequestDeposit = false
      this.firstRequest = false
      if (depositError) {
        this.setState({ depositState: RefreshState.Idle })
      } else if (deposit) {
        const length = deposit.length < (this.depositSkip + 1) * this.limit
        this.setState({ depositState: !length ? RefreshState.Idle : RefreshState.NoMoreData })
      }
    }
  }

  handleRequestWithdraw(nextProps) {
    const { withdrawLoading, withdrawError, withdraw } = nextProps
    if (!withdrawLoading && this.props.withdrawLoading) {
      this.firstRequest = false
      if (withdrawError) {
        this.setState({ withdrawState: RefreshState.Idle })
      } else if (withdraw) {
        const length = withdraw.length < (this.withdrawSkip + 1) * this.limit
        this.setState({ withdrawState: !length ? RefreshState.Idle : RefreshState.NoMoreData })
      }
    }
  }

  handleWithdrawCancel(nextProps) {
    const { dispatch, withdrawCancelResult, withdrawCancelError, language } = nextProps

    if (withdrawCancelResult && withdrawCancelResult !== this.props.withdrawCancelResult) {
      Toast.success(transfer(language, 'OtcDetail_revocation_successful'))
      const newWithdraw = this.props.withdraw.concat()
      newWithdraw[this.withdrawCancelIndex].status = '已取消'
      dispatch(withdrawUpdate(newWithdraw))
    }
    if (withdrawCancelError && withdrawCancelError !== this.props.withdrawCancelError) {
      if (withdrawCancelError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = this.errors[withdrawCancelError.code]
        if (msg) Toast.fail(transfer(language, msg))
        else Toast.fail(transfer(language, 'OtcDetail_failed_to_cancel_the_order'))
      }
    }
  }

  handleRequestOtc(nextProps) {
    const { otcLoading, otcError, otc } = nextProps
    if (!otcLoading && this.props.otcLoading) {
      this.firstRequest = false
      if (otcError) {
        this.setState({ otcState: RefreshState.Idle })
      } else if (otc) {
        const length = otc.length < (this.otcSkip + 1) * this.limit
        this.setState({ otcState: !length ? RefreshState.Idle : RefreshState.NoMoreData })
      }
    }
  }

  render() {
    const {
      dispatch,
      deposit,
      withdraw,
      otc,
      loggedInResult,
      language,
      withdrawCancelLoading,
    } = this.props
    const {
      selectionBar,
      depositState,
      withdrawState,
      otcState,
    } = this.state
    
    const listLanguage = {
      date: transfer(language, 'history_date'),
      coin: transfer(language, 'history_coin'),
      amount: transfer(language, 'history_amount'),
      type: transfer(language, 'history_type'),
      status: transfer(language, 'history_status'),
      action: transfer(language, 'history_action'),
      buy: transfer(language, 'history_buy'),
      sell: transfer(language, 'history_sell'),
      cancel: transfer(language, 'history_cancel'),
      deposited: transfer(language, 'history_deposited'),
      withdrawed: transfer(language, 'history_withdrawed'),
      cancelled: transfer(language, 'history_cancelled'),
      withdrawing: transfer(language, 'history_withdrawing'),
      pending: transfer(language, 'history_pending'),
      refused: transfer(language, 'history_refused'),
      loading: transfer(language, 'exchange_dataInLoading'),
      noMoreData: transfer(language, 'exchange_dataNoMoreData'),
      reload: transfer(language, 'exchange_dataFailureText'),
    }

    return (
      <View style={styles.container}>
        <TKSelectionBar
          titles={[transfer(language, 'history_deposit'),
            transfer(language, 'history_withdrawal'),
            transfer(language, 'history_otc')]}
          onPress={(e) => {
            if (e.title === transfer(language, 'history_deposit')) {
              this.setState({ selectionBar: 'deposit' })
            } else if (e.title === transfer(language, 'history_withdrawal')) {
              this.setState({ selectionBar: 'withdraw' })
            } else if (e.title === transfer(language, 'history_otc')) {
              this.setState({ selectionBar: 'otc' })
            }
          }}
        />

        {
          selectionBar === 'deposit'
            ? <HistoryList
              language={listLanguage}
              data={deposit}
              selectionBar={selectionBar}
              refreshState={depositState}
              onHeaderRefresh={() => {
                if (this.firstRequestDeposit) return
                this.setState({ depositState: RefreshState.HeaderRefreshing })
                this.depositSkip = 0
                dispatch(depositPageUpdate(this.depositSkip))
                dispatch(requestDeposit(schemas.findPaymentListRecharge(
                  loggedInResult.id,
                  this.depositSkip,
                  this.limit,
                )))
              }}
              onFooterRefresh={() => {
                if (this.firstRequestDeposit) return
                this.setState({ depositState: RefreshState.FooterRefreshing })
                this.depositSkip += 1
                dispatch(depositPageUpdate(this.depositSkip))
                dispatch(requestDeposit(schemas.findPaymentListRecharge(
                  loggedInResult.id,
                  this.depositSkip,
                  this.limit,
                )))
              }}
            /> : null
        }
        {
          selectionBar === 'withdraw'
            ? <HistoryList
              language={listLanguage}
              data={withdraw}
              selectionBar={selectionBar}
              refreshState={withdrawState}
              onHeaderRefresh={() => {
                this.setState({ withdrawState: RefreshState.HeaderRefreshing })
                this.withdrawSkip = 0
                dispatch(withdrawPageUpdate(this.withdrawSkip))
                dispatch(requestWithdraw(schemas.findPaymentListWithdraw(
                  loggedInResult.id,
                  this.withdrawSkip,
                  this.limit,
                )))
              }}
              onFooterRefresh={() => {
                this.setState({ withdrawState: RefreshState.FooterRefreshing })
                this.withdrawSkip += 1
                dispatch(withdrawPageUpdate(this.withdrawSkip))
                dispatch(requestWithdraw(schemas.findPaymentListWithdraw(
                  loggedInResult.id,
                  this.withdrawSkip,
                  this.limit,
                )))
              }}
              cancelWithdraw={(rd, rid) => {
                this.withdrawCancelIndex = rid
                dispatch(withdrawCancel({ id: rd.id }))
              }}
            /> : null
        }
        {
          selectionBar === 'otc'
            ? <HistoryList
              language={listLanguage}
              data={otc}
              selectionBar={selectionBar}
              refreshState={otcState}
              onHeaderRefresh={() => {
                this.setState({ otcState: RefreshState.HeaderRefreshing })
                this.otcSkip = 0
                dispatch(otcPageUpdate(this.otcSkip))
                dispatch(requestOtc(schemas.findOtcList({
                  id: loggedInResult.id,
                  skip: this.otcSkip,
                  limit: this.limit,
                })))
              }}
              onFooterRefresh={() => {
                this.setState({ otcState: RefreshState.FooterRefreshing })
                this.otcSkip += 1
                dispatch(otcPageUpdate(this.otcSkip))
                dispatch(requestOtc(schemas.findOtcList({
                  id: loggedInResult.id,
                  skip: this.otcSkip,
                  limit: this.limit,
                })))
              }}
            /> : null
        }
        <TKSpinner isVisible={withdrawCancelLoading} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.history,

    loggedInResult: state.authorize.loggedInResult,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(History)
