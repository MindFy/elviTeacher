import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import SelectMoney from './SelectMoney'

export default class Recharge extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '充值',
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
  constructor() {
    super()
    this.state = {
      selectedMoney: null,
    }
  }
  componentDidMount() { }
  selectedMoney(money) {
    this.setState({
      selectedMoney: money,
    })
  }
  renderBottomCell(selectedMoney) {
    if (selectedMoney) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            height: common.h97,
            backgroundColor: common.navBgColor,
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              marginTop: common.margin10,
              fontSize: common.font12,
              color: common.placeholderColor,
            }}
          >充值地址</Text>
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
            }}
          >73YHF9SF99S9F9B99T9J9YJ99Y99N9D9E9</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: common.margin10,
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
            >
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: common.btnTextColor,
                  fontSize: common.font14,
                }}
              >复制地址</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
            >
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: common.btnTextColor,
                  fontSize: common.font14,
                }}
              >显示二维码</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return null
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
          <SelectMoney selectedMoney={money => this.selectedMoney(money)} />

          {this.renderBottomCell(this.state.selectedMoney)}
        </ScrollView>
      </View>
    )
  }
}
