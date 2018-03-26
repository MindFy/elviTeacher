import { Dimensions, StyleSheet } from 'react-native'

const screenH = Dimensions.get('window').height
const screenW = Dimensions.get('window').width

const Common = {

  bgColor: '#171B29', // 视图背景色
  btnColor: '#E4BE07', // 普通按钮文字颜色
  textColor: '#BCC2DB', // 输入框左边文字颜色
  plusBtnBgColor: '#FAD405', // 较宽按钮背景色
  plusBtnTextColor: 'white', // 较宽按钮的文字颜色
  inputViewBgColor: '#262B41', // 输入框视图背景色
  inputViewBorderColor: '#2F3752', // 输入框视图边框颜色
  inputPlaceholderColor: '#5F6786', // 输入框占位文字颜色

  activeOpacity: 0.7, //  所有按钮点击的透明度

  btnFontSize: screenW > 375 ? 14 : (screenW === 375 ? 12 : 10), // 普通按钮字体
  textFontSize: screenW > 375 ? 16 : (screenW === 375 ? 14 : 12), // 输入框左边文字大小
  plusBtnFontSize: screenW > 375 ? 20 : (screenW === 375 ? 18 : 16), // 较宽按钮字体

  inputH: screenW >= 375 ? 44 : 35, // 输入框高度
  textWidthSmall: screenW / 100 * 15, // 输入框左边文字宽度
  textWidthMiddle: screenW / 100 * 26, // 输入框左边文字宽度
  textWidthPlus: screenW / 100 * 29, // 输入框左边文字宽度
  textMarginLeft: screenW / 100 * 3, // 输入框左边文字左侧距离所在视图的间隔
  inputViewMarginLeft: screenW / 100 * 9, // 输入框视图距离屏幕左侧的距离

  screenW,
  screenH,
}

const Styles = StyleSheet.create({
  // 滑动视图的样式
  scrollViewStyle: {
    flex: 1,
    backgroundColor: Common.bgColor,
  },
  // 输入框所在视图的样式
  inputViewStyle: {
    marginRight: Common.inputViewMarginLeft,
    marginLeft: Common.inputViewMarginLeft,
    height: Common.inputH,
    flexDirection: 'row',
    backgroundColor: Common.inputViewBgColor,
    borderWidth: 1,
    borderColor: Common.inputViewBorderColor,
  },
  // 输入框的样式
  inputStyle: {
    fontSize: Common.textFontSize,
  },
  // 输入框左边的文字样子
  textStyle: {
    width: Common.textWidthSmall,
    marginLeft: Common.textMarginLeft,
    alignSelf: 'center',
    fontSize: Common.textFontSize,
    color: Common.textColor,
  },
  // 获取验证码所在视图的样式
  codeBtnViewStyle: {
    justifyContent: 'center',
    marginRight: Common.textMarginLeft,
  },
  // 获取验证码d 文本样式
  codeBtnTextStyle: {
    color: Common.btnColor,
    textAlign: 'center',
    fontSize: Common.btnFontSize,
  },
  // 文本框底下两个按钮所在视图的样式
  smallBtnViewStyle: {
    marginTop: Common.textMarginLeft,
    marginLeft: Common.inputViewMarginLeft,
    marginRight: Common.inputViewMarginLeft,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // 按钮左侧文字样式
  smallBtnLeftTextStyle: {
    alignSelf: 'center',
    color: Common.textColor,
    fontSize: Common.btnFontSize,
  },
  // 文本框底下两个按钮的文本样式
  smallBtnTextStyle: {
    color: Common.btnColor,
    fontSize: Common.btnFontSize,
  },
  // 视图底部按钮的样式
  bottomBtnViewStyle: {
    marginTop: Common.inputViewMarginLeft,
    marginLeft: Common.inputViewMarginLeft,
    marginRight: Common.inputViewMarginLeft,
    height: Common.inputH,
    backgroundColor: Common.plusBtnBgColor,
    justifyContent: 'center',
    borderRadius: 5,
  },
  // 视图底部按钮的文本样式
  bottomBtnTextStyle: {
    color: Common.plusBtnTextColor,
    textAlign: 'center',
    fontSize: Common.plusBtnFontSize,
  },
})

module.exports = {
  Common,
  Styles,
}
