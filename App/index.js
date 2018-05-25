import React from 'react'
import { Provider } from 'react-redux'
import Navigator from './Navigator'
import configureStore from './store/configureStore'

export const store = configureStore()
export function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}
