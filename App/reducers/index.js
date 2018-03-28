import { combineReducers } from 'redux'

function reducer1(state = '', action) {
  return state
}

function reducer2(state = '', action) {
  return state
}

const rootReducer = combineReducers({
  reducer1,
  reducer2,
})

export default rootReducer
