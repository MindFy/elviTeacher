import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../../constants/common'
import HomeRoseList from './HomeRoseList'
import HomeSwiper from './HomeSwiper'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Home extends Component {
  constructor() {
    super()
    this.showFindBannersResponse = false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.findBanners(schemas.findBanners()))
    dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  render() {
    const { dispatch, announcement, imgHashApi, banners, navigation, user, announcementVisible,
      findBannersVisible } = this.props

    const btnTitles = ['充值', '提现', '当前委托', '交易']
    const btns = []
    const navigateKeys = ['Recharge', 'Cash', 'Delegate', 'Transactions']
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
              }}
              refreshing={
                !!((findBannersVisible || announcementVisible))
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

          <HomeRoseList
            navigation={navigation}
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

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Home)
