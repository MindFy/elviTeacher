import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from './Navigator'

export default class SetPwd extends Component {
  componentDidMount() { }
  changePwd() {
    this.props.navigation.navigate('SetPwd')
  }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgb(38,42,65)'}
        />
        <Navigator
          headerTitle='设置'
          leftImagePress={() => this.props.navigation.goBack()} />
        <ScrollView style={{
          marginTop: 10,
        }} >

          <TouchableOpacity
           activeOpacity={0.7}
          onPress={() => this.changePwd()} >
            <View style={{
              backgroundColor: 'rgb(38,42,65)',
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }} >
              <Text style={{
                marginLeft: 10,
                fontSize: 14,
                color: 'rgb(223,228,225)',
                alignSelf: 'center',
              }} >修改密码</Text>
              <Image style={{
                width: 10,
                marginRight: 10,
                height: 20,
                alignSelf: 'center',
              }}
                source={require('../assets/下拉copy.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} >
            <View style={{
              marginTop: 5,
              backgroundColor: 'rgb(38,42,65)',
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }} >
              <Text style={{
                marginLeft: 10,
                fontSize: 14,
                color: 'rgb(223,228,225)',
                alignSelf: 'center',
              }} >语言选择</Text>
              <Image style={{
                width: 10,
                marginRight: 10,
                height: 20,
                alignSelf: 'center',
              }}
                source={require('../assets/下拉copy.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} >
            <View style={{
              marginTop: 5,
              backgroundColor: 'rgb(38,42,65)',
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }} >
              <Text style={{
                marginLeft: 10,
                fontSize: 14,
                color: 'rgb(223,228,225)',
                alignSelf: 'center',
              }} >版本显示</Text>
              <Image style={{
                width: 10,
                marginRight: 10,
                height: 20,
                alignSelf: 'center',
              }}
                source={require('../assets/下拉copy.png')} />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}
