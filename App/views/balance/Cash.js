import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from '../me/Navigator'
import SelectMoney from './SelectMoney'

export default class Cash extends Component {
  constructor() {
    super()
    this.state = {
      selectedMoney: null,
    }
  }
  componentDidMount() { }
  addAddressPress(selectedMoney) {
    this.props.navigation.navigate('AddAddress', { selectedMoney })
  }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  selectedMoney(money) {
    this.setState({
      selectedMoney: money,
    })
  }
  renderBottomView(selectedMoney) {
    if (selectedMoney) {
      return (
        <View>
          <Text style={styles.cashTopTextStyle} >可用</Text>
          <Text style={styles.cashAmountStyle} >{`133${selectedMoney}`}</Text>
          <TextInput
            style={[styles.cashInputStyle, {
              textAlign: 'center',
            }]}
            placeholder="提现金额"
            placeholderTextColor={common.balanceNumTitleColor}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={[styles.cellTitleStyle, {
              marginTop: common.cellMarginLeft,
            }]}
            >{`手续费：88${selectedMoney}`}</Text>
            <Text style={[styles.cellTitleStyle, {
              marginTop: common.cellMarginLeft,
              marginRight: common.cellMarginLeft,
            }]}
            >{`实际到账：88${selectedMoney}`}</Text>
          </View>

          <TextInput
            style={[styles.cashInputStyle, {
              textAlign: 'center',
            }]}
            placeholder="地址"
            placeholderTextColor={common.balanceNumTitleColor}
          />
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.addAddressPress(selectedMoney)}
          >
            <View style={[styles.cashInputStyle, {
              marginTop: 0,
            }]}
            >
              <Text style={[styles.rechargeBottomCellBtnStyle, {
                alignSelf: 'center',
              }]}
              >添加新地址</Text>
            </View>
          </TouchableOpacity>
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
          headerTitle="提现"
          leftImagePress={() => this.leftImagePress()}
        />
        <ScrollView>
          <SelectMoney selectedMoney={money => this.selectedMoney(money)} />

          {this.renderBottomView(this.state.selectedMoney)}
        </ScrollView>
      </View>
    )
  }
}
