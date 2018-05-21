import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'

export default class HomeRoseList extends Component {
  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader() {
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          marginBottom: common.margin10,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            width: '30%',
          }}
        />
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >市场</Text>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >/</Text>
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              textAlign: 'left',
            }}
          >最新价</Text>
        </View>
        <Text
          style={{
            width: '30%',
            color: common.placeholderColor,
            fontSize: common.font12,
            textAlign: 'center',
          }}
        >涨跌幅</Text>
      </View>
    )
  }

  renderRow(rd) {
    const { onPress } = this.props
    let dirImageSource
    let priceColor = null
    let rangeColor = null
    let rose = new BigNumber(rd.rose).multipliedBy(100)
    let cprice
    if (rose.gt(0)) {
      priceColor = common.redColor
      rangeColor = common.redColor
      dirImageSource = require('../../assets/箭头.png')
    } else if (rose.lt(0)) {
      priceColor = common.greenColor
      rangeColor = common.greenColor
      dirImageSource = require('../../assets/箭头copy.png')
    } else {
      priceColor = common.textColor
      rangeColor = common.textColor
    }
    rose = rose.toFixed(2, 1)
    common.precision(rd.goods.name, rd.currency.name, (p) => {
      cprice = new BigNumber(rd.cprice).toFixed(p, 1)
    })

    return (
      <TouchableOpacity
        style={{
          marginLeft: common.margin10,
          marginRight: common.margin10,
          marginBottom: common.margin10,
          borderRadius: common.radius6,
          backgroundColor: common.borderColor,
          flexDirection: 'row',
        }}
        activeOpacity={common.activeOpacity}
        onPress={() => onPress(rd)}
      >
        <View
          style={{
            width: '30%',
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
            width: '40%',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              marginTop: common.margin10,
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                flex: 1,
                color: common.textColor,
                fontSize: common.font20,
                textAlign: 'right',
              }}
            >{rd.goods.name}</Text>
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font20,
              }}
            >/</Text>
            <Text
              style={{
                flex: 1,
                color: common.placeholderColor,
                fontSize: common.font16,
                paddingBottom: 0,
                alignSelf: 'flex-end',
                textAlign: 'left',
              }}
            >{rd.currency.name}</Text>
          </View>

          <View
            style={{
              marginTop: common.margin5,
              marginBottom: common.margin10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}
          >
            {
              dirImageSource ?
                <Image
                  style={{
                    height: common.w10,
                    width: common.w10,
                    alignSelf: 'center',
                  }}
                  source={dirImageSource}
                /> : null
            }
            <Text
              style={{
                marginLeft: common.margin5,
                fontSize: common.font12,
                color: priceColor,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >{cprice}</Text>
          </View>
        </View>

        <Text
          style={{
            width: '30%',
            fontSize: common.font16,
            color: rangeColor,
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >{`${rose}%`}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { data } = this.props
    return (
      <ListView
        dataSource={this.dataSource(data)}
        renderRow={rd => this.renderRow(rd)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
