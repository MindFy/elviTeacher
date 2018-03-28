import { Dimensions, StyleSheet } from 'react-native'

const screenH = Dimensions.get('window').height
const screenW = Dimensions.get('window').width

const common = {
  bgColor: '#171B29', // 视图背景色
  cellBgColor: 'rgb(52,60,92)', // 单元格背景色
  cellTextColor: 'rgb(223,228,255)', // 单元格内文字颜色
  balanceNumTitleColor: 'rgb(97,105,137)', // 资产标题颜色

  cellH: 40, // 单元格高度
  balanceImageW: 40, // 充值/提现图片宽高
  cellLeftImageW: 20, //  单元格左侧图标宽高
  balanceNumMarginTop: 20, //  资产顶部距离
  balanceImageMarginTop: 20, // 充值/提现图片顶部距离
  rechargeCellRightImageH: 20, // 充值单元格右侧箭头高度
  cellLeftImageMarginLeft: 15, // 单元格左侧图标居左距离
  cellMarginLeft: 10, // 单元格居左距离
  cellTextMarginLeft: 10, // 单元格文字居左距离
  rechargeCellRightImageW: 10, // 充值单元格右侧箭头宽度
  balanceNumTitleMarginTop: 10, // 资产标题顶部距离
  balanceImageTitleMarginTop: 10, // 充值/提现标题顶部高度
  cellBorderRadius: 6, // 单元格倒角
  balanceNumRightTextMarginLeft: 5, // 资产右侧文字左侧距离
  rechargeCellMarginTop: 5, // 充值页面单元格顶部距离
  screenH,
  screenW,

  balanceNumFont: 30, // 资产字体大小
  cellTextFont: 14, // 单元格内文本字体
  balanceImageTitleFont: 14, // 充值/体现标题的大小
  balanceNumRightTextFont: 10, // 资产右侧文字大小

  activeOpacity: 0.7,
}

const styles = StyleSheet.create({
  // 总资产数字所在视图样式
  balanceNumViewStyle: {
    marginTop: common.balanceNumMarginTop,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // 总资产数字样式
  balanceNumStyle: {
    color: common.cellTextColor,
    fontSize: common.balanceNumFont,
    alignSelf: 'center',
  },
  // 总资产右侧单位文字样式
  balanceNumRightTextStyle: {
    marginLeft: common.balanceNumRightTextMarginLeft,
    fontSize: common.balanceNumRightTextFont,
    color: common.balanceNumTitleColor,
  },
  // 总资产标题样式
  balanceNumTitleStyle: {
    marginTop: common.balanceNumTitleMarginTop,
    fontSize: common.balanceImageTitleFont,
    color: common.balanceNumTitleColor,
    alignSelf: 'center',
  },
  // 充值/提现所在视图样式
  balanceImageViewStyle: {
    marginLeft: common.screenW / 4,
    marginRight: common.screenW / 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // 充值/提现图片样式
  balanceImageStyle: {
    marginTop: common.balanceImageMarginTop,
    height: common.balanceImageW,
    width: common.balanceImageW,
  },
  // 单元格样式
  cellStyle: {
    marginLeft: common.cellMarginLeft,
    marginTop: common.cellMarginLeft,
    marginRight: common.cellMarginLeft,
    height: common.cellH,
    backgroundColor: common.cellBgColor,
    flexDirection: 'row',
    borderRadius: common.cellBorderRadius,
    justifyContent: 'space-between',
  },
  // 单元格左侧图标样式
  cellLeftImageStyle: {
    marginLeft: common.cellLeftImageMarginLeft,
    height: common.cellLeftImageW,
    width: common.cellLeftImageW,
    alignSelf: 'center',
  },
  // 单元格标题样式
  cellTitleStyle: {
    marginLeft: common.cellTextMarginLeft,
    fontSize: common.cellTextFont,
    color: common.cellTextColor,
    alignSelf: 'center',
  },
  // 单元格副标题样式
  cellDetailStyle: {
    marginRight: common.cellLeftImageMarginLeft,
    fontSize: common.cellTextFont,
    color: common.cellTextColor,
    alignSelf: 'center',
  },
  // 充值单元格样式
  rechargeCellStyle: {
    marginTop: common.rechargeCellMarginTop,
    height: common.cellH,
    backgroundColor: common.cellBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rechargeCellRightImageStyle: {
    marginRight: common.cellLeftImageMarginLeft,
    height: common.rechargeCellRightImageH,
    width: common.rechargeCellRightImageW,
  },
})
module.exports = {
  common,
  styles,
}
