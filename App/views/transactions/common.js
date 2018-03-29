import { Dimensions, StyleSheet } from 'react-native'

const screenH = Dimensions.get('window').height
const screenW = Dimensions.get('window').width

const common = {
  bgColor: '#171B29', // 视图背景色
  navBgColor: 'rgb(38,42,65)', // 导航栏背景色
  borderColor: 'rgb(52,60,92)',
  placeholderColor: 'rgb(97,105,137)',
  btnViewBgColor: 'rgb(213,69,80)',
  btnTextColor: 'rgb(223,228,255)',
  btnTextSelectedColor: 'rgb(255,213,2)',

  inputH: 35,
  topBarH: 32,
  topBarMarginRight: 22,
  listViewMarginLeft: 10,
  pulldownImageW: 10,
  pulldownImageMarginLeft: 5,
  pulldownImageH: 5,
  w4: screenW / 4,
  w2: screenW / 2,
  screenH,
  screenW,

  equalPriceFont: 10,
  btnTextFont: 14,
  titleFont: 16,

  activeOpacity: 0.7,
}

const styles = StyleSheet.create({

})

module.exports = {
  common,
  styles,
}
