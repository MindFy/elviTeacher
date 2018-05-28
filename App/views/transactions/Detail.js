import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ListView,
} from 'react-native'
import {
  Menu,
  Drawer,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import KLine from './KLineWeb'
import DelegateBuySellDrawer from './DelegateBuySellDrawer'
import Depth from '../transactions/Depth'
import DetailList from './DetailList'
import actions from '../../actions/index'
import { store } from '../../index'
import LatestDealList from './LatestDealList'

class Detail extends Component {
  constructor(props) {
    super(props)

    this.shelvesBuyDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.shelvesSellDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.currentDelegateDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
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
    Menu.show({ x: common.sw / 2, y: 64 }, items)
  }

  topBarPress(b) {
    const { dispatch, buyOrSell, user, navigation } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    if (buyOrSell !== b) {
      dispatch(actions.buyOrSellUpdate(b))
      dispatch(actions.textInputDelegateUpdate({ price: '', quantity: '', amount: '' }))
      const view = (
        <Provider store={store}>
          <DelegateBuySellDrawer />
        </Provider>
      )
      this.drawer = Drawer.open(view, 'bottom')
    }
  }

  renderNavigationBar = () => {
    const { navigation, homeRoseSelected, user } = this.props

    let goodsName = ''
    let currencyName = ''

    goodsName = homeRoseSelected.goods.name
    currencyName = homeRoseSelected.currency.name

    return (
      <View
        style={{
          height: common.h44 + 20,
          backgroundColor: common.navBgColor,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: common.margin20,
            left: 0,
            height: common.w40,
            width: common.w40,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => navigation.goBack()}
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
        <TouchableOpacity
          style={{
            marginTop: common.margin20,
            height: common.h44,
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => this.menuPress()}
        >
          <Text
            style={{
              fontSize: common.font16,
              alignSelf: 'center',
              color: 'white',
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: common.margin20,
            right: common.margin10,
            height: common.h44,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            if (user) navigation.navigate('Delegate')
            else navigation.navigate('LoginStack')
          }}
        >
          <Text
            style={{
              fontSize: common.font16,
              alignSelf: 'center',
              color: 'white',
            }}
          >我的委托</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderMarketView = () => {
    const { homeRoseSelected, valuation } = this.props

    const currencyName = homeRoseSelected.currency.name
    let quantity = ''
    let cprice = ''
    let rose = 0
    let cpriceColor = common.redColor
    let dirImageSource
    let symbol = ''
    let rmb = '0.00'

    if (homeRoseSelected) {
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        cprice = new BigNumber(homeRoseSelected.cprice).toFixed(p, 1)
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
        rmb = valuation.rates[currencyName][common.token.CNYT]
        rmb = new BigNumber(cprice).multipliedBy(rmb).toFixed(2, 1)
      }
    }

    return (
      <View
        style={{
          marginTop: common.margin15,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: common.font16,
              color: cpriceColor,
              alignSelf: 'flex-end',
            }}
          >{`${cprice}`}</Text>
          {
            dirImageSource
              ? <Image
                style={{
                  marginLeft: common.margin5,
                  marginBottom: 2,
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
              fontSize: common.font12,
              color: common.textColor,
              alignSelf: 'flex-end',
            }}
          >{`¥ ${rmb}`}</Text>
          <Text
            style={{
              marginLeft: common.margin5,
              fontSize: common.font12,
              color: cpriceColor,
              alignSelf: 'flex-end',
            }}
          >{`${symbol}${rose}%`}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: common.font10,
              color: common.placeholderColor,
              alignSelf: 'flex-end',
              textAlign: 'right',
            }}
          >24小时成交量</Text>
          <Text
            style={{
              marginLeft: common.margin5,
              fontSize: common.font10,
              color: common.textColor,
              alignSelf: 'flex-end',
              textAlign: 'right',
            }}
          >{quantity}</Text>
        </View>
      </View>
    )
  }

  renderDepthView = () => {
    const { dispatch, kLineOrDepth, depthMap } = this.props
    return (
      <View
        style={{
          marginTop: common.margin15,
          backgroundColor: common.blackColor,
          width: '100%',
        }}
      >
        {
          kLineOrDepth === common.ui.kLine
            ? <KLine
              width={common.sw}
              height={common.h263}
            />
            : <Depth
              depthMap={depthMap}
              width={common.sw}
              height={common.h263}
            />
        }
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            height: common.h20,
            width: common.h30,
            backgroundColor: common.navBgColor,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            if (kLineOrDepth === common.ui.kLine) {
              dispatch(actions.kLineOrDepthUpdate(common.ui.depth))
            } else {
              dispatch(actions.kLineOrDepthUpdate(common.ui.kLine))
            }
          }}
        >
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              alignSelf: 'center',
            }}
          >{kLineOrDepth === common.ui.kLine ? '深度' : 'k线'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderShelvesView = () => {
    const { shelvesBuy, shelvesSell } = this.props
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <ListView
          style={{
            width: '50%',
          }}
          dataSource={this.shelvesBuyDS(shelvesBuy)}
          renderHeader={() => this.renderHeader(common.buy)}
          renderRow={(rd, sid, rid) => this.renderRow(rd, rid, common.buy)}
          enableEmptySections
          removeClippedSubviews={false}
        />
        <ListView
          style={{
            width: '50%',
          }}
          dataSource={this.shelvesSellDS(shelvesSell)}
          renderHeader={() => this.renderHeader(common.sell)}
          renderRow={(rd, sid, rid) => this.renderRow(rd, rid, common.sell)}
          enableEmptySections
          removeClippedSubviews={false}
        />
      </View>
    )
  }

  renderDetailList = () => <DetailList />

  renderOrderHistory = () => <LatestDealList />

  renderToolBar = () => (
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
          onPress={() => this.topBarPress(true)}
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
          onPress={() => this.topBarPress(false)}
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
  )

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        {this.renderNavigationBar()}

        <ScrollView>

          {this.renderMarketView()}

          {this.renderDepthView()}

          {this.renderDetailList()}

          {this.renderOrderHistory()}

        </ScrollView>

        {this.renderToolBar()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,

    depthMap: state.delegate.depthMap,

    valuation: state.asset.valuation,

    homeRose: state.dealstat.homeRose,
    homeRoseSelected: state.dealstat.homeRoseSelected,

    kLineOrDepth: state.ui.kLineOrDepth,
  }
}

export default connect(
  mapStateToProps,
)(Detail)
