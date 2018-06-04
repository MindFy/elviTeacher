import * as constants from '../constants/index'

export default function invitationTotalCount(data) {
  return {
    type: constants.INVITATION_TOTAL_COUNT_REQUEST,
    data,
  }
}
