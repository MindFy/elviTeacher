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

export default class AddAddress extends Component {
  componentDidMount() { }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: common.bgColor }}>
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="添加地址"
          leftImagePress={() => this.leftImagePress()}
        />
        <ScrollView>
          <View style={[styles.cashInputStyle, {
            marginTop: common.cellMarginLeft,
            height: common.cellH,
          }]}
          >
            <Text style={[styles.cellTitleStyle, {
              alignSelf: 'auto',
            }]}
            >{this.props.navigation.state.params.selectedMoney}</Text>
          </View>

          <View style={[styles.cashInputStyle, {
            marginTop: common.cellMarginLeft,
            height: common.cellH,
          }]}
          >
            <TextInput
              style={[styles.cellTitleStyle, {
                alignSelf: 'auto',
              }]}
              placeholder="备注"
              placeholderTextColor={common.balanceNumTitleColor}
            />
          </View>

          <View style={[styles.cashInputStyle, {
            marginTop: common.cellMarginLeft,
            height: common.cellH,
          }]}
          >
            <TextInput
              style={[styles.cellTitleStyle, {
                alignSelf: 'auto',
              }]}
              placeholder="地址"
              placeholderTextColor={common.balanceNumTitleColor}
            />
          </View>

          <TouchableOpacity activeOpacity={common.activeOpacity} >
            <View style={[styles.cashInputStyle, {
              marginTop: common.cellMarginLeft,
              height: common.cellH,
              borderWidth: 0,
            }]}
            >
              <Text style={[styles.rechargeBottomCellBtnStyle, {
                alignSelf: 'center',
              }]}
              >确认</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
