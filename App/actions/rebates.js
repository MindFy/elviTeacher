import * as constants from '../constants/index'

export default function rebatesCount(data) {
  return {
    type: constants.REBATES_COUNT_REQUEST,
    data,
  }
}
