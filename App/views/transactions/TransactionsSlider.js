import React, { Component } from 'react'
import {
  View,
  Text,
  Slider,
} from 'react-native'
import { common } from '../../constants/common'

export default class TransactionsSlider extends Component {
  componentDidMount() { }

  render() {
    const { viewStyle, sliderValue, onValueChange, minimumValue, maximumValue } = this.props
    const percent = maximumValue === 0 ? 0
      : Number(common.bigNumber.dividedBy(sliderValue, maximumValue) * 100).toFixed(0)
    return (
      <View
        style={viewStyle}
      >
        <Slider
          style={{
            height: 15,
          }}
          value={sliderValue}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          maximumTrackTintColor={common.borderColor}
          minimumTrackTintColor={'white'}
          thumbImage={require('../../assets/椭圆形.png')}
          onSlidingComplete={value => onValueChange(value)}
        />
        <Text
          style={{
            color: 'white',
            fontSize: common.font10,
            textAlign: 'right',
          }}
        >{`${percent}%`}</Text>
      </View>
    )
  }
}
