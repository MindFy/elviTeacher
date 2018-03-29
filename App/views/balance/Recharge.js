import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from '../me/Navigator'
import SelectMoney from './SelectMoney'

export default class Recharge extends Component {
  constructor() {
    super()
    this.state = {
      selectedMoney: null,
    }
  }
  componentDidMount() { }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  rightTitlePress() {
    this.props.navigation.navigate('History')
  }
  selectedMoney(money) {
    this.setState({
      selectedMoney: money,
    })
  }
  renderBottomCell(selectedMoney) {
    if (selectedMoney) {
      return (
        <View style={[styles.rechargeCellStyle,
          {
            flexDirection: 'column',
            marginTop: common.balanceImageTitleMarginTop,
            height: common.rechargeBottomCellH,
          }]}
        >
          <Text style={styles.rechargeBottomCellTitleStyle} >充值地址</Text>
          <Text style={[styles.cellTitleStyle, {
            alignSelf: 'auto',
          }]}
          >73YHF9SF99S9F9B99T9J9YJ99Y99N9D9E9</Text>
          <View style={styles.rechargeBottomCellBtnViewStyle} >
            <TouchableOpacity activeOpacity={common.activeOpacity} >
              <Text style={styles.rechargeBottomCellBtnStyle} >复制地址</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={common.activeOpacity} >
              <Text style={styles.rechargeBottomCellBtnStyle} >显示二维码</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return null
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: common.bgColor }}>
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="充值"
          leftImagePress={() => this.leftImagePress()}
          rightTitle="历史记录"
          rightTitlePress={() => this.rightTitlePress()}
        />
        <ScrollView>
          <SelectMoney selectedMoney={money => this.selectedMoney(money)} />

          {this.renderBottomCell(this.state.selectedMoney)}
        </ScrollView>
      </View>
    )
  }
}
