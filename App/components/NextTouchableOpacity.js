import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'

class NextTouchableOpacity extends PureComponent {
  constructor(props) {
    super(props)
    this.didPress = false
  }

  press(onPress, delay = 500) {
    if (this.didPress) {
      return
    }
    this.didPress = true
    onPress()
    setTimeout(() => {
      this.didPress = false
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
