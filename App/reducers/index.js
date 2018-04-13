import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import resetPassword from './resetPassword'
import me from './me'
import home from './home'

const rootReducer = combineReducers({
  login,
  register,
  resetPassword,
  me,
  home,
})

export default rootReducer
