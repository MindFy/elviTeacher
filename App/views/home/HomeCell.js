import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import { common } from '../common'

export default class HomeCell extends Component {
  componentDidMount() { }
  render() {
    let dirImageSource = null
    let priceColor = null
    let rangeColor = null
    let type = null
    if (this.props.rd[3] === 1) {
      dirImageSource = require('../../assets/箭头.png')
      priceColor = common.askColor
      rangeColor = common.bidColor
      type = '-'
    } else {
      dirImageSource = require('../../assets/箭头copy.png')
      priceColor = common.bidColor
      rangeColor = common.askColor
      type = '+'
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          borderRadius: common.radius6,
          backgroundColor: common.borderColor,
          height: common.h70,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              marginLeft: common.margin20,
              height: common.h40,
              width: common.h40,
            }}
            source={require('../../assets/111.png')}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font20,
              }}
            >{this.props.rd[0]}</Text>
            <Text
              style={{
                color: common.placeholderColor,
                fontSize: common.font16,
                paddingBottom: 0,
                alignSelf: 'flex-end',
              }}
            >/BTC</Text>
          </View>

          <View
            style={{
              marginTop: common.margin5,
              alignSelf: 'center',
              flexDirection: 'row',
            }}
          >
            <Image
              style={{
                height: common.w10,
                width: common.w10,
                alignSelf: 'center',
              }}
              source={dirImageSource}
            />
            <Text
              style={{
                marginLeft: common.margin5,
                fontSize: common.font12,
                color: priceColor,
                alignSelf: 'center',
              }}
            >{this.props.rd[1]}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: common.font16,
              color: rangeColor,
              alignSelf: 'center',
            }}
          >{`${type}${this.props.rd[2]}`}</Text>
        </View>

      </View>
    )
  }
}
