import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  Slider,
  TextInput,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from './common'
import Navigator from '../me/Navigator'
import Depth from './Depth'

export default class Transactions extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: this.ds.cloneWithRows([
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
        ['0.987652', '11.976'],
      ]),
    }
  }
  componentDidMount() { }
  renderRow(rd, sid, rid) {
    let textColor = null
    let marginTop = null
    if (rid < 5) {
      textColor = common.askColor
    } else {
      textColor = common.bidColor
    }
    if (rid === 0) {
      marginTop = common.listViewMarginLeft
    } else {
      marginTop = common.listViewCellMarginTop
    }
    return (
      <View style={{
        marginTop,
        marginLeft: common.listViewMarginLeft / 2,
        marginRight: common.listViewMarginLeft,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{
          color: textColor,
          fontSize: common.placeholderTextFont,
        }}
        >{rd[0]}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.placeholderTextFont,
        }}
        >{rd[1]}</Text>
      </View>
    )
  }
  renderHeader() {
    return (
      <View style={{
        marginTop: 2 * common.listViewMarginLeft,
        marginLeft: common.listViewMarginLeft / 2,
        marginRight: common.listViewMarginLeft,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{
          color: common.placeholderColor,
          fontSize: common.equalPriceFont,
        }}
        >价格(BTC)</Text>
        <Text style={{
          color: common.placeholderColor,
          fontSize: common.equalPriceFont,
        }}
        >数量(ETH)</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="交易"
        />

        <View style={{
          flexDirection: 'row',
          backgroundColor: common.navBgColor,
          height: common.topBarH,
        }}
        >
          <View style={{
            width: common.w4,
          }}
          >
            <TouchableOpacity activeOpacity={common.activeOpacity} >
              <Text style={{
                fontSize: common.btnTextFont,
                color: common.btnTextSelectedColor,
                textAlign: 'center',
              }}
              >买入</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            width: common.w4,
          }}
          >
            <TouchableOpacity activeOpacity={common.activeOpacity} >
              <Text style={{
                fontSize: common.btnTextFont,
                color: common.btnTextColor,
                textAlign: 'center',
              }}
              >卖出</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            width: common.w4 * 2,
          }}
          >
            <TouchableOpacity activeOpacity={common.activeOpacity} >
              <Text style={{
                marginRight: common.topBarMarginRight,
                fontSize: common.btnTextFont,
                color: common.btnTextColor,
                textAlign: 'right',
              }}
              >当前委托</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View style={{
            flexDirection: 'row',
          }}
          >
            <View style={{
              width: common.w2,
            }}
            >
              <View style={{
                marginLeft: common.listViewMarginLeft,
                marginTop: common.listViewMarginLeft,
                flexDirection: 'row',
              }}
              >
                <Text style={{
                  color: common.btnTextColor,
                  fontSize: common.titleFont,
                }}
                >ETH/BTC</Text>
                <Image
                  style={{
                    marginLeft: common.pulldownImageMarginLeft,
                    width: common.pulldownImageW,
                    height: common.pulldownImageH,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/下拉.png')}
                />
              </View>

              <TextInput
                style={{
                  marginTop: common.listViewMarginLeft,
                  marginLeft: common.listViewMarginLeft,
                  marginRight: common.listViewMarginLeft / 2,
                  borderColor: common.borderColor,
                  borderWidth: 1,
                  borderRadius: 1,
                  backgroundColor: common.navBgColor,
                  height: common.inputH,
                  textAlign: 'center',
                }}
                placeholder="0.987652"
                placeholderTextColor={common.placeholderColor}
              />

              <Text style={{
                marginLeft: common.listViewMarginLeft,
                color: common.btnTextColor,
                fontSize: common.equalPriceFont,
              }}
              >= ¥4.43</Text>

              <TextInput
                style={{
                  marginLeft: common.listViewMarginLeft,
                  marginRight: common.listViewMarginLeft / 2,
                  borderColor: common.borderColor,
                  borderWidth: 1,
                  borderRadius: 1,
                  backgroundColor: common.navBgColor,
                  height: common.inputH,
                  textAlign: 'center',
                }}
                placeholder="数量（ETH）"
                placeholderTextColor={common.placeholderColor}
              />

              <Slider
                style={{
                  marginTop: common.listViewMarginLeft / 2,
                  marginLeft: common.listViewMarginLeft,
                  marginRight: common.listViewMarginLeft / 2,
                  height: 15,
                }}
                maximumTrackTintColor={common.borderColor}
                minimumTrackTintColor={'white'}
                thumbImage={require('../../assets/椭圆形.png')}
              />
              <Text style={{
                marginLeft: common.listViewMarginLeft,
                marginRight: common.listViewMarginLeft / 2,
                color: 'white',
                fontSize: common.equalPriceFont,
                textAlign: 'right',
              }}
              >60%</Text>

              <TextInput
                style={{
                  marginTop: common.listViewMarginLeft,
                  marginLeft: common.listViewMarginLeft,
                  marginRight: common.listViewMarginLeft / 2,
                  borderColor: common.borderColor,
                  borderWidth: 1,
                  borderRadius: 1,
                  backgroundColor: common.navBgColor,
                  height: common.inputH,
                  textAlign: 'center',
                }}
                placeholder="成交金额（BTC）"
                placeholderTextColor={common.placeholderColor}
              />

              <View style={{
                marginLeft: common.listViewMarginLeft,
                marginRight: common.listViewMarginLeft / 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              >
                <Text style={{
                  alignSelf: 'center',
                  color: common.btnTextColor,
                  fontSize: common.equalPriceFont,
                }}
                >可用</Text>
                <Text style={{
                  alignSelf: 'center',
                  color: common.btnTextColor,
                  fontSize: common.equalPriceFont,
                }}
                >12 BTC</Text>
              </View>

              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <View style={{
                  marginTop: common.listViewMarginLeft,
                  marginLeft: common.listViewMarginLeft,
                  marginRight: common.listViewMarginLeft / 2,
                  height: common.inputH,
                  backgroundColor: common.btnViewBgColor,
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontSize: common.btnTextFont,
                    color: 'white',
                    alignSelf: 'center',
                  }}
                  >买入</Text>
                </View>
              </TouchableOpacity>
            </View>

            <ListView
              style={{
                width: common.w2,
              }}
              dataSource={this.state.dataSource}
              renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
              renderHeader={() => this.renderHeader()}
              enableEmptySections
            />
          </View>


          <Depth
            width={common.screenW}
            height={common.screenW * common.screenW / common.screenH}
          />
        </ScrollView>
      </View>
    )
  }
}
