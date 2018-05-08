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
import {
  Menu,
} from 'teaset'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import KLine from './KLine'
import Depth from '../transactions/Depth'
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
    this.shelvesBuyDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.shelvesSellDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.latestDealsDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

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

  renderHeader(type) {
    if (type === common.buy) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
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
        </View>
      )
    } else if (type === common.sell) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginRight: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
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
          flexDirection: 'row',
          justifyContent: 'space-between',

        }}
      >
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
            paddingBottom: common.margin5,
          }}
        >时间</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
            paddingBottom: common.margin5,
          }}
        >价格</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
            paddingBottom: common.margin5,
          }}
        >数量</Text>
      </View>
    )
  }

  renderRow(rd, type) {
    if (type === common.buy) {
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginLeft: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: common.font12,
              color: common.textColor,
            }}
          >{rd.sum_quantity}</Text>
          <Text
            style={{
              fontSize: common.font12,
              color: common.redColor,
            }}
          >{rd.price}</Text>
        </View>
      )
    } else if (type === common.sell) {
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginRight: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: common.font12,
              color: common.greenColor,
            }}
          >{rd.price}</Text>
          <Text
            style={{
              fontSize: common.font12,
              color: common.textColor,
            }}
          >{rd.sum_quantity}</Text>
        </View>
      )
    }
    let textColor = null
    if (rd.endDirect === common.buy) {
      textColor = common.redColor
    } else if (rd.endDirect === common.sell) {
      textColor = common.greenColor
    }
    const createdAt = common.dfTime(rd.createdAt)
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
            width: '20%',
            textAlign: 'left',
          }}
        >{createdAt}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: textColor,
            width: '60%',
            textAlign: 'center',
          }}
        >{rd.dealPrice}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.textColor,
            width: '20%',
            textAlign: 'right',
          }}
        >{rd.quantity}</Text>
      </View>
    )
  }

  render() {
    const { dispatch, homeRoseSelected, selectionBarSelected, navigation,
      shelvesBuy, shelvesSell, latestDeals, kLineOrDepth, depthMap } = this.props
    let goodsName = ''
    let currencyName = ''
    let lastprice = ''
    let cprice = ''
    let hprice = ''
    let lprice = ''
    let quantity = 0
    let rose = 0
    let cpriceColor = common.redColor
    let dirImageSource = require('../../assets/箭头.png')
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      lastprice = homeRoseSelected.lastprice
      cprice = homeRoseSelected.cprice
      hprice = homeRoseSelected.hprice
      lprice = homeRoseSelected.lprice
      quantity = homeRoseSelected.quantity
      rose = homeRoseSelected.rose
      if (rose > 0) {
        cpriceColor = common.redColor
        dirImageSource = require('../../assets/箭头.png')
      } else if (rose <= 0) {
        cpriceColor = common.greenColor
        dirImageSource = require('../../assets/箭头copy.png')
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
                    color: cpriceColor,
                  }}
                >{`${cprice}`}</Text>
                <Image
                  style={{
                    marginLeft: common.margin5,
                    height: common.h13,
                    width: common.w10,
                    alignSelf: 'center',
                    paddingBottom: 0,
                  }}
                  source={dirImageSource}
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
                    color: cpriceColor,
                  }}
                >{`${rose > 0 ? '+' : '-'}${lastprice}`}</Text>
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: cpriceColor,
                  }}
                >{`${rose}%`}</Text>
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
                >{`${quantity} ${currencyName}`}</Text>
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
                >{`${lprice}`}</Text>
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

          <TKSelectionBar
            leftTitle={'委托订单'}
            rightTitle={'最新成交'}
            leftBlock={() => {
              dispatch(actions.selectionBarUpdate(common.selectionBar.left))
            }}
            rightBlock={() => {
              dispatch(actions.selectionBarUpdate(common.selectionBar.right))
            }}
          />
          {
            selectionBarSelected === common.selectionBar.left
              ? <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <ListView
                  dataSource={this.shelvesBuyDS(shelvesBuy)}
                  renderHeader={() => this.renderHeader(common.buy)}
                  renderRow={rd => this.renderRow(rd, common.buy)}
                  enableEmptySections
                  removeClippedSubviews={false}
                />
                <ListView
                  dataSource={this.shelvesSellDS(shelvesSell)}
                  renderHeader={() => this.renderHeader(common.sell)}
                  renderRow={rd => this.renderRow(rd, common.sell)}
                  enableEmptySections
                  removeClippedSubviews={false}
                />
              </View>
              : <ListView
                dataSource={this.latestDealsDS(latestDeals)}
                renderHeader={() => this.renderHeader('')}
                renderRow={rd => this.renderRow(rd, '')}
                enableEmptySections
                removeClippedSubviews={false}
              />
          }

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
    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,
    depthMap: store.delegate.depthMap,

    latestDeals: store.deal.latestDeals,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    selectionBarSelected: store.ui.selectionBarSelected,
    kLineOrDepth: store.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Detail)
