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
import { common } from '../../constants/common'
import Depth from './Depth'
import DelegateShelves from './DelegateShelves'
import TransactionsTopBar from './TransactionsTopBar'
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
          (navigation.state.params && navigation.state.params.type)
            ? <TouchableOpacity
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
            : <TouchableOpacity
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

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  // 币币对小数规则
  precision(price, quantity) {
    const { homeRoseSelected } = this.props
    let p = price
    let q = quantity

    if (
      ((homeRoseSelected && homeRoseSelected.goods.name === common.token.BTC
        && homeRoseSelected.currency.name === common.token.CNYT))
      || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
        && homeRoseSelected.currency.name === common.token.CNYT))
      || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
        && homeRoseSelected.currency.name === common.token.TK))
    ) {
      // p:2 q:4 a:6
      p = Number(p).toFixed(2)
      q = Number(q).toFixed(4)
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.CNYT) {
      // p:4 q:0 a:4
      p = Number(p).toFixed(4)
      q = Number(q).toFixed(0)
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:8 q:0 a:8
      p = Number(p).toFixed(8)
      q = Number(q).toFixed(0)
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:6 q:4 a:6
      p = Number(p).toFixed(6)
      q = Number(q).toFixed(4)
    }

    return { p, q }
  }

  renderLatestDealsRow(rd) {
    let textColor = null
    if (rd.endDirect === 'buy') {
      textColor = common.redColor
    } else if (rd.endDirect === 'sell') {
      textColor = common.greenColor
    }
    const createdAt = common.dfTime(rd.createdAt)
    const { p, q } = this.precision(rd.dealPrice, rd.quantity)
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
        >{p}</Text>
        <Text style={{
          flex: 1,
          color: 'white',
          fontSize: common.font12,
          textAlign: 'right',
        }}
        >{q}</Text>
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
    const { depthMap, homeRoseSelected, latestDeals, latestDealsVisible,
      getShelvesVisible, getDepthMapVisible, navigation } = this.props

    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <TransactionsTopBar
          navigation={navigation}
        />

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
          showsVerticalScrollIndicator={false}
        >
          <DelegateShelves
            navigation={navigation}
          />

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
    latestDeals: store.deal.latestDeals,
    latestDealsVisible: store.deal.latestDealsVisible,

    user: store.user.user,

    homeRoseSelected: store.dealstat.homeRoseSelected,

    depthMap: store.delegate.depthMap,
    getShelvesVisible: store.delegate.getShelvesVisible,
    getDepthMapVisible: store.delegate.getDepthMapVisible,
  }
}

export default connect(
  mapStateToProps,
)(Transactions)
