import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from '../me/Navigator'
import BalanceCell from './BalanceCell'

export default class Balance extends Component {
  componentDidMount() { }
  rightTitlePress() {
    this.props.navigation.navigate('History')
  }
  rechargePress() {
    this.props.navigation.navigate('Recharge')
  }
  cashPress() {
    this.props.navigation.navigate('Cash')
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: common.bgColor }}>
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="资源"
          rightTitle="历史记录"
          rightTitlePress={() => this.rightTitlePress()}
        />
        <ScrollView>
          <View style={styles.balanceNumViewStyle} >
            <Text style={styles.balanceNumStyle} >0.12345678</Text>
            <Text style={styles.balanceNumRightTextStyle} >(¥0.98)</Text>
          </View>
          <Text style={styles.balanceNumTitleStyle} >总资产(BTC)</Text>

          <View style={styles.balanceImageViewStyle} >
            <View>
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => this.rechargePress()}
              >
                <Image
                  style={styles.balanceImageStyle}
                  source={require('../../assets/充值.png')}
                />
                <Text style={styles.balanceNumTitleStyle} >充值</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => this.cashPress()}
              >
                <Image
                  style={styles.balanceImageStyle}
                  source={require('../../assets/充值copy.png')}
                />
                <Text style={styles.balanceNumTitleStyle} >提现</Text>
              </TouchableOpacity>
            </View>
          </View>

          <BalanceCell
            style={{ marginTop: common.balanceImageMarginTop }}
            leftImageSource={require('../../assets/111.png')}
            title={'BTC'}
            detail={'8.880000'}
          />

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
