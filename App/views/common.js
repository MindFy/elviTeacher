import { Dimensions } from 'react-native'

const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width
const w = 375

const common = {
  redColor: 'rgb(213,69,80)',
  bidColor: 'rgba(0,205,0,1)',
  askColor: 'rgba(205,0,0,1)',
  greenColor: 'rgb(36,199,139)',
  navBgColor: 'rgb(38,42,65)', // 导航栏背景色
  borderColor: 'rgb(52,60,92)',
  borderColor05: 'rgba(52,60,92,0.5)',
  textColor: 'rgb(223,228,255)', // 单元格内文字颜色
  btnTextColor: 'rgb(255,213,2)',
  loginBtnBgColor: 'rgb(255,213,1)', // 较宽按钮背景色
  placeholderColor: 'rgb(97,105,137)',

  bgColor: '#171B29', // 视图背景色

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
  margin210: 210 / w * sw,

  w10: 10 / w * sw,
  w20: 20 / w * sw,
  w25: 25 / w * sw,
  w40: 40 / w * sw,
  w60: 60 / w * sw,
  w100: 100 / w * sw,
  w120: 120 / w * sw,
  w150: 150 / w * sw,

  h5: 5 / w * sw,
  h13: 13 / w * sw, // 首页详情页面中向上箭头高度
  h20: 20 / w * sw,
  h32: 32 / w * sw,
  h35: 35 / w * sw,
  h40: 40 / w * sw,
  h44: 44, // 导航栏高度
  h50: 50 / w * sw,
  h56: 56 / w * sw,
  h60: 60 / w * sw, // 当前委托cell高度
  h70: 70 / w * sw, // 首页Cell高度
  h80: 80 / w * sw,
  h97: 97 / w * sw,
  h120: 120 / w * sw,
  h233: 233 / w * sw, // 首页公告图片高度

  font30: 30 / w * sw,
  font20: 20 / w * sw,
  font16: 16 / w * sw,
  font14: 14 / w * sw,
  font12: 12 / w * sw,
  font10: 10 / w * sw,

  radius6: 6,

  activeOpacity: 0.7,
}

module.exports = {
  common,
}
