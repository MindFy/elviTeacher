import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import {
  common,
} from '../../constants/common'
import HomeMarket from './HomeMarket'
import HomeSwiper from './HomeSwiper'
import TKButton from '../../components/TKButton'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import * as exchange from '../../actions/exchange'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
})

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(actions.requestBanners(schemas.findBanners()))
    dispatch(actions.requestAnnouncements(schemas.findAnnouncement()))
    dispatch(actions.requestMarket())

    // dispatch(actions.sync())
    // dispatch(actions.getValuation())
  }

  marketPress(rd) {
    const { navigation, dispatch } = this.props
    dispatch(exchange.updatePair(rd))
    navigation.navigate('Deal')
  }

  menuBtnPress = (i) => {
    const { navigation, user } = this.props
    const navigateKeys = ['Recharge', 'Withdraw', 'Orders', 'Orders']
    if (!user) {
      navigation.navigate('LoginStack')
    } else if (i === 2) {
      navigation.navigate('Orders', {
        title: '当前委托',
      })
    } else if (i === 3) {
      navigation.navigate('Orders', {
        title: '历史委托',
      })
    } else {
      navigation.navigate(navigateKeys[i])
    }
  }

  renderMenuBtns = () => {
    const btnTitles = ['充值', '提现', '当前委托', '历史委托']
    const menuBtns = []
    const icons = [
      require('../../assets/充值.png'),
      require('../../assets/充值copy.png'),
      require('../../assets/当前委托.png'),
      require('../../assets/法币交易.png'),
    ]

    for (let i = 0; i < btnTitles.length; i++) {
      menuBtns.push(
        <TKButton
          key={i}
          titleStyle={{ color: common.textColor }}
          theme={'home-balance'}
          caption={btnTitles[i]}
          icon={icons[i]}
          onPress={() => this.menuBtnPress(i)}
        />,
      )
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {menuBtns}
      </View>
    )
  }

  renderRefreshControl = () => {
    const { dispatch, announcementsLoading, bannersLoading } = this.props
    return (
      <RefreshControl
        onRefresh={() => {
          dispatch(actions.requestAnnouncements(schemas.findAnnouncement()))
          dispatch(actions.requestBanners(schemas.findBanners()))
        }}
        refreshing={
          !!((bannersLoading || announcementsLoading))
        }
        colors={[common.textColor]}
        progressBackgroundColor={common.navBgColor}
        progressViewOffset={0}
        tintColor={common.textColor}
      />
    )
  }

  render() {
    const { announcements, banners, market, navigation } = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <ScrollView
          refreshControl={this.renderRefreshControl()}
          showsVerticalScrollIndicator={false}
        >
          <HomeSwiper
            banners={banners}
            announcements={announcements}
            onPress={(e) => {
              navigation.navigate(e.type, { element: e.element })
            }}
          />

          {this.renderMenuBtns()}

          <HomeMarket
            data={market}
            onPress={rd => this.marketPress(rd)}
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.home,
    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Home)
