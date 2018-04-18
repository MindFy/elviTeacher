import {
  FIND_BANNERS_REQUEST,
} from '../constants/index'

export default function findBanners(schema) {
  return {
    type: FIND_BANNERS_REQUEST,
    schema,
  }
}
