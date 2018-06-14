import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'

class NextTouchableOpacity extends PureComponent {
  press(onPress, delay = 500) {
    if (global.didPress) {
      return
    }
    global.didPress = true
    onPress()
    setTimeout(() => {
      global.didPress = false
    }, delay)
  }

  render() {
    const { onPress, children, delay } = this.props
    return (
      <TouchableOpacity
        {...this.props}
        onPress={() => {
          if (onPress) {
            this.press(onPress, delay)
          }
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

module.exports = NextTouchableOpacity
