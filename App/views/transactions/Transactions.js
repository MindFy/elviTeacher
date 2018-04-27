import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import Menu from 'teaset/components/Menu/Menu'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import Depth from './Depth'
import TransactionsSlider from './TransactionsSlider'
import TextInputTransactions from './TextInputTransactions'
import ShelvesListView from './ShelvesListView'
import actions from '../../actions/index'

class Transactions extends Component {
  static navigationOptions() {
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
            onPress={() => {

            }}
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

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, price, quantity, amount } = this.props

    const p = !price.length ? 0 : parseInt(price, 0)
    let n
    let a

    if (tag === 'price') {
      dispatch(actions.textInputDelegateUpdate(text, quantity, amount))
    } else if (tag === 'quantity') {
      n = !text.length ? 0 : parseInt(text, 0)
      a = p * n === 0 ? amount : p * n
      dispatch(actions.textInputDelegateUpdate(price, text, `${a}`))
    } else if (tag === 'amount') {
      a = !text.length ? 0 : parseInt(text, 0)
      n = a / p === 0 ? quantity : Number(a / p).toFixed(0)
      dispatch(actions.textInputDelegateUpdate(price, `${n}`, text))
    }
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
    Menu.show({ x: 50, y: 126 }, items)
  }

  topBarPress(b) {
    const { dispatch, buyOrSell } = this.props
    if (buyOrSell !== b) {
      dispatch(actions.buyOrSellUpdate(b))
      dispatch(actions.textInputDelegateUpdate('', '', ''))
    }
  }

  buyOrSellPress() {
    const { dispatch, navigation, user, buyOrSell, price, quantity, homeRoseSelected } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    if (!price.length) {
      Toast.message('请输入价格')
      return
    }
    if (!quantity.length) {
      Toast.message('请输入数量')
      return
    }
    if (homeRoseSelected) {
      dispatch(actions.create({
        goods_id: homeRoseSelected.goods.id,
        currency_id: homeRoseSelected.currency.id,
        direct: buyOrSell ? 'buy' : 'sell',
        price: Number(price),
        quantity: Number(quantity),
      }))
    }
  }

  renderLatestDealsRow(rd) {
    let textColor = null
    if (rd.endDirect === 'buy') {
      textColor = common.redColor
    } else if (rd.endDirect === 'sell') {
      textColor = common.greenColor
    }
    const createdAt = common.dfTime(rd.createdAt)

    return (
      <View
        style={{
          marginTop: common.margin10 / 2,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{
          flex: 1,
          color: 'white',
          fontSize: common.font12,
          textAlign: 'left',
        }}
        >{createdAt}</Text>
        <Text style={{
          flex: 1,
          color: textColor,
          fontSize: common.font12,
          textAlign: 'center',
        }}
        >{rd.dealPrice}</Text>
        <Text style={{
          flex: 1,
          color: 'white',
          fontSize: common.font12,
          textAlign: 'right',
        }}
        >{rd.quantity}</Text>
      </View>
    )
  }

  renderLatestDealsHeader() {
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
    const { buyOrSell, navigation, delegateCreateVisible, depthMap, user,
      homeRoseSelected, price, quantity, amount, shelvesBuy, shelvesSell, latestDeals,
      latestDealsVisible, getShelvesVisible, getDepthMapVisible,
    } = this.props
    const goodsName = homeRoseSelected ? homeRoseSelected.goods.name : ''
    const currencyName = homeRoseSelected ? homeRoseSelected.currency.name : ''

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
                  color: buyOrSell ? common.btnTextColor : common.textColor,
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
                  color: !buyOrSell ? common.btnTextColor : common.textColor,
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
              onPress={() => {
                if (!user) {
                  navigation.navigate('LoginStack')
                } else {
                  navigation.navigate('Delegate')
                }
              }}
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

        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                if (homeRoseSelected) {
                  this.getUIData(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
                }
              }}
              refreshing={
                !(!latestDealsVisible && !getShelvesVisible && !getDepthMapVisible)
              }
              colors={[common.textColor]}
              progressBackgroundColor={common.navBgColor}
              progressViewOffset={0}
              tintColor={common.textColor}
            />
          }
          removeClippedSubviews={false}
        >
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
              <TouchableOpacity
                style={{
                  marginLeft: common.margin10,
                  marginTop: common.margin10,
                  width: '45%',
                  flexDirection: 'row',
                  paddingBottom: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: common.placeholderColor,
                }}
                activeOpacity={common.activeOpacity}
                onPress={() => this.menuPress()}
              >
                <Text style={{
                  color: common.textColor,
                  fontSize: common.font16,
                }}
                >{`${goodsName}/${currencyName}`}</Text>
                <Image
                  style={{
                    marginLeft: common.margin5,
                    width: common.w10,
                    height: common.h5,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/下拉.png')}
                />
              </TouchableOpacity>

              <TextInputTransactions
                textInputStyle={{
                  marginTop: common.margin10,
                }}
                placeholder={`价格（${currencyName}）`}
                keyboardType="number-pad"
                value={price}
                onChange={e => this.onChange(e, 'price')}
              />

              <Text style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font10,
              }}
              >= ¥4.43</Text>

              <TextInputTransactions
                placeholder={`数量（${goodsName}）`}
                keyboardType="number-pad"
                value={quantity}
                onChange={e => this.onChange(e, 'quantity')}
              />

              <TransactionsSlider styleee={{
                marginTop: common.margin10 / 2,
                marginLeft: common.margin10,
                marginRight: common.margin10 / 2,
              }}
              />

              <TextInputTransactions
                placeholder={`成交金额（${currencyName}）`}
                keyboardType="number-pad"
                value={amount}
                onChange={e => this.onChange(e, 'amount')}
                editable={false}
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
                >0 BTC</Text>
              </View>

              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => this.buyOrSellPress()}
                disabled={delegateCreateVisible}
              >
                <View style={{
                  marginTop: common.margin10,
                  marginLeft: common.margin10,
                  marginRight: common.margin10 / 2,
                  height: common.h35,
                  backgroundColor: buyOrSell ? common.redColor : common.greenColor,
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontSize: common.font14,
                    color: 'white',
                    alignSelf: 'center',
                  }}
                  >{buyOrSell ? '买入' : '卖出'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: common.sw / 2,
                flexDirection: 'column',
              }}
            >
              <ShelvesListView
                style={{
                  height: common.margin8 * 5 + common.font12 * 5 + common.margin10 * 3,
                }}
                type={common.buy}
                goodsName={goodsName}
                currencyName={currencyName}
                dataSource={this.shelvesBuyDS(shelvesBuy)}
              />
              <ShelvesListView
                style={{
                  height: common.margin8 * 5 + common.font12 * 5,
                }}
                type={common.sell}
                dataSource={this.shelvesSellDS(shelvesSell)}
              />
            </View>
          </View>

          <Depth
            depthMap={depthMap}
            width={common.sw}
            height={common.sw * common.sw / common.sh}
          />

          <ListView
            style={{
              marginTop: common.margin10,
            }}
            dataSource={this.latestDealsDS(latestDeals)}
            renderRow={(rd, sid, rid) => this.renderLatestDealsRow(rd, sid, rid)}
            renderHeader={() => this.renderLatestDealsHeader()}
            enableEmptySections
            removeClippedSubviews={false}
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    price: store.deal.price,
    quantity: store.deal.quantity,
    amount: store.deal.amount,
    buyOrSell: store.deal.buyOrSell,
    latestDeals: store.deal.latestDeals,
    latestDealsVisible: store.deal.latestDealsVisible,

    user: store.user.user,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,
    depthMap: store.delegate.depthMap,
    getShelvesVisible: store.delegate.getShelvesVisible,
    delegateCreateVisible: store.delegate.delegateCreateVisible,
    getDepthMapVisible: store.delegate.getDepthMapVisible,
    getDepthMapResponse: store.delegate.getDepthMapResponse,
  }
}

export default connect(
  mapStateToProps,
)(Transactions)
