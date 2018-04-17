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
  findBannersRequest,
  banndersAddUpdate,
} from '../../actions/home'
import { common } from '../common'
import HomeCell from './HomeCell'
import HomeSwiper from './HomeSwiper'
import graphqlFindBanners from '../../schemas/home'

class Home extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.testdata = [
      ['ETH', '0.00082722', '0.98%', 1],
      ['TK', '0.00082722', '0.98%', 0],
    ]

    this.showFindBannersResponse = false

    dispatch(findBannersRequest(graphqlFindBanners()))
  }

  handleFindBannersRequest() {
    const { findBannersVisible, findBannersResponse } = this.props
    if (!findBannersVisible && !this.showFindBannersResponse) return

    if (findBannersVisible) {
      this.showFindBannersResponse = true
    } else {
      this.showFindBannersResponse = false
      if (!findBannersResponse.success) {
        console.log('finderBannersResponse-error->', findBannersResponse.error.message)
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
    this.handleFindBannersRequest()

    const { banners } = this.props

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

function mapStateToProps(state) {
  return {
    banners: state.home.banners,

    findBannersVisible: state.home.findBannersVisible,
    findBannersResponse: state.home.findBannersResponse,
  }
}

export default connect(
  mapStateToProps,
)(Home)
