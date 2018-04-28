import * as constants from '../constants/index'

const initialState = {
  user: undefined,

  name: '',
  idNo: '',
  idCardImages: {},
  authenticationAgain: false,

  mobileLogin: '',
  passwordLogin: '',

  mobileRegister: '',
  codeRegister: '',
  passwordRegister: '',
  passwordAgainRegister: '',

  oldPassword: '',
  newPassword: '',
  newPasswordAgain: '',

  bankName: '中国人民银行',
  subbankName: '南京支行',
  bankNo: '6222022462426230354',

  checkVerificateCodeVisible: false,
  checkVerificateCodeResponse: undefined,

  getVerificateCodeVisible: false,
  getVerificateCodeResponse: undefined,

  findUserVisible: false,
  findUserResponse: undefined,

  idCardAuthVisible: false,
  idCardAuthResponse: undefined,

  isExistVisible: false,
  isExistResponse: undefined,

  loginVisible: false,
  loginResponse: undefined,

  logoutVisible: false,
  logoutResponse: undefined,

  registerVisible: false,
  registerResponse: undefined,

  resetPasswordVisible: false,
  resetPasswordResponse: undefined,

  updatePasswordVisible: false,
  updatePasswordResponse: undefined,

  updateBankVisible: false,
  updateBankResponse: undefined,
}

export default function user(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.CHECK_VERIFICATE_CODE_REQUEST:
      nextState = {
        ...state,
        checkVerificateCodeVisible: true,
      }
      break
    case constants.CHECK_VERIFICATE_CODE_SUCCEED:
      nextState = {
        ...state,
        checkVerificateCodeVisible: false,
        checkVerificateCodeResponse: action.response,
      }
      break
    case constants.CHECK_VERIFICATE_CODE_FAILED:
      nextState = {
        ...state,
        checkVerificateCodeVisible: false,
        checkVerificateCodeResponse: action.response,
      }
      break
    case constants.GET_VERIFICATE_CODE_REQUEST:
      nextState = {
        ...state,
        getVerificateCodeVisible: true,
      }
      break
    case constants.GET_VERIFICATE_CODE_SUCCEED:
      nextState = {
        ...state,
        getVerificateCodeVisible: false,
        getVerificateCodeResponse: action.response,
      }
      break
    case constants.GET_VERIFICATE_CODE_FAILED:
      nextState = {
        ...state,
        getVerificateCodeVisible: false,
        getVerificateCodeResponse: action.response,
      }
      break
    case constants.FIND_USER_SUCCEED:
      nextState = {
        ...state,
        user: action.user,
      }
      break
    case constants.FIND_USER_UPDATE:
      nextState = {
        ...state,
        user: action.user,
      }
      break
    case constants.IMG_HASH_REQUEST:
      nextState = {
        ...state,
        idCardAuthVisible: true,
      }
      break
    case constants.ID_CARD_AUTH_SUCCEED:
      nextState = {
        ...state,
        idCardAuthVisible: false,
        idCardAuthResponse: action.response,
      }
      break
    case constants.ID_CARD_AUTH_FAILED:
      nextState = {
        ...state,
        idCardAuthVisible: false,
        idCardAuthResponse: action.response,
      }
      break
    case constants.ID_CARD_AUTH_UPDATE:
      nextState = {
        ...state,
        name: action.data.name,
        idNo: action.data.idNo,
        idCardImages: action.data.idCardImages,
        authenticationAgain: action.data.authenticationAgain,
      }
      break
    case constants.IS_EXIST_REQUEST:
      nextState = {
        ...state,
        isExistVisible: true,
      }
      break
    case constants.IS_EXIST_SUCCEED:
      nextState = {
        ...state,
        isExistVisible: false,
        isExistResponse: action.response,
      }
      break
    case constants.IS_EXIST_FAILED:
      nextState = {
        ...state,
        isExistVisible: false,
        isExistResponse: action.response,
      }
      break
    case constants.LOGIN_REQUEST:
      nextState = {
        ...state,
        loginVisible: true,
      }
      break
    case constants.LOGIN_SUCCEED:
      nextState = {
        ...state,
        loginVisible: false,
        loginResponse: action.response,
      }
      break
    case constants.LOGIN_FAILED:
      nextState = {
        ...state,
        loginVisible: false,
        loginResponse: action.response,
      }
      break
    case constants.LOGIN_UPDATE:
      nextState = {
        ...state,
        mobileLogin: action.data.mobile,
        passwordLogin: action.data.password,
      }
      break
    case constants.LOGOUT_REQUEST:
      nextState = {
        ...state,
        logoutVisible: true,
      }
      break
    case constants.LOGOUT_SUCCEED:
      nextState = {
        ...state,
        logoutVisible: false,
        logoutResponse: action.response,
      }
      break
    case constants.LOGOUT_FAILED:
      nextState = {
        ...state,
        logoutVisible: false,
        logoutResponse: action.response,
      }
      break
    case constants.REGISTER_REQUEST:
      nextState = {
        ...state,
        registerVisible: true,
      }
      break
    case constants.REGISTER_SUCCEED:
      nextState = {
        ...state,
        registerVisible: false,
        registerResponse: action.response,
      }
      break
    case constants.REGISTER_FAILED:
      nextState = {
        ...state,
        registerVisible: false,
        registerResponse: action.response,
      }
      break
    case constants.REGISTER_UPDATE:
      nextState = {
        ...state,
        mobileRegister: action.data.mobile,
        codeRegister: action.data.code,
        passwordRegister: action.data.password,
        passwordAgainRegister: action.data.passwordAgain,
      }
      break
    case constants.RESET_PASSWORD_REQUEST:
      nextState = {
        ...state,
        resetPasswordVisible: true,
      }
      break
    case constants.RESET_PASSWORD_SUCCEED:
      nextState = {
        ...state,
        resetPasswordVisible: false,
        resetPasswordResponse: action.response,
      }
      break
    case constants.RESET_PASSWORD_FAILED:
      nextState = {
        ...state,
        resetPasswordVisible: false,
        resetPasswordResponse: action.response,
      }
      break
    case constants.UPDATE_PASSWORD_REQUEST:
      nextState = {
        ...state,
        updatePasswordVisible: true,
      }
      break
    case constants.UPDATE_PASSWORD_SUCCEED:
      nextState = {
        ...state,
        updatePasswordVisible: false,
        updatePasswordResponse: action.response,
      }
      break
    case constants.UPDATE_PASSWORD_FAILED:
      nextState = {
        ...state,
        updatePasswordVisible: false,
        updatePasswordResponse: action.response,
      }
      break
    case constants.UPDATE_PASSWORD_UPDATE:
      nextState = {
        ...state,
        oldPassword: action.data.oldPassword,
        newPassword: action.data.newPassword,
        newPasswordAgain: action.data.newPasswordAgain,
      }
      break

    case constants.UPDATE_BANK_UPDATE:
      nextState = {
        ...state,
        bankName: action.data.bankName,
        subbankName: action.data.subbankName,
        bankNo: action.data.bankNo,
      }
      break
    case constants.UPDATE_BANK_REQUEST:
      nextState = {
        ...state,
        updateBankVisible: true,
      }
      break
    case constants.UPDATE_BANK_SUCCEED:
      nextState = {
        ...state,
        updateBankVisible: false,
        updateBankResponse: action.response,
      }
      break
    case constants.UPDATE_BANK_FAILED:
      nextState = {
        ...state,
        updateBankVisible: false,
        updateBankResponse: action.response,
      }
      break
    default:
      break
  }

  return nextState
}
