import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import {
  Toast,
} from 'teaset'
import TKButton from '../../components/TKButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  homeBalance: {
    flexDirection: 'row',
  },
  balance: {
    flexDirection: 'row',
    marginLeft: 60,
    marginRight: 60,
  },
  forgot: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    height: 10,
  },
})

export default class Buttons extends PureComponent {
  yellowPress() {
    Toast.fail('点击了黄色按钮')
  }
  smallPress() {
    Toast.fail('点击了撤单按钮')
  }
  registerPress() {
    Toast.fail('点击了注册按钮')
  }
  forgotPress() {
    Toast.fail('点击了忘记密码按钮')
  }
  grayPress() {
    Toast.fail('点击了灰色按钮')
  }
  rechargePress(type) {
    if (type) Toast.fail('点击了资金充值')
    else Toast.fail('点击了首页充值')
  }
  cashPress(type) {
    if (type) Toast.fail('点击了资金提现')
    else Toast.fail('点击了首页提现')
  }
  currentPress() {
    Toast.fail('点击了当前委托')
  }
  historyPress() {
    Toast.fail('点击了历史委托')
  }

  render() {
    const spaceView = (
      <View style={styles.space} />
    )

    return (
      <ScrollView
        style={styles.container}
      >
        {spaceView}
        <TKButton
          theme={'yellow'}
          caption={'确定'}
          onPress={() => this.yellowPress()}
        />

        {spaceView}
        <TKButton
          theme={'small'}
          caption={'撤单'}
          onPress={() => this.smallPress()}
        />

        {spaceView}
        <View style={styles.forgot} >
          <TKButton
            theme={'small'}
            caption={'新用户注册'}
            onPress={() => this.registerPress()}
          />

          <TKButton
            theme={'small'}
            caption={'忘记密码?'}
            onPress={() => this.forgotPress()}
          />
        </View>

        {spaceView}
        <TKButton
          theme={'gray'}
          caption={'确定'}
          onPress={() => this.grayPress()}
        />

        {spaceView}
        <View style={styles.homeBalance} >
          <TKButton
            theme={'home-balance'}
            caption={'充值'}
            onPress={() => this.rechargePress('balance')}
            icon={require('../../assets/recharge.png')}
          />

          <TKButton
            theme={'home-balance'}
            caption={'提现'}
            onPress={() => this.cashPress('balance')}
            icon={require('../../assets/recharge2.png')}
          />

          <TKButton
            theme={'home-balance'}
            caption={'当前委托'}
            onPress={() => this.currentPress()}
            icon={require('../../assets/currentDelegate.png')}
          />

          <TKButton
            theme={'home-balance'}
            caption={'历史委托'}
            onPress={() => this.historyPress()}
            icon={require('../../assets/transaction_white.png')}
          />
        </View>

        {spaceView}
        <View style={styles.balance} >
          <TKButton
            theme={'balance'}
            caption={'充值'}
            onPress={() => this.rechargePress()}
            icon={require('../../assets/recharge.png')}
          />

          <TKButton
            theme={'balance'}
            caption={'提现'}
            onPress={() => this.cashPress()}
            icon={require('../../assets/recharge2.png')}
          />
        </View>
      </ScrollView>
    )
  }
}
