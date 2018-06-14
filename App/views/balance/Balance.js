import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ListView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import BalanceCell from './BalanceCell'
import findAssetList from '../../schemas/asset'
import {
  requestBalanceList,
  requestBalanceValuation,
} from '../../actions/balance'
import cache from '../../utils/cache'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  balance: {
    marginTop: common.margin20,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    color: common.textColor,
    fontSize: common.font30,
    textAlign: 'center',
  },
  balanceRMB: {
    marginTop: common.margin5,
    fontSize: common.font12,
    color: common.placeholderColor,
    textAlign: 'center',
  },
  balanceTip: {
    marginTop: common.margin10,
    fontSize: common.font14,
    color: common.placeholderColor,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: common.margin20,
    marginLeft: common.sw / 4,
    marginRight: common.sw / 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

class Balance extends Component {
  static navigationOptions(props) {
    const { navigation } = props
    const params = navigation.state.params || {}
    return {
      headerTitle: '资产',
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
          onPress={params.historyPress}
        >
          <Text
            style={{
              marginRight: common.margin10,
              fontSize: common.font16,
              color: 'white',
            }}
          >历史记录</Text>
        </NextTouchableOpacity>
      ),
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        if (cache.getObject('isLoginIn')) {
          jumpToIndex(scene.index)
        } else if (!cache.getObject('isFirstBalance')) {
          cache.setObject('isFirstBalance', 'true')
          setTimeout(() => {
            cache.removeObject('isFirstBalance')
          }, 800)
          navigation.navigate('LoginStack')
        }
      },
    }
  }

  constructor(props) {
    super(props)

    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Balance')
    })
  }

  componentWillMount() {
    this.props.navigation.setParams({ historyPress: this._historyPress })
  }

  componentDidMount() {
    const { loggedInResult, dispatch } = this.props
    dispatch(requestBalanceList(findAssetList(loggedInResult.id)))
    dispatch(requestBalanceValuation())
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loggedIn && nextProps.loggedIn) {
      const { loggedInResult, dispatch } = nextProps
      dispatch(requestBalanceList(findAssetList(loggedInResult.id)))
      dispatch(requestBalanceValuation())
    }
  }

  _historyPress = () => {
    const { loggedIn, navigation } = this.props
    if (loggedIn) navigation.navigate('History')
    else navigation.navigate('LoginStack')
  }

  filterDataSource() {
    const { balanceList = [] } = this.props
    const initBalance = [{
      token: {
        id: 1,
        name: 'TK',
      },
      amount: '0.00000000',
      availableCash: '0.00000000',
      freezed: '0.00000000',
      rmbValue: '0.00',
      platformFreeze: '0.00000000',
      btcValue: '0.00000000',
    },
    {
      token: {
        id: 2,
        name: 'BTC',
      },
      amount: '0.00000000',
      availableCash: '0.00000000',
      freezed: '0.00000000',
      rmbValue: '0.00',
      platformFreeze: '0.00000000',
      btcValue: '0.00000000',
    },
    {
      token: {
        id: 3,
        name: 'CNYT',
      },
      amount: '0.00000000',
      availableCash: '0.00000000',
      freezed: '0.00000000',
      rmbValue: '0.00',
      platformFreeze: '0.00000000',
      btcValue: '0.00000000',
    },
    {
      token: {
        id: 5,
        name: 'ETH',
      },
      amount: '0.00000000',
      availableCash: '0.00000000',
      freezed: '0.00000000',
      rmbValue: '0.00',
      platformFreeze: '0.00000000',
      btcValue: '0.00000000',
    },
    {
      token: {
        id: 6,
        name: 'ETC',
      },
      amount: '0.00000000',
      availableCash: '0.00000000',
      freezed: '0.00000000',
      rmbValue: '0.00',
      platformFreeze: '0.00000000',
      btcValue: '0.00000000',
    },
    {
      token: {
        id: 7,
        name: 'LTC',
      },
      amount: '0.00000000',
      availableCash: '0.00000000',
      freezed: '0.00000000',
      rmbValue: '0.00',
      platformFreeze: '0.00000000',
      btcValue: '0.00000000',
    }]
    const indexs = {
      TK: 0,
      BTC: 1,
      CNYT: 2,
      ETH: 3,
      ETC: 4,
      LTC: 5,
    }
    balanceList.forEach((e) => {
      initBalance[indexs[e.token.name]] = e
    })
    return initBalance
  }

  renderRow(rd) {
    const amount = new BigNumber(rd.amount).plus(rd.freezed).plus(rd.platformFreeze).toFixed(8, 1)
    return (
      <BalanceCell
        leftImageSource={require('../../assets/111.png')}
        title={rd.token.name}
        detail={amount}
      />
    )
  }

  renderRefreshControl = () => {
    const { loading } = this.props
    return (
      <RefreshControl
        onRefresh={() => {
          const { dispatch, loggedInResult, loggedIn } = this.props
          if (!loggedIn) return
          dispatch(requestBalanceList(findAssetList(loggedInResult.id)))
          dispatch(requestBalanceValuation())
        }}
        refreshing={loading}
      />
    )
  }

  render() {
    const { loggedIn, navigation, valuation } = this.props
    const balanceList = this.filterDataSource()
    let amountBTC = new BigNumber(0)
    let amountRMB = new BigNumber(0)
    if (valuation && valuation.rates) {
      for (let i = 0; i < balanceList.length; i++) {
        const element = balanceList[i]
        const amount =
          new BigNumber(element.amount)
            .plus(new BigNumber(element.freezed))
            .plus(new BigNumber(element.platformFreeze))
        const scaleBTC = valuation.rates[element.token.name][common.token.BTC]
        const scaleCNYT = valuation.rates[element.token.name][common.token.CNYT]
        amountBTC = amount.multipliedBy(scaleBTC).plus(amountBTC)
        amountRMB = amount.multipliedBy(scaleCNYT).plus(amountRMB)
      }
    }
    amountBTC = amountBTC.toFixed(8, 1)
    amountRMB = amountRMB.toFixed(2, 1)

    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      >
        <Text style={styles.balance}>{amountBTC}</Text>
        <Text style={styles.balanceRMB}>{`(¥${amountRMB})`}</Text>
        <Text style={styles.balanceTip}>总资产(BTC)</Text>

        <View style={styles.btnContainer}>
          <TKButton
            theme={'balance'}
            caption={'充值'}
            icon={require('../../assets/recharge.png')}
            onPress={() => {
              if (loggedIn) navigation.navigate('Recharge')
              else navigation.navigate('LoginStack')
            }}
          />
          <TKButton
            theme={'balance'}
            caption={'提现'}
            icon={require('../../assets/recharge2.png')}
            onPress={() => {
              if (loggedIn) navigation.navigate('Withdraw')
              else navigation.navigate('LoginStack')
            }}
          />
        </View>

        {
          loggedIn
            ? <ListView
              style={{
                marginTop: common.margin10,
                marginBottom: common.margin10,
              }}
              dataSource={this.dataSource(balanceList)}
              renderRow={rd => this.renderRow(rd)}
              enableEmptySections
              removeClippedSubviews={false}
            />
            : <BalanceCell
              leftImageSource={require('../../assets/111.png')}
              title={common.token.BTC}
              detail={0}
            />
        }
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authorize.loggedIn,
    loggedInResult: state.authorize.loggedInResult,

    balanceList: state.balance.balanceList,
    valuation: state.balance.valuation,
    loading: state.balance.loading,
  }
}

export default connect(
  mapStateToProps,
)(Balance)
