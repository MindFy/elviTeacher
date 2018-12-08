import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
} from 'react-native'
import NextTouchableOpacity from './NextTouchableOpacity'
import { common } from '../constants/common'
import transfer from '../localization/utils'

const styles = StyleSheet.create({
  titleStyle: {
    color: common.btnTextColor,
    fontSize: common.font12,
  },
})

class TKDelayConfirmBtn extends Component {
  constructor(props) {
    super(props)
    this.count = 10
    this.state = {
      title: `${this.count}s`,
    }
    this.timerID = setInterval(() => {
      if (this.count === 0) {
        this.setState({
          title: transfer(this.props.language, 'login_submit'),
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

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID)
    }
  }

  onPress = () => {
    if (this.timerID) {
      return
    }
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    const { style, titleStyle } = this.props
    return (
      <NextTouchableOpacity
        style={style}
        onPress={this.onPress}
      >
        <Text style={[styles.titleStyle, titleStyle]}>{this.state.title}</Text>
      </NextTouchableOpacity>
    )
  }
}

export default TKDelayConfirmBtn
