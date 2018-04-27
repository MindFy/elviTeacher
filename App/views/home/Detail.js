import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import KLine from './KLineWeb'

class Detail extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '详情',
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
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      isDepthPress: false,
      isOrderPress: true,
      dataSource: this.ds.cloneWithRows([
        ['18:12:12', '0.00004972', '0.234', 1],
        ['18:12:12', '0.00004972', '0.234', 0],
        ['18:12:12', '0.00004972', '0.234', 1],
        ['18:12:12', '0.00004972', '0.234', 0],
        ['18:12:12', '0.00004972', '0.234', 1],
        ['18:12:12', '0.00004972', '0.234', 0],
      ]),
    }
  }
  componentDidMount() { }
  depthPress(isDepthPress) {
    this.setState({
      isDepthPress,
    })
  }
  orderPress(isOrderPress) {
    this.setState({
      isOrderPress,
      dataSource: this.ds.cloneWithRows([
        ['18:12:12', '0.00004972', '0.234', 1],
        ['18:12:12', '0.00004972', '0.234', 0],
        ['18:12:12', '0.00004972', '0.234', 1],
        ['18:12:12', '0.00004972', '0.234', 0],
        ['18:12:12', '0.00004972', '0.234', 1],
        ['18:12:12', '0.00004972', '0.234', 0],
      ]),
    })
  }
  redBtnPress() {

  }
  greenBtnPress() {

  }
  renderHeader(isOrderPress) {
    if (isOrderPress) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              paddingBottom: common.margin5,
            }}
          >买</Text>
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              paddingBottom: common.margin5,
            }}
          >卖</Text>
        </View>
      )
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          marginBottom: common.margin5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
          }}
        >时间</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
          }}
        >价格</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
          }}
        >数量</Text>
      </View>
    )
  }
  renderRow(rd, isOrderPress) {
    if (isOrderPress) {
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: common.font12,
                color: common.textColor,
              }}
            >{rd[2]}</Text>
            <Text
              style={{
                fontSize: common.font12,
                color: common.redColor,
              }}
            >{rd[1]}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: common.font12,
                color: common.greenColor,
              }}
            >{rd[1]}</Text>
            <Text
              style={{
                fontSize: common.font12,
                color: common.textColor,
              }}
            >{rd[2]}</Text>
          </View>
        </View>
      )
    }
    return (
      <View
        style={{
          marginTop: common.margin5,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: common.font12,
            color: common.textColor,
          }}
        >{rd[0]}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: rd[3] === 1 ? common.greenColor : common.redColor,
          }}
        >{rd[1]}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.textColor,
          }}
        >{rd[2]}</Text>
      </View>
    )
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />

        <ScrollView>
          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              flexDirection: 'row',
              borderBottomColor: common.placeholderColor,
              borderBottomWidth: 1,
              width: common.sw / 4,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: common.font20,
                alignSelf: 'flex-end',
                paddingBottom: common.margin5,
              }}
            >ETH/BTC</Text>
            <Image
              style={{
                marginLeft: common.margin5,
                height: common.h5,
                width: common.w10,
                alignSelf: 'center',
              }}
              source={require('../../assets/下拉.png')}
            />
          </View>

          <View
            style={{
              marginLeft: common.margin10,
              marginRight: common.margin10,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                marginTop: common.margin10,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font20,
                    color: common.redColor,
                  }}
                >0.988889</Text>
                <Image
                  style={{
                    marginLeft: common.margin5,
                    height: common.h13,
                    width: common.w10,
                    alignSelf: 'center',
                    paddingBottom: 0,
                  }}
                  source={require('../../assets/箭头.png')}
                />
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font14,
                    color: common.textColor,
                    alignSelf: 'flex-end',
                  }}
                >¥ 0.18</Text>
              </View>

              <View
                style={{
                  marginTop: common.margin5,
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font14,
                    color: common.redColor,
                  }}
                >+0.988889</Text>
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: common.redColor,
                  }}
                >+3.94%</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font10,
                    color: common.placeholderColor,
                  }}
                >24小时成交量</Text>
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font10,
                    color: common.textColor,
                  }}
                >46.003.42 BTC</Text>
              </View>

              <View
                style={{
                  marginTop: common.margin8,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font10,
                    color: common.placeholderColor,
                  }}
                >24小时最低量</Text>
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font10,
                    color: common.textColor,
                  }}
                >0.090909</Text>
              </View>

              <View
                style={{
                  marginTop: common.margin8,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font10,
                    color: common.placeholderColor,
                  }}
                >24小时最高量</Text>
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font10,
                    color: common.textColor,
                  }}
                >0.090909</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginBottom: common.margin5,
              height: common.h32,
              backgroundColor: common.navBgColor,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => this.depthPress(false)}
            >
              <Text
                style={{
                  color: !this.state.isDepthPress ? common.btnTextColor : common.textColor,
                  fontSize: common.font14,
                  alignSelf: 'center',
                }}
              >分时</Text>
              <Image
                style={{
                  marginLeft: common.margin5,
                  height: common.h5,
                  width: common.w10,
                  alignSelf: 'center',
                }}
                source={this.state.isDepthPress ?
                  require('../../assets/下拉--向下.png') :
                  require('../../assets/下拉.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => this.depthPress(true)}
            >
              <Text
                style={{
                  color: this.state.isDepthPress ? common.btnTextColor : common.textColor,
                  fontSize: common.font14,
                  alignSelf: 'center',
                }}
              >深度</Text>
            </TouchableOpacity>

            <Text
              style={{
                flex: 2,
              }}
            />
          </View>

          <KLine
            width={common.sw}
            height={common.sw * 0.8}
          />

          <TKSelectionBar
            leftTitle={'委托订单'}
            rightTitle={'最新成交'}
            leftBlock={() => this.orderPress(true)}
            rightBlock={() => this.orderPress(false)}
          />
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={() => this.renderHeader(this.state.isOrderPress)}
            renderRow={rd => this.renderRow(rd, this.state.isOrderPress)}
            enableEmptySections
            removeClippedSubviews={false}
          />

        </ScrollView>

        <View
          style={{
            height: common.h56,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: common.h35,
              width: (common.sw - common.margin10 * 2 - common.margin15) / 2,
              backgroundColor: common.redColor,
              borderRadius: 2,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.redBtnPress()}
            >
              <Text
                style={{
                  fontSize: common.font16,
                  alignSelf: 'center',
                  color: 'white',
                }}
              >买入</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: common.margin15,
              height: common.h35,
              width: (common.sw - common.margin10 * 2 - common.margin15) / 2,
              backgroundColor: common.greenColor,
              borderRadius: 2,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.greenBtnPress()}
            >
              <Text
                style={{
                  fontSize: common.font16,
                  alignSelf: 'center',
                  color: 'white',
                }}
              >卖出</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,
    depthMap: store.delegate.depthMap,

    latestDeals: store.deal.latestDeals,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,
  }
}

export default connect(
  mapStateToProps,
)(Detail)
