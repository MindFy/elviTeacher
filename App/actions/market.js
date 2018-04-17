import {
  GET_ROSE_UPDATE,
  GET_ROSE_REQUEST,
} from '../constants/index'

export function getRoseRequest() {
  return {
    type: GET_ROSE_REQUEST,
  }
}

export function getRoseUpdate(rose) {
  return {
    type: GET_ROSE_UPDATE,
    rose,
  }
}
