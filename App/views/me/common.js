import { Dimensions, StyleSheet } from 'react-native'

const screenH = Dimensions.get('window').height
const screenW = Dimensions.get('window').width

const common = {
  bgColor: '#171B29', // 视图背景色
  navigatorBgColor: 'rgb(38,42,65)', // 导航栏背景色
  placeholderTextColor: '#5F6786', //  站位文字的颜色

  navigatorLeftViewMarginLeft: 10, //  导航栏左侧按钮距离左侧距离
  loadPhotoImageMarginTop: 30, // 上传照片视图中加号的顶部距离
  cellImageMarginLeft: 10, //  单元格中图标左侧距离
  navigatorLeftImageW: 10, //  导航栏左侧按钮高度
  navigatorLeftImageH: 20, //  导航栏左侧按钮高度
  firstCellMarginTop: 10, //  首个单元格顶部高度
  loadPhotoImageW: 40, // 上传照片视图中加号按钮
  loadPhotoViewH: 120, //  上传照片视图的高度
  navigatorMarginTop: 20, // 导航栏顶部距离
  cellImageW: 20, //  单元格左侧图标宽高
  firstCellH: 50, //  首个单元格高度
  navigatorH: 44, // 导航栏高度
  cellGap: 5, //  单元格间隙
  cellH: 40, // 单元格高度
  screenH,
  screenW,

  cellFontSize: 14, //  单元格字体
  navigatorTitleFont: 16, // 导航栏标题字体
  firstCellFontSize: 16, //  首个单元格字体

  activeOpacity: 0.7, //  按钮点击透明度
}

const styles = StyleSheet.create({
  // 视图的样式
  viewStyle: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  // 单元格视图样式
  cellViewStyle: {
    marginTop: common.cellGap,
    height: common.cellH,
    backgroundColor: 'rgb(38,42,65)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 单元格中左侧图标样式
  cellLeftImageStyle: {
    marginLeft: common.cellImageMarginLeft,
    width: common.cellImageW,
    height: common.cellImageW,
    alignSelf: 'center',
  },
  // 单元格字体样式
  cellTextStyle: {
    marginLeft: common.cellImageMarginLeft,
    fontSize: common.cellFontSize,
    color: 'rgb(223,228,225)',
    alignSelf: 'center',
  },
  // 单元格右侧图标样式
  cellRightImageStyle: {
    marginRight: common.cellImageMarginLeft,
    width: common.navigatorLeftImageW,
    height: common.navigatorLeftImageH,
  },
  // 底部按钮视图样式
  bottomBtnViewStyle: {
    marginTop: common.cellH,
    height: common.cellH,
    backgroundColor: 'rgb(38,42,65)',
    justifyContent: 'center',
  },
  // 底部按钮视图标题样式
  bottomBtnTextStyle: {
    color: 'rgb(255,213,2)',
    alignSelf: 'center',
    fontSize: common.firstCellFontSize,
  },
  // 输入框所在视图的样式
  inputViewStyle: {
    marginTop: common.firstCellMarginTop,
    marginLeft: common.firstCellMarginTop,
    marginRight: common.firstCellMarginTop,
    backgroundColor: 'rgb(38,42,65)',
    borderWidth: 1,
    borderColor: '#2F3752',
    height: common.cellH,
    justifyContent: 'center',
  },
  // 输入框样式
  inputStyle: {
    marginLeft: common.cellImageMarginLeft,
  },
  // 上传图片视图中图标的样式
  loadPhotoImageStyle: {
    marginTop: common.loadPhotoImageMarginTop,
    alignSelf: 'center',
    width: common.loadPhotoImageW,
    height: common.loadPhotoImageW,
  },
  // 上传图片视图中文字样式
  loadPhotoTextStyle: {
    marginTop: common.firstCellMarginTop,
    color: common.placeholderTextColor,
    alignSelf: 'center',
  },
  // 认证成功图片样式
  successfulImageStyle: {
    marginTop: 120,
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
  // 认证成功文字样式
  successfulTextStyle: {
    marginTop: 20,
    color: 'rgb(223,228,225)',
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
  },
  // 再次认证按钮标题样式
  confirmAgainTextStyle: {
    color: 'rgb(255,213,2)',
    fontSize: 16,
    alignSelf: 'center',
  },
})

module.exports = {
  common,
  styles,
}
