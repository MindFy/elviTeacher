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
