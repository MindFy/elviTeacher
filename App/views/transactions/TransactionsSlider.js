import React, { Component } from 'react'
import {
  View,
  Text,
  Slider,
} from 'react-native'
import { common } from '../common'

export default class TransactionsSlider extends Component {
  constructor() {
    super()
    this.state = {
      sliderValue: 0.6,
    }
  }
  sliderChanged(value) {
    this.setState({
      sliderValue: value,
    })
  }
  render() {
    return (
      <View style={this.props.styleee} >
        <Slider
          style={{
            height: 15,
          }}
          value={this.state.sliderValue}
          maximumTrackTintColor={common.borderColor}
          minimumTrackTintColor={'white'}
          thumbImage={require('../../assets/椭圆形.png')}
          onValueChange={value => this.sliderChanged(value)}
        />
        <Text style={{
          color: 'white',
          fontSize: common.font10,
          textAlign: 'right',
        }}
        >{`${Number(this.state.sliderValue * 100).toFixed(0)}%`}</Text>
      </View>
    )
  }
}
