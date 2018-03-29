import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from './common'
import Navigator from '../me/Navigator'
import Depth from './Depth'

export default class Transactions extends Component {
  componentDidMount() { }
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
                placeholder="成交金额（BTC）"
                placeholderTextColor={common.placeholderColor}
              />

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
                placeholder="数量（ETH）"
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
                  color: common.btnTextColor,
                  fontSize: common.equalPriceFont,
                }}
                >可用</Text>
                <Text style={{
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
