import {
  GET_ROSE_REQUEST,
} from '../constants/index'

export default function getRose(data) {
  return {
    type: GET_ROSE_REQUEST,
    data,
  }
}
