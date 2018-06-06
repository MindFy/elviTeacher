import React, { Component } from 'react'
import {
  Text,
} from 'react-native'
import NextTouchableOpacity from './NextTouchableOpacity'
import { common } from '../constants/common'

class TKCheckCodeBtn extends Component {
  state = {
    title: '验证码',
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID)
    }
  }

  onPress = () => {
    if (this.props.extraDisable) {
      this.props.onPress()
      return
    }
    if (this.timerID) {
      return
    }
    if (this.props.onPress) {
      this.props.onPress()
    }
    this.setState({
      title: `${this.count}s`,
    })
    this.timerID = setInterval(() => {
      if (this.count === 0) {
        this.setState({
          title: '验证码',
        })
        clearImmediate(this.timerID)
        this.timerID = null
        this.count = 60
      } else {
        this.count--
        this.setState({
          title: `${this.count}s`,
        })
      }
    }, 1000)
  }

  count = 60

  render() {
    return (
      <NextTouchableOpacity
        onPress={this.onPress}
      >
        <Text
          style={{
            color: common.btnTextColor,
            fontSize: common.font12,
          }}
        >{this.state.title}</Text>
      </NextTouchableOpacity>
    )
  }
}

export default TKCheckCodeBtn
