import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../../constants/common'

const styles = StyleSheet.create({
  contant: {
    alignSelf: 'center',
    marginTop: -200,
    width: '80%',
    backgroundColor: 'white',
  },
  title: {
    marginTop: common.margin20,
    textAlign: 'center',
    color: common.blackColor,
    fontSize: common.font12,
  },
  underline: {
    marginTop: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    backgroundColor: 'rgb(216,216,216)',
    height: 1,
  },
  inputView: {
    marginTop: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    flexDirection: 'row',
  },
  inputTitle: {
    marginTop: common.margin5,
    color: common.blackColor,
    fontSize: common.font12,
  },
  input: {
    padding: 0,
    paddingLeft: common.margin5,
    paddingBottom: common.margin5,
    paddingRight: common.margin5,
    paddingTop: common.margin5,
    height: common.h60,
    flex: 1,
    borderColor: 'rgb(216,216,216)',
    borderWidth: 1,
    color: common.placeholderColor,
    fontSize: common.font10,
  },
  tip: {
    marginTop: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    color: 'black',
    fontSize: common.font10,
  },
  cancelBtnView: {
    marginTop: common.margin10,
    marginBottom: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cancelBtn: {
    height: common.h30,
    width: common.h70,
    borderColor: 'rgb(216,216,216)',
    borderWidth: 1,
    justifyContent: 'center',
  },
  confirmBtn: {
    height: common.h30,
    width: common.h70,
    backgroundColor: common.btnTextColor,
    justifyContent: 'center',
  },
  cancelTitle: {
    color: 'black',
    fontSize: common.font12,
    alignSelf: 'center',
  },
})

export default class AllegeView extends PureComponent {
  render() {
    const {
      style,
      onPress,
      inputValue,
      onChangeText,
      placeholder,
      cancelPress,
      confirmPress,
    } = this.props

    return (
      <TouchableOpacity
        style={style}
        activeOpacity={common.activeOpacity}
        onPress={onPress}
      >
        <TouchableOpacity
          style={styles.contant}
          activeOpacity={1}
          onPress={() => { }}
        >
          <Text style={styles.title}>投诉</Text>
          <View style={styles.underline} />
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>事由：</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder={placeholder}
              placeholderTextColor={'rgb(216,216,216)'}
              value={inputValue}
              onChangeText={onChangeText}
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.tip}>
            投诉后，请耐心等待客服联络。若仍有其他信息需要反馈，请发送邮件至客服邮箱:service@tok.com，客服将尽快为您处理。
          </Text>
          <View style={styles.underline} />
          <View style={styles.cancelBtnView}>
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={common.activeOpacity}
              onPress={cancelPress}
            >
              <Text style={styles.cancelTitle}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              activeOpacity={common.activeOpacity}
              onPress={confirmPress}
            >
              <Text style={styles.cancelTitle}>确定</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}
