import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../../../constants/common'
import TKCheckCodeBtn from '../../../components/TKCheckCodeBtn'
import WithdrawAuthSelecionBar from './WithdrawAuthSelecionBar'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: common.margin48,
    marginRight: common.margin48,
    height: '28%',
  },
  phoneContainer: {
    marginTop: common.margin20,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    flexDirection: 'row',
  },
  phoneTip: {
    color: common.blackColor,
    fontSize: common.font12,
    width: '40%',
  },
  phone: {
    color: common.blackColor,
    fontSize: common.font12,
    width: '50%',
  },
  inputContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeTip: {
    color: common.blackColor,
    fontSize: common.font12,
    alignSelf: 'center',
    width: '40%',
  },
  inputInnerContainer: {
    borderColor: common.placeholderColor,
    borderWidth: 1,
    height: common.h30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  textInput: {
    marginLeft: common.margin5,
    color: common.blackColor,
    fontSize: common.font12,
    width: '50%',
  },
  codeContainer: {
    marginRight: common.margin5,
    alignSelf: 'center',
  },
  btnsContainer: {
    left: common.margin20,
    bottom: common.margin15,
    right: common.margin20,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleCodeContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 65,
  },
  googleCode: {
    color: common.blackColor,
    fontSize: common.font12,
  },
  googleInputContainer: {
    borderColor: common.placeholderColor,
    borderWidth: 1,
    width: '60%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  googleInput: {
    marginLeft: common.margin5,
    color: common.blackColor,
    fontSize: common.font12,
    width: '50%',
  },
  line: {
    marginTop: common.margin5,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    height: 0.3,
    backgroundColor: common.bgColor,
  },
})

export default class TKViewCheckAuthorize extends Component {
  componentDidMount() { }

  renderTitles = () => {
    const { titles, segmentValueChanged } = this.props
    return (
      <View style={{
        marginLeft: common.margin20,
        marginRight: common.margin20,
      }}
      >
        <WithdrawAuthSelecionBar
          titles={titles}
          onPress={(e) => {
            if (segmentValueChanged) {
              segmentValueChanged(e)
            }
          }}
          renderItem={this.renderContent}
        />
      </View>
    )
  }

  renderSMSCode = () => {
    const { mobile, titles, smsCodePress, onChangeText } = this.props
    const index = titles.indexOf('短信验证码')
    return (
      <View>
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneTip}>手机号</Text>
          <Text style={styles.phone}>{mobile}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.codeTip}>短信验证码</Text>
          <View style={styles.inputInnerContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={6}
              onChangeText={text => onChangeText({
                title: '',
                index,
              }, text)}
            />
            <View style={styles.codeContainer}>
              <TKCheckCodeBtn
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
      <View>
        <View style={styles.googleCodeContainer}>
          <Text style={styles.codeTip}>谷歌验证码</Text>
          <View style={styles.googleInputContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={6}
              onChangeText={text => onChangeText({
                title: '',
                index,
              }, text)}
            />
            <View style={styles.codeContainer} />
          </View>
        </View>
      </View>
    )
  }

  renderBtns = () => {
    const { confirmPress, cancelPress } = this.props
    return (
      <View style={styles.btnsContainer}>
        <NextTouchableOpacity
          style={{
            width: common.h70,
            height: common.h30,
            borderColor: common.placeholderColor,
            borderWidth: 1,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={cancelPress}
        >
          <Text
            style={{
              color: common.blackColor,
              fontSize: common.font12,
              alignSelf: 'center',
            }}
          >取消</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={{
            width: common.h70,
            height: common.h30,
            backgroundColor: common.btnTextColor,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => confirmPress()}
        >
          <Text
            style={{
              color: 'white',
              fontSize: common.font12,
              alignSelf: 'center',
            }}
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
      <View style={styles.container}>
        {this.renderTitles()}
        <View style={styles.line} />
        {this.renderBtns()}
      </View>
    )
  }
}
