import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from './Navigator'

export default class Settings extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgb(38,42,65)'}
        />
        <Navigator
          headerTitle='修改密码'
          leftImagePress={() => this.props.navigation.goBack()} />
        <ScrollView style={{

        }} >

          <View style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'rgb(38,42,65)',
            borderWidth: 1,
            borderColor: '#2F3752',
            height: 40,
            justifyContent: 'center',
          }} >
            <TextInput style={{
              marginLeft: 10,
            }}
              placeholder={'旧密码'}
              placeholderTextColor={'#5F6786'} />
          </View>

          <View style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'rgb(38,42,65)',
            borderWidth: 1,
            borderColor: '#2F3752',
            height: 40,
            justifyContent: 'center',
          }} >
            <TextInput style={{
              marginLeft: 10,
            }}
              placeholder={'输入密码'}
              placeholderTextColor={'#5F6786'} />
          </View>

          <View style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'rgb(38,42,65)',
            borderWidth: 1,
            borderColor: '#2F3752',
            height: 40,
            justifyContent: 'center',
          }} >
            <TextInput style={{
              marginLeft: 10,
            }}
              placeholder={'再次输入密码'}
              placeholderTextColor={'#5F6786'} />
          </View>

          <TouchableOpacity
            activeOpacity={0.7} >
            <View style={{
              marginTop: 40,
              marginLeft: 10,
              marginRight: 10,
              height: 40,
              backgroundColor: 'rgb(38,42,65)',
              justifyContent: 'center',
            }} >
              <Text style={{
                color: 'rgb(255,213,2)',
                fontSize: 16,
                alignSelf: 'center',
              }} >确认</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}