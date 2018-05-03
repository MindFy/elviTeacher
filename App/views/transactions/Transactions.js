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
  static navigationOptions(props) {
    const { navigation } = props
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
              navigation.navigate('Detail')
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

  componentDidMount() {
    const { homeRoseSelected } = this.props
    if (homeRoseSelected) {
      this.getUIData(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
    }
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, price, quantity } = this.props

    if (tag === 'price') {
      const temp = common.toFix2(text)
      const p = isNaN(Number(temp)) ? 0 : Number(temp)
      const aTemp = common.bigNumber.multipliedBy(p, quantity)
      const amount = common.toFix6(aTemp)
      dispatch(actions.textInputDelegateUpdate({ price: p, quantity, amount: Number(amount) }))
    } else if (tag === 'quantity') {
      const temp = common.toFix4(text)
      const q = isNaN(Number(temp)) ? 0 : Number(temp)
      const aTemp = common.bigNumber.multipliedBy(price, q)
      const amount = common.toFix6(aTemp)
      dispatch(actions.textInputDelegateUpdate({ price, quantity: q, amount: Number(amount) }))
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
      dispatch(actions.textInputDelegateUpdate({ price: 0, quantity: 0, amount: 0 }))
    }
  }

  buyOrSellPress() {
    const { dispatch, navigation, user, buyOrSell, price, quantity, homeRoseSelected } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    if (price === 0) {
      Toast.message(`请输入${buyOrSell ? '买入' : '卖出'}价格`)
      return
    }
    if (quantity === 0) {
      Toast.message(`请输入${buyOrSell ? '买入' : '卖出'}数量`)
      return
    }

    if (homeRoseSelected) {
      if (homeRoseSelected.goods.name === 'TK'
        && common.bigNumber.lt(quantity, common.minQuantityTK)) {
        Toast.message(`TK${buyOrSell ? '买入' : '卖出'}数量至少为${common.minQuantityTK}`)
        return
      }
      if (homeRoseSelected.goods.name === 'BTC'
        && common.bigNumber.lt(quantity, common.minQuantityBTC)) {
        Toast.message(`BTC${buyOrSell ? '买入' : '卖出'}数量至少为${common.minQuantityBTC}`)
        return
      }
      dispatch(actions.create({
        goods_id: homeRoseSelected.goods.id,
        currency_id: homeRoseSelected.currency.id,
        direct: buyOrSell ? 'buy' : 'sell',
        price,
        quantity,
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
    const { dispatch, buyOrSell, navigation, delegateCreateVisible, depthMap, user,
      homeRoseSelected, price, quantity, amount, shelvesBuy, shelvesSell, latestDeals,
      latestDealsVisible, getShelvesVisible, getDepthMapVisible, amountVisible,
    } = this.props
    let goodsName = ''
    let currencyName = ''
    let amountVisibleCurrency = 0
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      const currencyId = homeRoseSelected.currency.id
      if (currencyId === 1) {
        amountVisibleCurrency = amountVisible.TK
      } else if (currencyId === 2) {
        amountVisibleCurrency = amountVisible.BTC
      } else if (currencyId === 3) {
        amountVisibleCurrency = amountVisible.CNYT
      }
    }

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
                value={price === 0 ? '' : `${price}`}
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
                value={quantity === 0 ? '' : `${quantity}`}
                onChange={e => this.onChange(e, 'quantity')}
              />

              <TransactionsSlider
                viewStyle={{
                  marginTop: common.margin10 / 2,
                  marginLeft: common.margin10,
                  marginRight: common.margin10 / 2,
                }}
                sliderValue={quantity}
                minimumValue={0}
                maximumValue={amountVisibleCurrency}
                onValueChange={() => {
                  // dispatch(actions.textInputDelegateUpdate({ price, quantity: value, amount }))
                }}
              />

              <TextInputTransactions
                placeholder={`成交金额（${currencyName}）`}
                value={amount === 0 ? '' : `${amount}`}
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
                >{`${amountVisibleCurrency} ${currencyName}`}</Text>
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
              <View
                style={{
                  height: common.margin8 * 5 + common.h14_5 * 5 + common.margin10 * 3,
                }}
              >
                <ShelvesListView
                  goodsName={goodsName}
                  currencyName={currencyName}
                  type={common.sell}
                  dataSource={this.shelvesSellDS(shelvesSell)}
                  rowPress={(rd) => {
                    const p = rd.price
                    const temp = common.bigNumber.multipliedBy(p, quantity)
                    const a = common.toFix6(temp)
                    dispatch(actions.textInputDelegateUpdate({
                      price: p,
                      quantity,
                      amount: Number(a),
                    }))
                  }}
                />
              </View>
              <View
                style={{
                  height: common.margin8 * 5 + common.h14_5 * 5,
                }}
              >
                <ShelvesListView
                  type={common.buy}
                  dataSource={this.shelvesBuyDS(shelvesBuy)}
                  rowPress={(rd) => {
                    const p = rd.price
                    const temp = common.bigNumber.multipliedBy(p, quantity)
                    const a = common.toFix6(temp)
                    dispatch(actions.textInputDelegateUpdate({
                      price: p,
                      quantity,
                      amount: Number(a),
                    }))
                  }}
                />
              </View>
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
    buyOrSell: store.deal.buyOrSell,
    latestDeals: store.deal.latestDeals,
    latestDealsVisible: store.deal.latestDealsVisible,

    user: store.user.user,

    amountVisible: store.asset.amountVisible,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    price: store.delegate.price,
    quantity: store.delegate.quantity,
    amount: store.delegate.amount,
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
