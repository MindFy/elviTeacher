import React, { Component } from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import { BigNumber } from 'bignumber.js'

export default class Test extends Component {
  constructor() {
    super()
    this.state = {
      price: 0,
      quantity: 0,
    }
  }

  onChange(text, tag) {
    if (tag === 'price') {
      if (!text.length) {
        this.setState({ price: 0 })
        return // 1.清空时置0
      }
      let t = new BigNumber(text)
      if (t.isNaN()) return // 2.输入不是数字就还原
      if (text.endsWith('.')) {
        this.setState({ price: text })
        return // 3.输入小数点保留小数点
      }
      const arr = t.toString().split('.')
      this.maxLenPrice = arr[0].length + 5
      t = t.toNumber()
      this.setState({ price: t })
    } else {
      let t = new BigNumber(text)
      if (text.length) t = t.isNaN() ? this.state.price : t.toNumber()
      else t = 0
      this.setState({ price: t })
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{
            alignSelf: 'center',
          }}
          value={this.state.price === 0 ? '' : this.state.price.toString()}
          maxLength={this.maxLenPrice}
          onChangeText={txt => this.onChange(txt, 'price')}
          placeholder="price"
        />
        <TextInput
          style={{
            alignSelf: 'center',
          }}
          value={this.state.quantity === 0 ? '' : this.state.quantity.toString()}
          maxLength={20}
          onChangeText={txt => this.onChange(txt, 'quantity')}
          placeholder="quantity"
        />
      </View>
    )
  }
}
