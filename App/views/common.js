import { Dimensions, StyleSheet } from 'react-native'

const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width
const w = 375
const h = 667

const common = {
  bgColor: '#171B29', //背景黑色
  bidColor: 'rgba(0,205,0,1)', //买入颜色
  askColor: 'rgba(205,0,0,1)', //卖出颜色
  navBgColor: 'rgb(38,42,65)', //导航栏颜色、文本框背景色
  borderColor: 'rgb(52,60,92)', //边框颜色
  textColor: 'rgb(223,228,255)', //普通白色字体
  btnTextColor: 'rgb(255,213,2)', //按钮黄色
  btnViewBgColor: 'rgb(213,69,80)', //买入/卖出按钮背景色
  loginBtnBgColor: 'rgb(255,213,1)', //登录按钮黄色背景
  placeholderColor: 'rgb(97,105,137)',//站位文字颜色

  sw,
  sh,

  margin5: 5 / w * sw,
  margin8: 8 / w * sw,
  margin10: 10 / w * sw,
  margin15: 15 / w * sw,
  margin20: 20 / w * sw,
  margin22: 22 / w * sw,
  margin28: 28 / w * sw,
  margin30: 30 / w * sw,
  margin35: 35 / w * sw,
  margin36: 36 / w * sw,
  margin38: 38 / w * sw,
  margin40: 40 / w * sw,
  margin60: 60 / w * sw,
  margin110: 110 / w * sw,
  margin127: 127 / w * sw,
  margin210: 210 / w * sw, //忘记密码页面按钮顶部高度

  w10: 10 / w * sw,
  w20: 20 / w * sw,
  w25: 25 / w * sw,
  w40: 40 / w * sw,
  w60: 60 / w * sw,
  w100: 100 / w * sw,
  w120: 120 / w * sw,
  w150: 150 / w * sw, //登录页面logo宽度

  h5: 5 / w * sw,
  h20: 20 / w * sw,
  h32: 32 / w * sw,
  h35: 35 / w * sw,
  h40: 40 / w * sw,
  h50: 50 / w * sw,
  h44: 44,  //导航栏高度
  h80: 80 / w * sw,
  h97: 97 / w * sw,
  h120: 120 / w * sw,

  font30: 30 / w * sw,
  font18: 18 / w * sw,
  font16: 16 / w * sw,
  font14: 14 / w * sw,
  font12: 12 / w * sw,
  font10: 10 / w * sw,

  radius6: 6,

  activeOpacity: 0.7,
}

const styles = StyleSheet.create({
})

module.exports = {
  common,
  styles,
}
