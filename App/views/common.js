import { Dimensions, StyleSheet } from 'react-native'

const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width
const w = 375
const h = 667

const common = {
  bidColor: 'rgba(0,205,0,1)',
  askColor: 'rgba(205,0,0,1)',
  navBgColor: 'rgb(38,42,65)', // 导航栏背景色
  borderColor: 'rgb(52,60,92)',
  textColor: 'rgb(223,228,255)', // 单元格内文字颜色
  btnTextColor: 'rgb(255,213,2)',
  loginBtnBgColor: 'rgb(255,213,1)', // 较宽按钮背景色
  placeholderColor: 'rgb(97,105,137)',

  bgColor: '#171B29', // 视图背景色
  btnViewBgColor: 'rgb(213,69,80)',

  sw,
  sh,

  margin5: 5,
  margin8: 8,
  margin10: 10,
  margin15: 15,
  margin20: 20,
  margin22: 22,
  margin28: 28,
  margin30: 30 / w * sw,
  margin35: 35 / w * sw,
  margin36: 36 / w * sw,
  margin38: 38 / w * sw,
  margin40: 40 / w * sw,
  margin60: 60 / h * sh,
  margin110: 110 / h * sh,
  margin127: 127 / h * sh,
  margin210: 210 / h * sh,

  w10: 10,
  w20: 20,
  w25: 25,
  w40: 40,
  w60: 60,
  w100: 100 / w * sw,
  w120: 120,
  w150: 150,

  h5: 5 / w * sw,
  h20: 20,
  h32: 32,
  h35: 35,
  h40: 40,
  h50: 50,
  h44: 44,
  h80: 80,
  h97: 97,
  h120: 120,

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
