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
  DeviceEventEmitter,
} from 'react-native'
import {
  common,
  storeRead,
  storeDelete,
} from '../../constants/common'
import * as constants from '../../constants/index'
import HomeCell from './HomeCell'
import HomeSwiper from './HomeSwiper'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import ws from '../../websocket/ws'

class Home extends Component {
  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.showFindBannersResponse = false
  }

  componentDidMount() {
    const { dispatch, homeRoseSelected } = this.props
    dispatch(actions.sync())
    dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
    dispatch(actions.findBanners(schemas.findBanners()))
    dispatch(actions.getRose(homeRoseSelected))

    this.listener = DeviceEventEmitter.addListener(common.listenerNoti, (type, resp) => {
      switch (type) {
        case constants.SYNC_SUCCEED:
          storeRead(common.user, (result) => {
            const temp = JSON.parse(result)
            dispatch(actions.findUserUpdate(temp))
            dispatch(actions.findUser(schemas.findUser(temp.id)))
            dispatch(actions.findAssetList(schemas.findAssetList(temp.id)))
          })
          break
        case constants.SYNC_FAILED:
          storeDelete(common.user, (error) => {
            if (!error) {
              dispatch(actions.findUserUpdate(undefined))
              dispatch(actions.findAssetListUpdate({
                asset: [],
                amountVisible: undefined,
              }))
            }
          })
          break
        case constants.GET_ROSE_SUCCEED:
          dispatch(actions.getShelves({ goods_id: resp.goods.id, currency_id: resp.currency.id }))
          dispatch(actions.latestDeals({ goods_id: resp.goods.id, currency_id: resp.currency.id }))
          dispatch(actions.getDepthMap({ goods_id: resp.goods.id, currency_id: resp.currency.id }))
          break

        case common.ws.handicap:
          if (this.props.user) {
            dispatch(actions.findAssetList(schemas.findAssetList(this.props.user.id)))
          }
          dispatch(actions.wsGetShelvesUpdate(resp))
          break
        case common.ws.market:
          dispatch(actions.getRose(homeRoseSelected))
          break
        case common.ws.deals:
          dispatch(actions.wsDealsUpdate(resp))
          break
        case common.ws.delegates:
          if (resp.userid) {
            dispatch(actions.wsDelegatesCurrentUpdate(resp.delegates))
          }
          break

        default:
          break
      }
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  renderRow(rd) {
    const { navigation, dispatch } = this.props
    return (
      <TouchableOpacity
        style={{
          marginLeft: common.margin10,
          marginRight: common.margin10,
          marginBottom: common.margin10,
        }}
        activeOpacity={common.activeOpacity}
        onPress={() => {
          dispatch(actions.homeRoseSelectedUpdate(rd))
          this.getUIData(rd.goods.id, rd.currency.id)
          ws.onopen(rd.goods.id, rd.currency.id)
          navigation.navigate('Detail')
        }}
      >
        <HomeCell rd={rd} />
      </TouchableOpacity>
    )
  }

  render() {
    const { announcement, imgHashApi, banners, getRoseVisible, findBannersVisible,
      announcementVisible, navigation, user, homeRose, dispatch, homeRoseSelected } = this.props

    const btnTitles = ['充值', '提现', '当前委托', '法币交易']
    const btns = []
    const navigateKeys = ['Recharge', 'Cash', 'Delegate', 'LegalDeal']
    for (let i = 0; i < btnTitles.length; i++) {
      let source = require('../../assets/充值.png')
      switch (i) {
        case 1:
          source = require('../../assets/充值copy.png')
          break
        case 2:
          source = require('../../assets/当前委托.png')
          break
        case 3:
          source = require('../../assets/法币交易.png')
          break
        default:
          break
      }
      btns.push(
        <TouchableOpacity
          key={i}
          style={{
            flex: 1,
            backgroundColor: common.navBgColor,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {
            if (!user) {
              navigation.navigate('LoginStack')
            } else {
              navigation.navigate(navigateKeys[i])
            }
          }}
        >
          <Image
            style={{
              marginTop: common.margin10,
              width: common.w40,
              height: common.h40,
              alignSelf: 'center',
            }}
            source={source}
          />
          <Text
            style={{
              marginTop: common.margin5,
              marginBottom: common.margin10,
              alignSelf: 'center',
              color: common.textColor,
              fontSize: common.font14,
            }}
          >{btnTitles[i]}</Text>
        </TouchableOpacity>,
      )
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
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
                dispatch(actions.findBanners(schemas.findBanners()))
                dispatch(actions.getRose(homeRoseSelected))
              }}
              refreshing={
                !!((getRoseVisible || findBannersVisible || announcementVisible))
              }
              colors={[common.textColor]}
              progressBackgroundColor={common.navBgColor}
              progressViewOffset={0}
              tintColor={common.textColor}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <HomeSwiper
            announcement={announcement}
            banners={banners}
            imgHashApi={imgHashApi}
            bannerBlock={(element) => {
              navigation.navigate('Banner', { element })
            }}
            announcementBlock={(element) => {
              navigation.navigate('Announcement', { element })
            }}
          />

          <View
            style={{
              height: common.h80,
              flexDirection: 'row',
            }}
          >{btns}</View>

          <View
            style={{
              marginTop: common.margin10,
              marginBottom: common.margin10,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 1,
              }}
            />
            <Text
              style={{
                flex: 1,
                color: common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'center',
              }}
            >市场/最新价</Text>
            <Text
              style={{
                flex: 1,
                color: common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'center',
              }}
            >涨跌幅</Text>
          </View>

          <ListView
            dataSource={this.dataSource(homeRose)}
            renderRow={rd => this.renderRow(rd)}
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
    announcement: store.announcement.announcement,
    announcementVisible: store.announcement.announcementVisible,

    banners: store.banners.banners,
    imgHashApi: store.banners.imgHashApi,
    findBannersVisible: store.banners.findBannersVisible,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,
    getRoseVisible: store.dealstat.getRoseVisible,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Home)
