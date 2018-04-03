import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import Depth from './Depth'
import TransactionsSlider from './TransactionsSlider'

export default class Transactions extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '交易',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
      (
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.navigate('Consignation')}
        >
          <Image
            style={{
              marginLeft: common.margin10,
              width: common.w20,
              height: common.h20,
            }}
            source={require('../../assets/市场分析.png')}
          />
        </TouchableOpacity>
      ),
    }
  }
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dealDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      isAskPress: true,
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
      dealListDataSource: this.dealDs.cloneWithRows([
        ['12:12:12', '0.987652', '11.976'],
        ['12:12:13', '0.987652', '11.976'],
        ['12:12:14', '0.987652', '11.976'],
        ['12:12:15', '0.987652', '11.976'],
        ['12:12:16', '0.987652', '11.976'],
        ['12:12:17', '0.987652', '11.976'],
        ['12:12:18', '0.987652', '11.976'],
        ['12:12:19', '0.987652', '11.976'],
        ['12:12:20', '0.987652', '11.976'],
        ['12:12:21', '0.987652', '11.976'],
      ]),
    }
  }
  componentDidMount() { }
  topBarPress(isAskPress) {
    this.setState({
      isAskPress,
    })
  }
  renderRow(rd, sid, rid) {
    let textColor = null
    let marginTop = null
    if (rid < 5) {
      textColor = common.askColor
    } else {
      textColor = common.bidColor
    }
    if (rid === 0) {
      marginTop = common.margin10
    } else {
      marginTop = common.margin8
    }
    return (
      <View style={{
        marginTop,
        marginLeft: common.margin10 / 2,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{
          color: textColor,
          fontSize: common.font12,
        }}
        >{rd[0]}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{rd[1]}</Text>
      </View>
    )
  }
  renderHeader() {
    return (
      <View style={{
        marginTop: 2 * common.margin10,
        marginLeft: common.margin10 / 2,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{
          color: common.placeholderColor,
          fontSize: common.font10,
        }}
        >价格(BTC)</Text>
        <Text style={{
          color: common.placeholderColor,
          fontSize: common.font10,
        }}
        >数量(ETH)</Text>
      </View>
    )
  }
  renderDealListRow(rd, sid, rid) {
    let textColor = null
    if (rid % 2 === 0) {
      textColor = common.askColor
    } else {
      textColor = common.bidColor
    }
    return (
      <View style={{
        marginTop: common.margin10 / 2,
        marginLeft: common.margin10,
        marginRight: common.margin10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{rd[0]}</Text>
        <Text style={{
          color: textColor,
          fontSize: common.font12,
        }}
        >{rd[1]}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{rd[2]}</Text>
      </View>
    )
  }
  renderDealListHeader() {
    return (
      <View>
        <View style={{
          height: common.h32,
          backgroundColor: common.navBgColor,
          flexDirection: 'row',
        }}
        >
          <Text style={{
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font14,
            alignSelf: 'center',
          }}
          >最新成交</Text>
        </View>

        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
          >时间</Text>
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
          >价格</Text>
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
          >数量</Text>
        </View>
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
        <StatusBar
          barStyle={'light-content'}
        />
        <View
          style={{
            height: common.h32,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              paddingBottom: common.margin10,
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.topBarPress(true)}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: this.state.isAskPress ? common.btnTextColor : common.textColor,
                  textAlign: 'center',
                }}
              >买入</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingBottom: common.margin10,
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.topBarPress(false)}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: !this.state.isAskPress ? common.btnTextColor : common.textColor,
                  textAlign: 'center',
                }}
              >卖出</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 2,
              paddingBottom: common.margin10,
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.props.navigation.navigate('Consignation')}
            >
              <Text
                style={{
                  marginRight: common.margin22,
                  fontSize: common.font14,
                  color: common.textColor,
                  textAlign: 'right',
                }}
              >当前委托</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: common.sw / 2,
              }}
            >
              <View
                style={{
                  marginLeft: common.margin10,
                  marginTop: common.margin10,
                  flexDirection: 'row',
                }}
              >
                <Text style={{
                  color: common.textColor,
                  fontSize: common.font16,
                }}
                >ETH/BTC</Text>
                <Image
                  style={{
                    marginLeft: common.margin5,
                    width: common.w10,
                    height: common.h5,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/下拉.png')}
                />
              </View>

              <TextInput
                style={{
                  marginTop: common.margin10,
                  marginLeft: common.margin10,
                  marginRight: common.margin10 / 2,
                  borderColor: common.borderColor,
                  borderWidth: 1,
                  borderRadius: 1,
                  backgroundColor: common.navBgColor,
                  height: common.h35,
                  fontSize: common.font12,
                  textAlign: 'center',
                  color: 'white',
                }}
                placeholder="0.987652"
                placeholderTextColor={common.placeholderColor}
              />

              <Text style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font10,
              }}
              >= ¥4.43</Text>

              <TextInput
                style={{
                  marginLeft: common.margin10,
                  marginRight: common.margin10 / 2,
                  borderColor: common.borderColor,
                  borderWidth: 1,
                  borderRadius: 1,
                  backgroundColor: common.navBgColor,
                  height: common.h35,
                  fontSize: common.font12,
                  textAlign: 'center',
                  color: 'white',
                }}
                placeholder="数量（ETH）"
                placeholderTextColor={common.placeholderColor}
              />

              <TransactionsSlider styleee={{
                marginTop: common.margin10 / 2,
                marginLeft: common.margin10,
                marginRight: common.margin10 / 2,
              }}
              />

              <TextInput
                style={{
                  marginTop: common.margin10,
                  marginLeft: common.margin10,
                  marginRight: common.margin10 / 2,
                  borderColor: common.borderColor,
                  borderWidth: 1,
                  borderRadius: 1,
                  backgroundColor: common.navBgColor,
                  height: common.h35,
                  fontSize: common.font12,
                  textAlign: 'center',
                  color: 'white',
                }}
                placeholder="成交金额（BTC）"
                placeholderTextColor={common.placeholderColor}
              />

              <View style={{
                marginLeft: common.margin10,
                marginRight: common.margin10 / 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              >
                <Text style={{
                  alignSelf: 'center',
                  color: common.textColor,
                  fontSize: common.font10,
                }}
                >可用</Text>
                <Text style={{
                  alignSelf: 'center',
                  color: common.textColor,
                  fontSize: common.font10,
                }}
                >12 BTC</Text>
              </View>

              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <View style={{
                  marginTop: common.margin10,
                  marginLeft: common.margin10,
                  marginRight: common.margin10 / 2,
                  height: common.h35,
                  backgroundColor: this.state.isAskPress ? common.redColor : common.greenColor,
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontSize: common.font14,
                    color: 'white',
                    alignSelf: 'center',
                  }}
                  >{this.state.isAskPress ? '买入' : '卖出'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <ListView
              style={{
                width: common.sw / 2,
              }}
              dataSource={this.state.dataSource}
              renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
              renderHeader={() => this.renderHeader()}
              enableEmptySections
            />
          </View>

          <Depth
            width={common.sw}
            height={common.sw * common.sw / common.sh}
          />

          <ListView
            style={{
              marginTop: common.margin10,
            }}
            dataSource={this.state.dealListDataSource}
            renderRow={(rd, sid, rid) => this.renderDealListRow(rd, sid, rid)}
            renderHeader={() => this.renderDealListHeader()}
            enableEmptySections
          />
        </ScrollView>
      </View>
    )
  }
}
