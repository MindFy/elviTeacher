import { combineReducers } from 'redux'
import user from '../views/login/reducer'

function reducer2(state = '', action) {
  return state
}

const rootReducer = combineReducers({
  user,
  reducer2,
})

export default rootReducer
