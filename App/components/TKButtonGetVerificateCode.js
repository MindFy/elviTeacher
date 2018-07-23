import React, { Component } from 'react'
import { Text } from 'react-native'
import { common } from '../constants/common'
import NextTouchableOpacity from '../components/NextTouchableOpacity'
import transfer from '../localization/utils'

let count = 60

export default class TKButtonGetVerificateCode extends Component {
  constructor(props) {
    super(props)
    this.state = { title: transfer(props.language, 'me_getCode'), disabled: false }
  }
  componentDidMount() { }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  onPress() {
    const { onPress, language } = this.props
    onPress(() => {
      this.setState({ title: `${count}s`, disabled: true })
      this.timer = setInterval(() => {
        count--
        if (count === 0) {
          count = 60
          clearInterval(this.timer)
          this.setState({ title: transfer(language, 'me_getCode'), disabled: false })
        } else {
          this.setState({ title: `${count}s` })
        }
      }, 1000)
    })
  }

  render() {
    const { disabled, title } = this.state
    const { viewStyle } = this.props
    return (
      <NextTouchableOpacity
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
      </NextTouchableOpacity>
    )
  }
}
