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
} from 'react-native'
import {
  common,
  storeRead,
  storeDelete,
} from '../common'
import HomeCell from './HomeCell'
import HomeSwiper from './HomeSwiper'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Home extends Component {
  constructor(props) {
    super(props)
    const { dispatch, user } = props
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.testdata = [
      ['ETH', '0.00082722', '0.98%', 1],
      ['TK', '0.00082722', '0.98%', 0],
    ]

    this.showSyncResponse = false
    this.showFindBannersResponse = false

    this.readAndDisplay()
    dispatch(actions.findAnnouncement(schemas.findAnnouncement()))
    dispatch(actions.findBanners(schemas.findBanners()))
    if (user) {
      dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
    }
  }

  readAndDisplay() {
    const { dispatch } = this.props
    storeRead(common.user, (result) => {
      const objectResult = JSON.parse(result)
      dispatch(actions.findUserUpdate(objectResult))
      dispatch(actions.sync())
    })
  }

  handleSyncRequest() {
    const { user, dispatch, syncVisible, syncResponse } = this.props
    if (!syncVisible && !this.showSyncResponse) return

    if (syncVisible) {
      this.showSyncResponse = true
    } else {
      this.showSyncResponse = false
      if (syncResponse.success && !syncResponse.result.mobile.length) {
        storeDelete(common.user, (error) => {
          if (!error) {
            dispatch(actions.findUserUpdate(undefined))
          }
        })
      } else {
        dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
        dispatch(actions.findUser(schemas.findUser(user.id)))
      }
    }
  }

  renderRow(rd) {
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.props.navigation.navigate('Detail')}
      >
        <HomeCell rd={rd} />
      </TouchableOpacity>
    )
  }

  render() {
    this.handleSyncRequest()

    const { announcement, banners } = this.props

    const btnTitles = ['充值', '提现', '当前委托', '法币交易']
    const btns = []
    const navigateKeys = ['Recharge', 'Cash', 'Delegate', '法币交易']
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
            this.props.navigation.navigate(navigateKeys[i])
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
            banners={banners}
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
            dataSource={this.dataSource(this.testdata)}
            renderRow={rd => this.renderRow(rd)}
            enableEmptySections
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
    user: store.user.user,

    syncVisible: store.user.syncVisible,
    syncResponse: store.user.syncResponse,
  }
}

export default connect(
  mapStateToProps,
)(Home)
