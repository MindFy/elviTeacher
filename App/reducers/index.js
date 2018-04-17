import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import resetPassword from './resetPassword'
import me from './me'
import home from './home'
import delegate from './delegate'
import dealstat from './dealstat'

const rootReducer = combineReducers({
  login,
  register,
  resetPassword,
  me,
  home,
  delegate,
  dealstat,
})

export default rootReducer
