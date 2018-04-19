import * as constants from '../constants/index'

export default function findBanners(schema) {
  return {
    type: constants.FIND_BANNERS_REQUEST,
    schema,
  }
}
