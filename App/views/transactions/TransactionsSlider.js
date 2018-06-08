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
    const { viewStyle, onValueChange, minimumValue, maximumValue, percentSlider } = this.props
    let percentTitle = Number(percentSlider * 100).toFixed(0)
    percentTitle = percentTitle > 100 ? 100 : percentTitle
    return (
      <View
        style={viewStyle}
      >
        <Slider
          style={{
            height: common.h15,
          }}
          value={percentSlider}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          maximumTrackTintColor={common.borderColor}
          minimumTrackTintColor={'white'}
          thumbImage={require('../../assets/point.png')}
          onSlidingComplete={(v) => {
            const percent = Number(v / 1).toFixed(2)
            onValueChange(percent)
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: common.font10,
            textAlign: 'right',
          }}
        >{`${percentTitle}%`}</Text>
      </View>
    )
  }
}
