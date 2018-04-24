import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import { common } from '../constants/common'

let count = 60

export default class TKButtonGetVerificateCode extends Component {
  constructor() {
    super()
    this.state = { title: '获取验证码', disabled: false }
  }
  componentDidMount() { }

  onPress() {
    const { onPress } = this.props
    onPress(() => {
      this.setState({ title: `${count}`, disabled: true })
      this.timer = setInterval(() => {
        count--
        if (count === 0) {
          count = 60
          clearInterval(this.timer)
          this.setState({ title: '获取验证码', disabled: false })
        } else {
          this.setState({ title: `${count}` })
        }
      }, 1000)
    })
  }

  render() {
    const { disabled, title } = this.state
    const { viewStyle } = this.props
    return (
      <TouchableOpacity
        style={[{
          marginRight: common.margin5,
          height: common.h13,
          alignSelf: 'center',
        }, viewStyle]}
        activeOpacity={common.activeOpacity}
        disabled={disabled}
        onPress={() => this.onPress()}
      >
        <Text
          style={{
            color: common.btnTextColor,
            fontSize: common.font12,
            alignSelf: 'flex-end',
            textAlign: 'right',
          }}
        >{title}</Text>
      </TouchableOpacity>
    )
  }
}
