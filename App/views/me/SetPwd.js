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

export default class SetPwd extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />
        <Navigator
          headerTitle="修改密码"
          leftImagePress={() => this.props.navigation.goBack()}
        />
        <ScrollView>

          <View style={styles.inputViewStyle} >
            <TextInput
              style={styles.inputStyle}
              placeholder={'旧密码'}
              placeholderTextColor={common.placeholderTextColor}
            />
          </View>

          <View style={styles.inputViewStyle} >
            <TextInput
              style={styles.inputStyle}
              placeholder={'输入密码'}
              placeholderTextColor={common.placeholderTextColor}
            />
          </View>

          <View style={styles.inputViewStyle} >
            <TextInput
              style={styles.inputStyle}
              placeholder={'再次输入密码'}
              placeholderTextColor={common.placeholderTextColor}
            />
          </View>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
          >
            <View style={styles.bottomBtnViewStyle} >
              <Text style={styles.bottomBtnTextStyle} >确认</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}
