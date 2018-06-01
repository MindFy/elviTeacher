import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import {
  common,
  storeRead,
  storeDelete,
} from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import * as constants from '../../constants/index'
import ws from '../../websocket/ws'

class HomeRoseList extends Component {
  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  componentWillMount() {
    const { dispatch, homeRoseSelected, user } = this.props
    dispatch(actions.sync())
    dispatch(actions.getValuation())
    dispatch(actions.getRose({ homeRoseSelected, user }))

    this.timer1 = setInterval(() => {
      if (this.props.user) {
        dispatch(actions.findAssetList(schemas.findAssetList(this.props.user.id)))
      }
      dispatch(actions.getValuation())
      dispatch(actions.getRose({
        homeRoseSelected: this.props.homeRoseSelected, user: this.props.user,
      }))
      if (this.props.homeRoseSelected) {
        this.getUIData(this.props.homeRoseSelected.goods.id,
          this.props.homeRoseSelected.currency.id)
      }
    }, 1500)
  }

  componentWillUnmount() {
    clearInterval(this.timer1)
  }

  getUIData(goodsId, currencyId) {
    const { dispatch, user } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
    if (user) {
      dispatch(actions.findDelegateSelfCurrentWithGoodsId(
        schemas.findDelegateSelfCurrentWithGoodsId(user.id, goodsId, currencyId)))
    }
  }

  homeRoseListCellPress(rd) {
    const { navigation, dispatch, user, homeRoseSelected } = this.props
    ws.onclose(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
    dispatch(actions.homeRoseSelectedUpdate(rd))
    ws.onopen(rd.goods.id, rd.currency.id, user)
    this.getUIData(rd.goods.id, rd.currency.id)
    navigation.navigate('Detail')
  }

  renderHeader() {
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          marginBottom: common.margin10,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            width: '30%',
          }}
        />
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >市场</Text>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >/</Text>
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              textAlign: 'left',
            }}
          >最新价</Text>
        </View>
        <Text
          style={{
            width: '30%',
            color: common.placeholderColor,
            fontSize: common.font12,
            textAlign: 'center',
          }}
        >涨跌幅</Text>
      </View>
    )
  }

  renderRow(rd) {
    let dirImageSource
    let priceColor = null
    let rangeColor = null
    let rose = new BigNumber(rd.rose).multipliedBy(100)
    let cprice
    if (rose.gt(0)) {
      priceColor = common.redColor
      rangeColor = common.redColor
      dirImageSource = require('../../assets/箭头.png')
    } else if (rose.lt(0)) {
      priceColor = common.greenColor
      rangeColor = common.greenColor
      dirImageSource = require('../../assets/箭头copy.png')
    } else {
      priceColor = common.textColor
      rangeColor = common.textColor
    }
    rose = rose.toFixed(2, 1)
    common.precision(rd.goods.name, rd.currency.name, (p) => {
      cprice = new BigNumber(rd.cprice).toFixed(p, 1)
    })

    return (
      <TouchableOpacity
        style={{
          marginLeft: common.margin10,
          marginRight: common.margin10,
          marginBottom: common.margin10,
          borderRadius: common.radius6,
          backgroundColor: common.borderColor,
          flexDirection: 'row',
        }}
        activeOpacity={common.activeOpacity}
        onPress={() => this.homeRoseListCellPress(rd)}
      >
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              marginLeft: common.margin20,
              height: common.h40,
              width: common.h40,
            }}
            source={require('../../assets/111.png')}
          />
        </View>

        <View
          style={{
            width: '40%',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              marginTop: common.margin10,
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                flex: 1,
                color: common.textColor,
                fontSize: common.font20,
                textAlign: 'right',
              }}
            >{rd.goods.name}</Text>
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font20,
              }}
            >/</Text>
            <Text
              style={{
                flex: 1,
                color: common.placeholderColor,
                fontSize: common.font16,
                paddingBottom: 0,
                alignSelf: 'flex-end',
                textAlign: 'left',
              }}
            >{rd.currency.name}</Text>
          </View>

          <View
            style={{
              marginTop: common.margin5,
              marginBottom: common.margin10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}
          >
            {
              dirImageSource ?
                <Image
                  style={{
                    height: common.w10,
                    width: common.w10,
                    alignSelf: 'center',
                  }}
                  source={dirImageSource}
                /> : null
            }
            <Text
              style={{
                marginLeft: common.margin5,
                fontSize: common.font12,
                color: priceColor,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >{cprice}</Text>
          </View>
        </View>

        <Text
          style={{
            width: '30%',
            fontSize: common.font16,
            color: rangeColor,
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >{`${rose}%`}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { homeRose } = this.props
    return (
      <ListView
        dataSource={this.dataSource(homeRose)}
        renderRow={rd => this.renderRow(rd)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,
    getRoseVisible: store.dealstat.getRoseVisible,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(HomeRoseList)
