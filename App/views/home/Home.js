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
                asset: [
                  {
                    amount: 0,
                    freezed: 0,
                    id: 1,
                    rechargeaddr: '',
                    token: { id: 1, name: 'TK' },
                  },
                  {
                    amount: 0,
                    freezed: 0,
                    id: 2,
                    rechargeaddr: '',
                    token: { id: 2, name: 'BTC' },
                  },
                  {
                    amount: 0,
                    freezed: 0,
                    id: 3,
                    rechargeaddr: '',
                    token: { id: 3, name: 'CNYT' },
                  },
                ],
              }))
            }
          })
          break
        case constants.GET_ROSE_SUCCEED:
          dispatch(actions.getShelves({ goods_id: resp.goods.id, currency_id: resp.currency.id }))
          dispatch(actions.latestDeals({ goods_id: resp.goods.id, currency_id: resp.currency.id }))
          dispatch(actions.getDepthMap({ goods_id: resp.goods.id, currency_id: resp.currency.id }))
          break
        default:
          break
      }
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  renderRow(rd) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => navigation.navigate('Detail')}
      >
        <HomeCell rd={rd} />
      </TouchableOpacity>
    )
  }

  render() {
    const { announcement, imgHashApi, navigation, user, homeRose } = this.props

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
        <ScrollView>
          <HomeSwiper
            announcement={announcement}
            imgHashApi={imgHashApi}
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

    banners: store.banners.banners,
    imgHashApi: store.banners.imgHashApi,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Home)
