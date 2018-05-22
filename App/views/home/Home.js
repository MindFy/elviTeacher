import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import {
  common,
  storeRead,
  storeDelete,
} from '../../constants/common'
import * as constants from '../../constants/index'
import HomeRoseList from './HomeRoseList'
import HomeSwiper from './HomeSwiper'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import ws from '../../websocket/ws'

class Home extends Component {
  constructor() {
    super()
    this.showFindBannersResponse = false
  }

  componentDidMount() {
    const { dispatch, homeRoseSelected, user } = this.props
    dispatch(actions.sync())
    dispatch(actions.getValuation())
    dispatch(actions.getRose({ homeRoseSelected, user }))
    dispatch(actions.findBanners(schemas.findBanners()))
    dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
    this.timer1 = setInterval(() => {
      dispatch(actions.getRose({
        homeRoseSelected: this.props.homeRoseSelected, user: this.props.user,
      }))
      if (this.props.homeRoseSelected) {
        this.getUIData(this.props.homeRoseSelected.goods.id,
          this.props.homeRoseSelected.currency.id)
      }
    }, 5000)

    this.listener = DeviceEventEmitter.addListener(common.noti.home, (type, resp) => {
      switch (type) {
        case constants.SYNC_SUCCEED:
          storeRead(common.user.string, (result) => {
            const temp = JSON.parse(result)
            dispatch(actions.findUserUpdate(temp))
            dispatch(actions.findUser(schemas.findUser(temp.id)))
            dispatch(actions.findAssetList(schemas.findAssetList(temp.id)))
            if (this.props.homeRoseSelected) {
              ws.onclose(this.props.homeRoseSelected.goods.id,
                this.props.homeRoseSelected.currency.id)
              ws.onopen(this.props.homeRoseSelected.goods.id,
                this.props.homeRoseSelected.currency.id, temp)
            }
          })
          break
        case constants.SYNC_FAILED:
          storeDelete(common.user.string, (error) => {
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
          dispatch(actions.getRose({
            homeRoseSelected: this.props.homeRoseSelected,
            user: this.props.user,
          }))
          dispatch(actions.getValuation())
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
    clearInterval(this.timer1)
    this.listener.remove()
  }

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  homeRoseListCellPress(rd) {
    const { navigation, dispatch, user, homeRoseSelected } = this.props
    ws.onclose(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
    dispatch(actions.homeRoseSelectedUpdate(rd))
    ws.onopen(rd.goods.id, rd.currency.id, user)
    this.getUIData(rd.goods.id, rd.currency.id)
    navigation.navigate('Detail')
  }

  render() {
    const { announcement, imgHashApi, banners, navigation, user, homeRose } = this.props

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
          // refreshControl={
          //   <RefreshControl
          //     onRefresh={() => {
          //       dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
          //       dispatch(actions.findBanners(schemas.findBanners()))
          //       dispatch(actions.getRose({ homeRoseSelected, user: this.props.user }))
          //     }}
          //     refreshing={
          //       !!((getRoseVisible || findBannersVisible || announcementVisible))
          //     }
          //     colors={[common.textColor]}
          //     progressBackgroundColor={common.navBgColor}
          //     progressViewOffset={0}
          //     tintColor={common.textColor}
          //   />
          // }
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

          <HomeRoseList
            data={homeRose}
            onPress={rd => this.homeRoseListCellPress(rd)}
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
