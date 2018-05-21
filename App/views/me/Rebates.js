import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StatusBar,
  Clipboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import * as api from '../../services/api'

class Rebates extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props
    if (user.levelName && user.levelName === common.user.level0) {
      dispatch(actions.rebatesCount({ user_id: user.id, token_id: 1 }))
    } else if (user.levelName && user.levelName === common.user.level1) {
      dispatch(actions.rebatesCount({ user_id: user.id, token_id: 2 }))
    }
    dispatch(actions.invitationTotalCount({ parentid: user.id }))
  }

  clipUID() {
    const { user } = this.props
    const prefixNo = user.prefixNo ? user.prefixNo : ''
    const recommendId = user.recommendId ? user.recommendId : ''
    if (recommendId.length) {
      Clipboard.setString(prefixNo + recommendId)
      Toast.message('复制成功')
    }
  }

  clipLink() {
    const { user } = this.props
    const prefixNo = user.prefixNo ? user.prefixNo : ''
    const recommendId = user.recommendId ? user.recommendId : ''
    const rebatesLink = recommendId.length ? (api.rebatesLink + prefixNo + recommendId) : ''
    if (rebatesLink.length) {
      Clipboard.setString(rebatesLink)
      Toast.message('复制成功')
    }
  }

  showLinkQr() {
    const { user } = this.props
    const prefixNo = user.prefixNo ? user.prefixNo : ''
    const recommendId = user.recommendId ? user.recommendId : ''
    const rebatesLinkQr = recommendId.length ? (api.rebatesLinkQr + prefixNo + recommendId) : ''
    const overlayView = (
      <Overlay.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <View
          style={{
            backgroundColor: '#fff',
            top: -common.w40,
            borderRadius: common.radius6,
            height: 2 * common.h100,
            width: 2 * common.h100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {
            rebatesLinkQr.length ?
              <Image
                style={{
                  height: 2 * common.h100,
                  width: 2 * common.h100,
                  alignSelf: 'center',
                }}
                source={{ uri: rebatesLinkQr }}
              /> : null
          }
        </View>
      </Overlay.View>
    )
    Overlay.show(overlayView)
  }

  render() {
    const { navigation, user, totalCount, invitationTotalCount } = this.props
    const prefixNo = user.prefixNo ? user.prefixNo : ''
    const recommendId = user.recommendId ? user.recommendId : ''
    const rebatesLink = recommendId.length ? (api.rebatesLink + prefixNo + recommendId) : ''
    let levelToken = ''
    if (user.levelName && user.levelName === common.user.level0) {
      levelToken = 'TK'
    } else if (user.levelName && user.levelName === common.user.level0) {
      levelToken = 'BTC'
    }
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
            }}
            source={require('../../assets/VCG.png')}
            resizeMode={'repeat'}
          />

          <Text
            style={{
              marginTop: common.margin15,
              marginLeft: common.margin10,
              color: common.placeholderColor,
              fontSize: common.font14,
            }}
          >我的UID</Text>
          <View
            style={{
              marginTop: common.margin15,
              marginLeft: common.margin10,
              width: '60%',
              height: common.h40,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >{`${prefixNo}${recommendId}`}</Text>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.clipUID()}
              style={{
                marginRight: common.margin10,
                alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font14,
                }}
              >复制</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: common.margin15,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font14,
            }}
          >推荐链接</Text>
          <View
            style={{
              marginTop: common.margin15,
              marginLeft: common.margin10,
              width: '85%',
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginTop: common.margin10,
                marginLeft: common.margin10,
                marginBottom: common.margin10,
                color: common.textColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >{rebatesLink}</Text>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.clipLink()}
              style={{
                marginRight: common.margin10,
                alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font14,
                }}
              >复制</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.showLinkQr()}
            style={{
              marginTop: common.margin15,
              marginLeft: common.margin10,
              width: '25%',
              flexDirection: 'row',
            }}
          >
            <Image
              style={{
                height: common.h15,
                width: common.h15,
              }}
              source={require('../../assets/二维码copy.png')}
            />
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.btnTextColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >推荐二维码</Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h120,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => {

              }}
              style={{
                flex: 1,
                backgroundColor: common.navBgColor,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  color: common.placeholderColor,
                  fontSize: common.font12,
                }}
              >已推荐好友</Text>
              <Text
                style={{
                  marginTop: common.margin20,
                  color: common.textColor,
                  fontSize: common.font30,
                  alignSelf: 'center',
                }}
              >{invitationTotalCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => {

              }}
              style={{
                flex: 1,
                marginLeft: common.margin5,
                backgroundColor: common.navBgColor,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  color: common.placeholderColor,
                  fontSize: common.font12,
                }}
              >已获得的收益</Text>
              <Text
                style={{
                  marginTop: common.margin20,
                  color: common.textColor,
                  fontSize: common.font30,
                  alignSelf: 'center',
                }}
              >{`${totalCount} ${levelToken}`}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              height: common.h234,
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}
          />
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            top: common.margin20,
            left: 0,
            right: 0,
            height: common.h44,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              width: common.w60,
              height: common.h44,
              justifyContent: 'center',
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
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >超级返利</Text>
          <View
            style={{
              width: common.w60,
              height: common.h44,
            }}
          />
        </View>

      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    totalCount: store.rebates.totalCount,
    invitationTotalCount: store.invitation.totalCount,
  }
}

export default connect(
  mapStateToProps,
)(Rebates)
