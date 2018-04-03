import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import SelectMoney from './SelectMoney'

export default class Cash extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '提现',
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
        onPress={() => props.navigation.goBack()} >
        <Image
        style={{
          marginLeft: common.margin10,
          width: common.w10,
          height: common.h20,
        }}
        source={require('../../assets/下拉copy.png')} />
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
          <Text style={{
            marginTop: common.margin22,
            fontSize: common.font16,
            color: common.placeholderColor,
            alignSelf: 'center',
          }}
          >可用</Text>
          <Text style={{
            marginTop: common.margin10,
            fontSize: common.font30,
            alignSelf: 'center',
            color: 'white',
          }}
          >{`133${selectedMoney}`}</Text>
          <TextInput
            style={{
              marginTop: common.margin35,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h35,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="提现金额"
            placeholderTextColor={common.placeholderColor}
          />

          <View
            style={{
              marginTop: common.margin5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
                alignSelf: 'center',
              }}
            >{`手续费：88${selectedMoney}`}</Text>
            <Text
              style={{
                marginRight: common.margin10,
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
                alignSelf: 'center',
              }}
            >{`实际到账：88${selectedMoney}`}</Text>
          </View>

          <TextInput
            style={{
              marginTop: common.margin35,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h35,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
              textAlign: 'center',
            }}
            placeholder="地址"
            placeholderTextColor={common.placeholderColor}
          />
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.addAddressPress(selectedMoney)}
          >
            <View
              style={{
                marginLeft: common.margin10,
                marginRight: common.margin10,
                height: common.h35,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: common.borderColor,
                backgroundColor: common.navBgColor,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
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
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        <ScrollView>
          <SelectMoney selectedMoney={money => this.selectedMoney(money)} />

          {this.renderBottomView(this.state.selectedMoney)}
        </ScrollView>
      </View>
    )
  }
}
