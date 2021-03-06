import * as constants from '../constants/index'

const initialState = {
  user: undefined,

  name: '',
  idNo: '',
  idCardImages: {},
  authenticationAgain: false,

  googleAuth: false,

  mobileLogin: '',
  passwordLogin: '',

  mobileRegister: '',
  codeRegister: '',
  passwordRegister: '',
  passwordAgainRegister: '',
  recommendNo: '',

  oldPassword: '',
  newPassword: '',
  newPasswordAgain: '',

  email: '',
  codeEmail: '',
  mobile: '',
  codeMobile: '',
  codeGoogle: '',

  findUserVisible: false,
  findUserResponse: undefined,

  idCardAuthVisible: false,
  idCardAuthResponse: undefined,

  isExistVisible: false,
  isExistResponse: undefined,

  registerVisible: false,
  registerResponse: undefined,

  resetPasswordVisible: false,
  resetPasswordResponse: undefined,

  updatePasswordVisible: false,
  updatePasswordResponse: undefined,

  updateBankVisible: false,
  updateBankResponse: undefined,

  updateEmailVisible: false,
  updateEmailResult: null,
  updateEmailError: null,

  updateMobileVisible: false,
  updateMobileResult: null,
  updateMobileError: null,

  findAuditmanageData: undefined,

  mobileIsExistRequesting: false,
  mobileIsExist: false,

  requestGetCodeLoading: false,
  requestGetCodeResponse: null,
}

export default function user(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.GET_GOOGLE_AUTH_SUCCEED:
      nextState = {
        ...state,
        googleAuth: true,
      }
      break
    case constants.GET_GOOGLE_AUTH_FAILED:
      nextState = {
        ...state,
        googleAuth: false,
      }
      break
    case constants.GET_VERIFICATE_CODE_REQUEST:
      nextState = {
        ...state,
        requestGetCodeLoading: true,
        requestGetCodeResponse: null,
      }
      break
    case constants.GET_VERIFICATE_CODE_SUCCEED:
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: action.response,
      }
      break
    case constants.GET_VERIFICATE_CODE_FAILED:
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: action.response,
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
    case constants.IMG_HASH_FAILED:
      nextState = {
        ...state,
        idCardAuthVisible: false,
        idCardAuthResponse: undefined,
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
        recommendNo: action.data.recommendNo,
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

    case constants.UPDATE_EMAIL_REQUEST:
      nextState = {
        ...state,
        updateEmailVisible: true,
        updateEmailResult: null,
        updateEmailError: null,
      }
      break
    case constants.UPDATE_EMAIL_SUCCEED:
      nextState = {
        ...state,
        updateEmailVisible: false,
        updateEmailResult: action.payload,
        updateEmailError: null,
      }
      break
    case constants.UPDATE_EMAIL_FAILED:
      nextState = {
        ...state,
        updateEmailVisible: false,
        updateEmailResult: null,
        updateEmailError: action.payload,
      }
      break
    case constants.UPDATE_EMAIL_MOBILE_UPDATE:
      nextState = {
        ...state,
        email: action.data.email,
        codeEmail: action.data.codeEmail,
        mobile: action.data.mobile,
        codeMobile: action.data.codeMobile,
        codeGoogle: action.data.codeGoogle,
      }
      break
    case constants.FIND_AUDIT_MANAGE_SUCCEED:
    case constants.FIND_AUDIT_MANAGE_FAILED:
      nextState = {
        ...state,
        findAuditmanageData: action.data,
      }
      break
    case 'user/mobile_isExist_requesting':
      nextState = {
        ...state,
        mobileIsExistRequesting: true,
        mobileIsExist: false,
      }
      break
    case 'user/mobile_isExist_result':
      nextState = {
        ...state,
        mobileIsExistRequesting: false,
        mobileIsExist: action.data,
      }
      break
    case 'user/mobile_isExist_clear':
      nextState = {
        ...state,
        mobileIsExistRequesting: false,
        mobileIsExist: false,
      }
      break
    case 'register/reset_nexus':
      nextState = {
        ...state,
        mobileRegister: '',
        codeRegister: '',
        passwordRegister: '',
        passwordAgainRegister: '',
        recommendNo: '',
        registerResponse: undefined,
        registerVisible: false,
        requestGetCodeLoading: false,
        requestGetCodeResponse: null,
        mobileIsExistRequesting: false,
        mobileIsExist: false,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    case 'me/update_mobile_request':
      nextState = {
        ...state,
        updateMobileVisible: true,
        updateMobileResult: null,
        updateMobileError: null,
      }
      break
    case 'me/update_mobile_success':
      nextState = {
        ...state,
        updateMobileVisible: false,
        updateMobileResult: action.payload,
        updateMobileError: null,
      }
      break
    case 'me/update_mobile_failed':
      nextState = {
        ...state,
        updateMobileVisible: false,
        updateMobileResult: null,
        updateMobileError: action.payload,
      }
      break
    default:
      break
  }

  return nextState
}
