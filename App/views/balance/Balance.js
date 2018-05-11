import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import BalanceCell from './BalanceCell'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Balance extends Component {
  static navigationOptions(props) {
    const { navigation } = props
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
      headerRight:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => {
              navigation.navigate('History')
            }}
          >
            <Text
              style={{
                marginRight: common.margin10,
                fontSize: common.font16,
                color: 'white',
              }}
            >历史记录</Text>
          </TouchableOpacity>
        ),
    }
  }

  constructor() {
    super()

    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderRow(rd) {
    return (
      <BalanceCell
        leftImageSource={require('../../assets/111.png')}
        title={rd.token.name}
        detail={rd.amount}
      />
    )
  }

  render() {
    const { asset, user, navigation, dispatch, findAssetListVisible, valuation } = this.props
    let amountBTC = 0
    let rmbBTC = 0
    if (valuation && valuation.rates) {
      rmbBTC = valuation.rates[common.token.BTC][common.token.CNYT]
      for (let i = 0; i < asset.length; i++) {
        const element = asset[i]
        const amount = Number(element.amount)
        const scaleBTC = valuation.rates[element.token.name][common.token.BTC]
        const temp = common.bigNumber.multipliedBy(amount, scaleBTC)
        amountBTC += temp
      }
      amountBTC = Number(amountBTC).toFixed(8)
    }

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
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                if (user) {
                  dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
                }
              }}
              refreshing={findAssetListVisible}
              colors={[common.textColor]}
              progressBackgroundColor={common.navBgColor}
              progressViewOffset={0}
              tintColor={common.textColor}
            />
          }
        >
          <Text
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font30,
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >{amountBTC}</Text>
          <Text
            style={{
              marginTop: common.margin5,
              fontSize: common.font10,
              color: common.placeholderColor,
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >{`(¥${rmbBTC})`}</Text>
          <Text
            style={{
              marginTop: common.margin10,
              fontSize: common.font14,
              color: common.placeholderColor,
              alignSelf: 'center',
            }}
          >总资产(BTC)</Text>

          <View
            style={{
              marginLeft: common.sw / 4,
              marginRight: common.sw / 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  if (user) {
                    navigation.navigate('Recharge')
                  } else {
                    navigation.navigate('LoginStack')
                  }
                }}
              >
                <Image
                  style={{
                    marginTop: common.margin20,
                    height: common.w40,
                    width: common.w40,
                  }}
                  source={require('../../assets/充值.png')}
                />
                <Text
                  style={{
                    marginTop: common.margin10,
                    fontSize: common.font14,
                    color: common.placeholderColor,
                    alignSelf: 'center',
                  }}
                >充值</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  if (user) {
                    navigation.navigate('Cash')
                  } else {
                    navigation.navigate('LoginStack')
                  }
                }}
              >
                <Image
                  style={{
                    marginTop: common.margin20,
                    height: common.w40,
                    width: common.w40,
                  }}
                  source={require('../../assets/充值copy.png')}
                />
                <Text
                  style={{
                    marginTop: common.margin10,
                    fontSize: common.font14,
                    color: common.placeholderColor,
                    alignSelf: 'center',
                  }}
                >提现</Text>
              </TouchableOpacity>
            </View>
          </View>

          {
            user
              ? <ListView
                style={{
                  marginTop: common.margin10,
                }}
                dataSource={this.dataSource(asset)}
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
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    asset: store.asset.asset,
    valuation: store.asset.valuation,
    findAssetListVisible: store.asset.findAssetListVisible,
  }
}

export default connect(
  mapStateToProps,
)(Balance)
