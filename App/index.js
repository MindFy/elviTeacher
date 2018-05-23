import React from 'react'
import { Provider } from 'react-redux'
import Navigator from './Navigator'
import configureStore from './store/configureStore'

const store = configureStore()
export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}
