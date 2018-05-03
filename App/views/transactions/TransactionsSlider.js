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
    return (
      <View
        style={viewStyle}
      >
        <Slider
          style={{
            height: 15,
          }}
          value={sliderValue}
          maximumValue={maximumValue}
          minimumValue={minimumValue}
          maximumTrackTintColor={common.borderColor}
          minimumTrackTintColor={'white'}
          thumbImage={require('../../assets/椭圆形.png')}
          onValueChange={value => onValueChange(value)}
        />
        <Text
          style={{
            color: 'white',
            fontSize: common.font10,
            textAlign: 'right',
          }}
        >{`${Number(common.bigNumber.dividedBy(sliderValue, maximumValue) * 100).toFixed(0)}%`}</Text>
      </View>
    )
  }
}
