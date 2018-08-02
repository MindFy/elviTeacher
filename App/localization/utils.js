export default function (language, key) {
  let localizationJSON = {}
  switch (language) {
    case 'zh_hans':
      localizationJSON = require('./localization_zh_cn.json')
      break
    case 'zh_hant':
      localizationJSON = require('./localization_zh_tw.json')
      break
    case 'ja':
    case 'ko':
    default:
      localizationJSON = require('./localization_en.json')
      break
  }
  return localizationJSON[key] || ''
}
