import {
  Dimensions,
  AsyncStorage,
} from 'react-native'
import { BigNumber } from 'bignumber.js'

const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width
const w = 375

const common = {
  badNet: 'Network request failed',

  selectedTokenDefault: '选择币种',

  noti: {
    home: 'home',
    updateEmail: 'updateEmail',
    idCardAuth: 'idCardAuth',
    delegateAllCancel: 'delegateAllCancel',
    legalDealConfirmPay: 'legalDealConfirmPay',
    addAddress: 'addAddress',
  },

  buy: 'buy',
  sell: 'sell',
  btcAddress: '52e0f0b18bd737ba65cc1028195342533bd2184b939e26dc51031b0dfeeefacb',

  payment: {
    charge: {
      BTC: 0.001,
      ETH: 0.01,
    },
    limitRecharge: 10,
    limitWithdraw: 10,
    recharge: 'recharge',
    withdraw: 'withdraw',
    legalDeal: 'legalDeal',
  },

  delegate: {
    limtCurrent: 10,
    limtHistory: 10,
    current: 'current',
    history: 'history',
    status: {
      dealing: 'dealing',
      waiting: 'waiting',
      complete: 'complete',
      cancel: 'cancel',
    },
  },

  ws: {
    handicap: 'handicap',
    market: 'market',
    deals: 'deals',
    delegates: 'delegates',
  },

  token: {
    TK: 'TK',
    BTC: 'BTC',
    CNYT: 'CNYT',
    CNY: 'CNY',
    ETH: 'ETH',
  },

  legalDeal: {
    limit: 10,
    token: 'CNYT',
    status: {
      waitpay: 'waitpay',
      waitconfirm: 'waitconfirm',
      complete: 'complete',
      cancel: 'cancel',
    },
  },

  selectionBar: {
    left: 'left',
    right: 'right',
    third: 'third',
  },

  ui: {
    kLine: 'kLine',
    depth: 'depth',
    averagePrice: 'averagePrice',
    price: 'price',
    dealled: 'dealled',
    quantity: 'quantity',
  },

  user: {
    string: 'user',
    status: {
      never: 'never',
      waiting: 'waiting',
      pass: 'pass',
      refuse: 'refuse',
      bind: 'bind',
      unbind: 'unbind',
    },
    level0: 'level0',
    level1: 'level1',
  },

  redColor: 'rgb(213,69,80)',
  bidColor: 'rgba(0,205,0,1)',
  askColor: 'rgba(205,0,0,1)',
  greenColor: 'rgb(36,199,139)',
  blackColor: 'rgb(24,27,42)',

  navBgColor: 'rgb(38,43,65)', // 导航栏背景色
  borderColor: 'rgb(52,60,92)',
  borderColor05: 'rgba(52,60,92,0.5)',
  textColor: 'rgb(223,228,255)', // 单元格内文字颜色
  btnTextColor: 'rgb(255,213,2)',
  loginBtnTitleColor: '#191B2B', // 登录/注册/下一步标题颜色
  loginBtnBgColor: 'rgb(255,213,1)', // 较宽按钮背景色
  placeholderColor: 'rgb(97,105,137)',
  rgb242: 'rgb(242,242,242)',
  rgb223: 'rgb(223,223,223)',

  bgColor: 'rgb(24,27,42)', // 视图背景色

  sw,
  sh,

  margin5: 5 / w * sw,
  margin8: 8 / w * sw,
  margin10: 10 / w * sw,
  margin12: 12 / w * sw,
  margin15: 15 / w * sw,
  margin20: 20 / w * sw,
  margin22: 22 / w * sw,
  margin25: 25 / w * sw,
  margin28: 28 / w * sw,
  margin30: 30 / w * sw,
  margin35: 35 / w * sw,
  margin36: 36 / w * sw,
  margin38: 38 / w * sw,
  margin40: 40 / w * sw,
  margin48: 48 / w * sw,
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
  h14_5: 14.5 / w * sw, // 交易五档文字高度
  h15: 15 / w * sw,
  h20: 20 / w * sw,
  h30: 30 / w * sw,
  h32: 32 / w * sw,
  h35: 35 / w * sw,
  h36: 36 / w * sw,
  h40: 40 / w * sw,
  h44: 44, // 导航栏高度
  h50: 50 / w * sw,
  h56: 56 / w * sw,
  h60: 60 / w * sw, // 当前委托cell高度
  h70: 70 / w * sw, // 首页Cell高度
  h80: 80 / w * sw,
  h97: 97 / w * sw,
  h100: 100 / w * sw, // 二维码宽高
  h120: 120 / w * sw, // 超级返利已推荐好友
  h154: 154 / w * sw, // 短信验证码视图高度
  h234: 234 / w * sw, // 首页公告图片高度

  font30: 30 / w * sw,
  font20: 20 / w * sw,
  font17: 17 / w * sw,
  font16: 16 / w * sw,
  font14: 14 / w * sw,
  font12: 12 / w * sw,
  font10: 10 / w * sw,

  radius6: 6,

  activeOpacity: 0.7,

  regMobile: /^1[3|4|5|8][0-9]\d{4,8}$/,
  regMobileMsg: '请输入正确的手机号', // 手机号提示
  regPassword: /^(?=.*[0-9].*)(?=.*[A-Z].*).{6,20}$/, // 密码正则
  regSpace: /^[^ ]+$/, // 空格正则
  regPasswordMsg: '密码为6-20位数字和字符, 至少一个大写字母', // 密码提示
  regIdCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  regBankName: /^[\u4e00-\u9fa5]{4}/,
  regBankNo: /[0-9]{16,19}$/,
  regEmail: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  toFix2(text) { return `${text}`.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') },
  toFix4(text) { return `${text}`.replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3') },
  toFix6(text) { return `${text}`.replace(/^(-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3') },
  toFix8(text) { return `${text}`.replace(/^(-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3') },

  textInputMaxLenPwd: 20,
  textInputMaxLenIdNo: 18,
  textInputMaxLenBankNo: 19,
  textInputMaxLenBankName: 15,
  textInputMaxLenLegalDeal: 7,

  maxQuantityLegalDeal: 1000000,
  minQuantityLegalDeal: 100,
  minQuantityTK: 10,
  minQuantityBTC: 0.000001,

  messageBarDur: 2000,

  dfFullDate(dateStr) {
    const createdAtDate = new Date(dateStr)
    const getYear = createdAtDate.getFullYear()
    const getMonthTemp = createdAtDate.getMonth() + 1
    const getMonth = getMonthTemp < 10 ?
      `0${getMonthTemp}` :
      getMonthTemp
    const getDate = createdAtDate.getDate() < 10 ?
      `0${createdAtDate.getDate()}` :
      createdAtDate.getDate()
    const getHours = createdAtDate.getHours() < 10 ?
      `0${createdAtDate.getHours()}` :
      createdAtDate.getHours()
    const getMinutes = createdAtDate.getMinutes() < 10 ?
      `0${createdAtDate.getMinutes()}` :
      createdAtDate.getMinutes()
    const getSeconds = createdAtDate.getSeconds() < 10 ?
      `0${createdAtDate.getSeconds()}` :
      createdAtDate.getSeconds()
    const dfStr = `${getYear}/${getMonth}/${getDate} ${getHours}:${getMinutes}:${getSeconds}`
    return dfStr
  },
  dfTime(dateStr) {
    const createdAtDate = new Date(dateStr)
    const getHours = createdAtDate.getHours() < 10 ?
      `0${createdAtDate.getHours()}` :
      createdAtDate.getHours()
    const getMinutes = createdAtDate.getMinutes() < 10 ?
      `0${createdAtDate.getMinutes()}` :
      createdAtDate.getMinutes()
    const getSeconds = createdAtDate.getSeconds() < 10 ?
      `0${createdAtDate.getSeconds()}` :
      createdAtDate.getSeconds()
    const dfStr = `${getHours}:${getMinutes}:${getSeconds}`
    return dfStr
  },
  bigNumber: {
    plus(a, b) { // "+"
      return Number(BigNumber(a).plus(b).valueOf())
    },
    dividedBy(a, b) { // "/"
      return Number(BigNumber(a).dividedBy(b).valueOf())
    },
    multipliedBy(a, b) { // "*"
      return Number(BigNumber(a).multipliedBy(b).valueOf())
    },
    minus(a, b) { // "-"
      return Number(BigNumber(a).minus(b).valueOf())
    },
    gt(a, b) { // ">"
      return BigNumber(a).gt(b)
    },
    lt(a, b) { // "<"
      return BigNumber(a).lt(b)
    },
  },
}

function storeSave(name, object, block) {
  AsyncStorage.setItem(name, JSON.stringify(object), block)
}

function storeRead(name, block) {
  AsyncStorage.getItem(name, (error, result) => {
    if (!error && result) {
      block(result)
    }
  })
}

function storeDelete(name, block) {
  AsyncStorage.removeItem(name, block)
}

module.exports = {
  common,
  storeSave,
  storeRead,
  storeDelete,
}
