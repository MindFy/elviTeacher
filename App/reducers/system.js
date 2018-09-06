import { getDefaultLanguage } from '../utils/languageHelper'

const initialState = {
  language: getDefaultLanguage(),
}

export default function system(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'system/update_language':
      nextState = {
        ...state,
        language: payload,
      }
      break
    case 'system/reset_language':
      nextState = {
        ...state,
        language: 'zh_ch',
      }
      break
    default:
      nextState = state
      break
  }
  return nextState
}
