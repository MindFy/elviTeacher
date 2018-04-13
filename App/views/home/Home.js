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
} from '../../actions/home'
import { common } from '../common'
import HomeCell from './HomeCell'
import graphqlFindBanners from '../../schemas/home'

class Home extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.state = {
      testdata: [
        ['ETH', '0.00082722', '0.98%', 1],
        ['TK', '0.00082722', '0.98%', 0],
      ],
    }

    this.showFindBannersResponse = false

    dispatch(findBannersRequest(graphqlFindBanners()))
  }

  handleFindBannersRequest() {
    const { banners, findBannersVisible, findBannersResponse } = this.props
    if (!findBannersVisible && !this.showFindBannersResponse) return
    console.log('findBannersResponse->', findBannersResponse)

    if (findBannersVisible) {
      this.showFindBannersResponse = true
    } else {
      this.showFindBannersResponse = false
      if (findBannersResponse.success) {
        console.log('banners->', banners)
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
          <Image
            style={{
              width: common.sw,
              height: common.h233,
            }}
            resizeMode="stretch"
            resizeMethod="scale"
            source={require('../../assets/VCG21gic.png')}
          />
          <View
            style={{
              height: common.h32,
              backgroundColor: common.borderColor05,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.placeholderColor,
                fontSize: common.font12,
              }}
            >公告: xxxxxxxxxxxxxxxx</Text>
          </View>

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
            dataSource={this.dataSource(this.state.testdata)}
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
