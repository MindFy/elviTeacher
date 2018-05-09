import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import MeCell from './MeCell'

class Rebates extends Component {
  componentDidMount() { }

  render() {
    const { navigation, user } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <ScrollView>
          <StatusBar
            barStyle={'light-content'}
          />

          <Image
            style={{
              height: common.h234,
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
            source={require('../../assets/VCG.png')}
          />

          <MeCell
            viewStyle={{
              marginTop: common.margin10,
            }}
            leftImageHide
            onPress={() => {
              if (user) navigation.navigate('UpdateEmail')
              else navigation.navigate('LoginStack')
            }}
            title="邮箱绑定"
          />
          <MeCell
            leftImageHide
            onPress={() => this.showOverlay()}
            title="谷歌验证码"
          />

        </ScrollView>

        <View
          style={{
            position: 'absolute',
            top: common.margin20,
            height: common.h44,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: common.font16,
              width: '100%',
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >超级返利</Text>
        </View>

      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Rebates)
