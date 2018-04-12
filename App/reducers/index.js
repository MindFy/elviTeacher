import { combineReducers } from 'redux'
import login from '../views/login/reducers/login'
import register from '../views/login/reducers/register'
import resetPassword from '../views/login/reducers/resetPassword'

const rootReducer = combineReducers({
  login,
  register,
  resetPassword,
})

export default rootReducer
