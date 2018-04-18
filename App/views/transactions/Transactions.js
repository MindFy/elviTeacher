import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native'
import Menu from 'teaset/components/Menu/Menu'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../common'
import Depth from './Depth'
import TransactionsSlider from './TransactionsSlider'
import TextInputTransactions from './TextInputTransactions'
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
  constructor(props) {
    super(props)
    const { dispatch, goods, currency } = props

    this.showDelegateCreateResponse = false

    this.latestDealsDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.dealDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    // dispatch(getShelvesRequest({
    //   goods_id: goods.id,
    //   currency_id: currency.id,
    // }))
    dispatch(actions.latestDeals({
      goods_id: goods.id,
      currency_id: currency.id,
    }))
    dispatch(actions.getDepthMap({
      goods_id: goods.id,
      currency_id: currency.id,
    }))
  }

  componentDidMount() { }

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

  menuPress() {
    const { dispatch, tokenList } = this.props
    const items = [
      {
        title: `${tokenList[0].name}/${tokenList[1].name}`,
        onPress: () => {
          dispatch(actions.currentTokensUpdate(tokenList[0], tokenList[1]))
          dispatch(actions.latestDeals({
            goods_id: tokenList[0],
            currency_id: tokenList[1],
          }))
        },
      },
      {
        title: `${tokenList[0].name}/${tokenList[2].name}`,
        onPress: () => {
          dispatch(actions.currentTokensUpdate(tokenList[0], tokenList[2]))
          dispatch(actions.latestDeals({
            goods_id: tokenList[0],
            currency_id: tokenList[2],
          }))
        },
      },
      {
        title: `${tokenList[0].name}/${tokenList[3].name}`,
        onPress: () => {
          dispatch(actions.currentTokensUpdate(tokenList[0], tokenList[3]))
          dispatch(actions.latestDeals({
            goods_id: tokenList[0],
            currency_id: tokenList[3],
          }))
        },
      },
      {
        title: `${tokenList[1].name}/${tokenList[2].name}`,
        onPress: () => {
          dispatch(actions.currentTokensUpdate(tokenList[1], tokenList[2]))
          dispatch(actions.latestDeals({
            goods_id: tokenList[1],
            currency_id: tokenList[2],
          }))
        },
      },
    ]
    Menu.show({
      x: 50,
      y: 126,
    }, items)
  }

  topBarPress(b) {
    const { dispatch, buyOrSell } = this.props
    if (buyOrSell !== b) {
      dispatch(actions.buyOrSellUpdate(b))
      dispatch(actions.textInputDelegateUpdate('', '', ''))
    }
  }

  buyOrSellPress() {
    const { dispatch, goods, currency, buyOrSell, price, quantity } = this.props
    dispatch(actions.create({
      currency_id: goods.id,
      goods_id: currency.id,
      direct: buyOrSell ? 'buy' : 'sell',
      price: Number(price),
      quantity: Number(quantity),
    }))
  }

  handleDelegateCreateRequest() {
    const { delegateCreateVisible, delegateCreateResponse } = this.props
    if (!delegateCreateVisible && !this.showDelegateCreateResponse) return

    if (delegateCreateVisible) {
      this.showDelegateCreateResponse = true
    } else {
      this.showDelegateCreateResponse = false
      if (delegateCreateResponse.success) {
        Toast.success('挂单成功')
      } else {
        Toast.fail(delegateCreateResponse.error.message)
      }
    }
  }

  renderLatestDealsRow(rd, sid, rid) {
    let textColor = null
    let marginTop = null
    if (rd.endDirect === 'sell') {
      textColor = common.redColor
    } else {
      textColor = common.greenColor
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
        >{rd.dealPrice}</Text>
        <Text style={{
          color: 'white',
          fontSize: common.font12,
        }}
        >{rd.quantity}</Text>
      </View>
    )
  }

  renderLatestDealsHeader() {
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

  renderDealRow(rd) {
    const { user } = this.props
    let textColor = null
    if (rd.buyer.id === user.id) {
      textColor = common.redColor
    } else if (rd.seller.id === user.id) {
      textColor = common.greenColor
    }
    const date = new Date(rd.createdAt)
    const zero1 = date.getMinutes() < 10 ? '0' : ''
    const zero2 = date.getSeconds() < 10 ? '0' : ''

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
        >{`${date.getHours()}:${zero1}${date.getMinutes()}:${zero2}${date.getSeconds()}`}</Text>
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

  renderDealHeader() {
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
    const { buyOrSell, navigation, delegateCreateVisible,
      goods, currency, price, quantity, amount, deal, latestDeals,
    } = this.props
    this.handleDelegateCreateRequest()

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
              onPress={() => navigation.navigate('Delegate')}
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
              <TouchableOpacity
                style={{
                  marginLeft: common.margin10,
                  marginTop: common.margin10,
                  flexDirection: 'row',
                }}
                activeOpacity={common.activeOpacity}
                onPress={() => this.menuPress()}
              >
                <Text style={{
                  color: common.textColor,
                  fontSize: common.font16,
                }}
                >{`${goods.name}/${currency.name}`}</Text>
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
                placeholder="0.987652"
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
                placeholder="数量（ETH）"
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
                placeholder="成交金额（BTC）"
                keyboardType="number-pad"
                value={amount}
                onChange={e => this.onChange(e, 'amount')}
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

            <ListView
              style={{
                width: common.sw / 2,
              }}
              dataSource={this.latestDealsDS(latestDeals)}
              renderRow={(rd, sid, rid) => this.renderLatestDealsRow(rd, sid, rid)}
              renderHeader={() => this.renderLatestDealsHeader()}
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
            dataSource={this.dealDS(deal)}
            renderRow={(rd, sid, rid) => this.renderDealRow(rd, sid, rid)}
            renderHeader={() => this.renderDealHeader()}
            enableEmptySections
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    deal: store.deal.deal,
    latestDeals: store.deal.latestDeals,
    goods: store.deal.goods,
    currency: store.deal.currency,
    price: store.deal.price,
    quantity: store.deal.quantity,
    amount: store.deal.amount,
    buyOrSell: store.deal.buyOrSell,

    user: store.user.user,

    tokenList: store.delegate.tokenList,
    shelves: store.delegate.shelves,
    depthMap: store.delegate.depthMap,

    delegateCreateVisible: store.delegate.delegateCreateVisible,
    delegateCreateResponse: store.delegate.delegateCreateResponse,

    getDepthMapVisible: store.delegate.getDepthMapVisible,
    getDepthMapResponse: store.delegate.getDepthMapResponse,
  }
}

export default connect(
  mapStateToProps,
)(Transactions)
