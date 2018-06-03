import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native'
import {
  common,
} from '../../constants/common'
import HomeRoseList from './HomeRoseList'
import HomeSwiper from './HomeSwiper'
import TKButton from '../../components/TKButton'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.sync())
    dispatch(actions.findBanners(schemas.findBanners()))
    dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
  }

  homeBtnPress = (i) => {
    const { navigation, user, dispatch } = this.props
    const navigateKeys = ['Recharge', 'Withdraw', 'Orders', 'Orders']
    if (!user) {
      navigation.navigate('LoginStack')
    } else {
      // if (i === 2) {
      //   dispatch(actions.selectionBarUpdate(common.selectionBar.left))
      //   dispatch(actions.currentOrHistoryUpdate({
      //     currentOrHistory: common.delegate.current,
      //   }))
      // } else if (i === 3) {
      //   dispatch(actions.selectionBarUpdate(common.selectionBar.right))
      //   dispatch(actions.currentOrHistoryUpdate({
      //     currentOrHistory: common.delegate.history,
      //   }))
      // }
      navigation.navigate(navigateKeys[i])
    }
  }

  renderHomeBtns = () => {
    const btnTitles = ['充值', '提现', '当前委托', '历史委托']
    const homeBtns = []
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
      homeBtns.push(
        <TKButton
          key={i}
          titleStyle={{ color: common.textColor }}
          theme={'home-balance'}
          caption={btnTitles[i]}
          icon={source}
          onPress={() => this.homeBtnPress(i)}
        />,
      )
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {homeBtns}
      </View>
    )
  }

  renderRefreshControl = () => {
    const { dispatch, announcementVisible, findBannersVisible } = this.props
    return (
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
    )
  }

  render() {
    const { announcement, imgHashApi, banners, navigation } = this.props

    const homeBtns = this.renderHomeBtns()
    const refreshControl = this.renderRefreshControl()

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        <ScrollView
          refreshControl={refreshControl}
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

          {homeBtns}

          <HomeRoseList navigation={navigation} />
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
