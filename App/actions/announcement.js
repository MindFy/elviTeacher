import {
  FIND_ANNOUNCEMENT_REQUEST,
} from '../constants/index'

export default function findAnnouncement(schema) {
  return {
    type: FIND_ANNOUNCEMENT_REQUEST,
    schema,
  }
}
