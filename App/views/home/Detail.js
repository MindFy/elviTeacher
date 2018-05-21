import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  Menu,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import KLine from './KLineWeb'
import Depth from '../transactions/Depth'
import DetailList from './DetailList'
import actions from '../../actions/index'

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
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
            }}
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
  componentDidMount() { }

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  menuPress() {
    const { dispatch, homeRose } = this.props
    const items = []
    homeRose.forEach((element) => {
      items.push({
        title: `${element.goods.name}/${element.currency.name}`,
        onPress: () => {
          dispatch(actions.homeRoseSelectedUpdate(element))
          this.getUIData(element.goods.id, element.currency.id)
        },
      })
    })
    Menu.show({ x: 55, y: 100 }, items)
  }

  render() {
    const { dispatch, homeRoseSelected, navigation, valuation, kLineOrDepth, depthMap,
    } = this.props
    let goodsName = ''
    let currencyName = ''
    let lastprice = ''
    let cprice = ''
    let hprice = ''
    let lprice = ''
    let quantity = 0
    let rose = 0
    let cpriceColor = common.redColor
    let dirImageSource
    let symbol = ''
    let rmb = '0.00'
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        lastprice = new BigNumber(homeRoseSelected.lastprice).toFixed(p, 1)
        cprice = new BigNumber(homeRoseSelected.cprice).toFixed(p, 1)
        hprice = new BigNumber(homeRoseSelected.hprice).toFixed(p, 1)
        lprice = new BigNumber(homeRoseSelected.lprice).toFixed(p, 1)
        quantity = new BigNumber(homeRoseSelected.quantity).toFixed(q, 1)
      })
      rose = new BigNumber(homeRoseSelected.rose)
      if (rose.gt(0)) {
        cpriceColor = common.redColor
        dirImageSource = require('../../assets/箭头.png')
        symbol = '+'
      } else if (rose.lt(0)) {
        cpriceColor = common.greenColor
        dirImageSource = require('../../assets/箭头copy.png')
        symbol = '-'
      } else {
        cpriceColor = common.textColor
      }
      rose = rose.multipliedBy(100).toFixed(2, 1)
      if (valuation && valuation.rates) {
        rmb = valuation.rates[currencyName][goodsName]
        rmb = new BigNumber(rmb).toFixed(2)
      }
    }

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
          <TouchableOpacity
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              flexDirection: 'row',
              borderBottomColor: common.placeholderColor,
              borderBottomWidth: 1,
              width: '30%',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => this.menuPress()}
          >
            <Text
              style={{
                color: 'white',
                fontSize: common.font20,
                alignSelf: 'flex-end',
                paddingBottom: common.margin5,
              }}
            >{`${goodsName}/${currencyName}`}</Text>
            <Image
              style={{
                marginLeft: common.margin5,
                height: common.h5,
                width: common.w10,
                alignSelf: 'center',
              }}
              source={require('../../assets/下拉.png')}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: common.margin10,
                marginLeft: common.margin10,
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
                    color: cpriceColor,
                    textAlign: 'left',
                  }}
                >{`${cprice}`}</Text>
                {
                  dirImageSource
                    ? <Image
                      style={{
                        marginLeft: common.margin5,
                        marginBottom: common.margin5,
                        height: common.h13,
                        width: common.w10,
                        alignSelf: 'flex-end',
                      }}
                      source={dirImageSource}
                    /> : null
                }
                <Text
                  style={{
                    marginLeft: common.margin5,
                    marginBottom: 2,
                    fontSize: common.font14,
                    color: common.textColor,
                    alignSelf: 'flex-end',
                    textAlign: 'left',
                  }}
                >{`¥ ${rmb}`}</Text>
              </View>

              <View
                style={{
                  marginTop: common.margin10,
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font14,
                    color: cpriceColor,
                    textAlign: 'left',
                  }}
                >{`${symbol}${lastprice}`}</Text>
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: cpriceColor,
                    alignSelf: 'center',
                    textAlign: 'left',
                  }}
                >{`${rose}%`}</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: common.margin5,
                marginRight: common.margin10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font10,
                    color: common.placeholderColor,
                    textAlign: 'right',
                  }}
                >24小时成交量</Text>
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font10,
                    color: common.textColor,
                    textAlign: 'right',
                  }}
                >{`${quantity} ${currencyName}`}</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: common.margin8,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font10,
                    color: common.placeholderColor,
                    textAlign: 'right',
                  }}
                >24小时最低量</Text>
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font10,
                    color: common.textColor,
                    textAlign: 'right',
                  }}
                >{`${lprice}`}</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: common.margin8,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: common.font10,
                    color: common.placeholderColor,
                    textAlign: 'right',
                  }}
                >24小时最高量</Text>
                <Text
                  style={{
                    marginLeft: common.margin5,
                    fontSize: common.font10,
                    color: common.textColor,
                    textAlign: 'right',
                  }}
                >{`${hprice}`}</Text>
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
              onPress={() => {
                dispatch(actions.kLineOrDepthUpdate(common.ui.kLine))
              }}
            >
              <Text
                style={{
                  color: kLineOrDepth === common.ui.kLine ? common.btnTextColor : common.textColor,
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
                source={kLineOrDepth === common.ui.depth ?
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
              onPress={() => {
                dispatch(actions.kLineOrDepthUpdate(common.ui.depth))
              }}
            >
              <Text
                style={{
                  color: kLineOrDepth === common.ui.depth ? common.btnTextColor : common.textColor,
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

          {
            kLineOrDepth === common.ui.kLine
              ? <KLine
                width={common.sw}
                height={common.sw * common.sw / common.sh}
              />
              : <Depth
                depthMap={depthMap}
                width={common.sw}
                height={common.sw * common.sw / common.sh}
              />
          }

          <DetailList />
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
              onPress={() => {
                navigation.navigate('Transactions', {
                  type: common.buy,
                })
                dispatch(actions.buyOrSellUpdate(true))
                dispatch(actions.textInputDelegateUpdate({ price: '', quantity: '', amount: '' }))
              }}
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
              onPress={() => {
                navigation.navigate('Transactions', {
                  type: common.sell,
                })
                dispatch(actions.buyOrSellUpdate(false))
                dispatch(actions.textInputDelegateUpdate({ price: '', quantity: '', amount: '' }))
              }}
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
    depthMap: store.delegate.depthMap,

    valuation: store.asset.valuation,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    kLineOrDepth: store.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Detail)
