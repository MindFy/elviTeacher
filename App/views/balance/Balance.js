import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  findAssetListRequest,
} from '../../actions/recharge'
import { common } from '../common'
import BalanceCell from './BalanceCell'
import graphqlFindAssetList from '../../schemas/asset'

class Balance extends Component {
  static navigationOptions(props) {
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
          onPress={() => props.navigation.navigate('History')}
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

  constructor(props) {
    super(props)
    const { dispatch } = props
    
    // dispatch(findAssetListRequest(graphqlFindAssetList()))
  }

  componentDidMount() { }
  rechargePress() {
    this.props.navigation.navigate('Recharge')
  }
  cashPress() {
    this.props.navigation.navigate('Cash')
  }
  render() {
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
        <ScrollView>
          <View
            style={{
              marginTop: common.margin20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text style={{
              color: common.textColor,
              fontSize: common.font30,
              alignSelf: 'center',
            }}
            >0.12345678</Text>
            <Text style={{
              marginLeft: common.margin5,
              fontSize: common.font10,
              color: common.placeholderColor,
              alignSelf: 'center',
            }}
            >(¥0.98)</Text>
          </View>
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
                onPress={() => this.rechargePress()}
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
                onPress={() => this.cashPress()}
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

          <View
            style={{
              marginTop: common.margin10,
            }}
          >
            <BalanceCell
              leftImageSource={require('../../assets/111.png')}
              title={'BTC'}
              detail={'8.880000'}
            />
          </View>

          <BalanceCell
            leftImageSource={require('../../assets/111.png')}
            title={'BTC'}
            detail={'8.880000'}
          />

          <BalanceCell
            leftImageSource={require('../../assets/111.png')}
            title={'BTC'}
            detail={'8.880000'}
          />

        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    rose: state.dealstat.rose,
  }
}

export default connect(
  mapStateToProps,
)(Balance)
