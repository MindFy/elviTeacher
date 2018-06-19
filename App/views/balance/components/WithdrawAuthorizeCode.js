import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native'
import { common } from '../../../constants/common'
import TKCheckCodeBtn from '../../../components/TKCheckCodeBtn'
import WithdrawAuthSelecionBar from './WithdrawAuthSelecionBar'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: common.getH(48),
    marginRight: common.getH(48),
    borderRadius: common.radius6,
  },
  mobileContainer: {
    marginTop: common.getH(10),
    marginLeft: common.getH(20),
    marginRight: common.getH(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mobileTip: {
    color: common.blackColor,
    fontSize: common.font12,
    alignSelf: 'center',
  },
  mobile: {
    color: common.blackColor,
    fontSize: common.font14,
    width: '62%',
  },
  inputContainer: {
    marginTop: common.getH(12),
    marginLeft: common.getH(20),
    marginRight: common.getH(20),
    marginBottom: common.getH(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputInnerContainer: {
    borderColor: common.lineColor,
    borderWidth: common.getH(1),
    height: common.getH(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '62%',
  },
  textInput: {
    padding: 0,
    marginLeft: common.getH(5),
    color: common.blackColor,
    fontSize: common.font14,
    width: '50%',
  },
  codeContainer: {
    marginRight: common.getH(5),
    alignSelf: 'center',
  },
  fetchCodeTitle: {
    fontSize: common.font10,
  },
  btnsContainer: {
    marginTop: common.getH(10),
    marginLeft: common.getH(20),
    marginRight: common.getH(20),
    marginBottom: common.getH(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleCodeContainer: {
    marginTop: common.getH(25),
    marginBottom: common.getH(24),
    marginLeft: common.getH(20),
    marginRight: common.getH(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleCode: {
    color: common.blackColor,
    fontSize: common.font12,
  },
  googleInputContainer: {
    borderColor: common.lineColor,
    borderWidth: common.getH(1),
    width: '62%',
    height: common.getH(30),
    justifyContent: 'center',
  },
  googleInput: {
    marginLeft: common.margin5,
    color: common.blackColor,
    fontSize: common.font12,
    width: '50%',
  },
  line: {
    marginLeft: common.getH(10),
    marginRight: common.getH(10),
    height: common.getH(1),
    backgroundColor: common.lineColor,
  },
  cancelBtn: {
    width: common.getH(70),
    height: common.getH(30),
    borderColor: common.lineColor,
    borderWidth: common.getH(1),
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: common.blackColor,
    fontSize: common.font12,
    alignSelf: 'center',
  },
})

export default class TKViewCheckAuthorize extends Component {
  componentDidMount() { }

  renderTitles = () => {
    const { titles, segmentValueChanged } = this.props
    return (
      <WithdrawAuthSelecionBar
        titles={titles}
        onPress={(e) => {
          if (segmentValueChanged) {
            segmentValueChanged(e)
          }
        }}
        renderItem={this.renderContent}
      />
    )
  }

  renderSMSCode = () => {
    const { mobile, titles, smsCodePress, onChangeText } = this.props
    const index = titles.indexOf('短信验证码')
    return (
      <View>
        <View style={styles.mobileContainer}>
          <Text style={styles.mobileTip}>手机号</Text>
          <Text style={styles.mobile}>{mobile}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.mobileTip}>短信验证码</Text>
          <View style={styles.inputInnerContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={6}
              onChangeText={text => onChangeText({
                title: '',
                index,
              }, text)}
              underlineColorAndroid="transparent"
            />
            <View style={styles.codeContainer}>
              <TKCheckCodeBtn
                titleStyle={styles.fetchCodeTitle}
                onPress={() => {
                  if (smsCodePress) {
                    smsCodePress()
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderGoogleCode = () => {
    const { onChangeText, titles } = this.props
    const index = titles.indexOf('谷歌验证码')
    return (
      <View style={styles.googleCodeContainer}>
        <Text style={styles.mobileTip}>谷歌验证码</Text>
        <View style={styles.googleInputContainer}>
          <TextInput
            style={styles.textInput}
            maxLength={6}
            onChangeText={text => onChangeText({
              title: '',
              index,
            }, text)}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    )
  }

  renderBtns = () => {
    const { confirmPress, cancelPress } = this.props
    return (
      <View style={styles.btnsContainer}>
        <NextTouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={common.activeOpacity}
          onPress={cancelPress}
        >
          <Text style={styles.cancelBtnText}>取消</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={[styles.cancelBtn, {
            backgroundColor: common.btnTextColor,
            borderWidth: 0,
          }]}
          activeOpacity={common.activeOpacity}
          onPress={() => confirmPress()}
        >
          <Text
            style={[styles.cancelBtnText, {
              color: 'white',
            }]}
          >确定</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderContent = (segmentIndex) => {
    if (segmentIndex === 0) {
      return this.renderSMSCode()
    }
    return this.renderGoogleCode()
  }

  render() {
    return (
      <NextTouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        {this.renderTitles()}
        <View style={styles.line} />
        {this.renderBtns()}
      </NextTouchableOpacity>
    )
  }
}
