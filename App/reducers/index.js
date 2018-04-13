import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import resetPassword from './resetPassword'
import me from './me'

const rootReducer = combineReducers({
  login,
  register,
  resetPassword,
  me,
})

export default rootReducer
