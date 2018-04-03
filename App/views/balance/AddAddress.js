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

export default class AddAddress extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '添加地址',
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
  componentDidMount() { }
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
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: common.textColor,
              }}
            >{this.props.navigation.state.params.selectedMoney}</Text>
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: 'white',
              }}
              placeholder="备注"
              placeholderTextColor={common.placeholderColor}
            />
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: 'white',
              }}
              placeholder="地址"
              placeholderTextColor={common.placeholderColor}
            />
          </View>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
          >
            <View
              style={{
                marginTop: common.margin40,
                marginLeft: common.margin10,
                marginRight: common.margin10,
                height: common.h40,
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
                  fontSize: common.font16,
                  alignSelf: 'center',
                }}
              >确认</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
