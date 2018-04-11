import { combineReducers } from 'redux'
import login from '../views/login/reducers/login'
import register from '../views/login/reducers/register'

const rootReducer = combineReducers({
  login,
  register,
})

export default rootReducer
