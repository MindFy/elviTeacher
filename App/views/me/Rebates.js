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
  StyleSheet,
  CameraRoll,
  Alert,
} from 'react-native'
import {
  Toast,
  Overlay,
  ActionSheet,
} from 'teaset'
import BigNumber from 'bignumber.js'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import * as api from '../../services/api'


const styles = StyleSheet.create({
  textOutContainer: {
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  textTitle: {
    marginTop: common.margin15,
    fontSize: common.font14,
    color: common.placeholderColor,
  },
  textInner: {
    color: common.textColor,
    marginLeft: common.margin10,
  },
  textContainer: {
    marginTop: common.margin15,
    borderColor: common.borderColor,
    backgroundColor: common.navBgColor,
    borderWidth: 1,
    height: common.h40,
    justifyContent: 'center',
  },
})

class Rebates extends Component {
  static navigationOptions(props) {
    return ({
      headerTitle: '超级返利',
      headerLeft:
      (
        <TouchableOpacity
          style={{
            height: common.w40,
            width: common.w40,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
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
      ),
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    })
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user.levelName && user.levelName === common.user.level0) {
      dispatch(actions.rebatesCountTK({ user_id: user.id, token_id: 1 }))
    } else if (user.levelName && user.levelName === common.user.level1) {
      dispatch(actions.rebatesCountTK({ user_id: user.id, token_id: 1 }))
      dispatch(actions.rebatesCountBTC({ user_id: user.id, token_id: 2 }))
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

  _shareImage = () => {
    Alert.alert('暂时不用做')
  }

  _saveImage = (uri) => {
    CameraRoll.saveToCameraRoll(uri).then((() => {
      Toast.message('保存成功')
    })).catch(() => {
      Toast.message('保存失败')
    })
  }

  _tapLinkQRImage = (uri) => {
    const items = [
      { title: '分享', onPress: this._shareImage },
      { title: '保存图片',
        onPress: () => {
          this._saveImage(uri)
        } },
    ]
    const cancelItem = { title: '取消', type: 'cancel' }
    ActionSheet.show(items, cancelItem)
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
        ref={(e) => { this.overlayView = e }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: common.radius6,
            height: '80%',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={1}
          onPress={() => {
            this._tapLinkQRImage(rebatesLinkQr)
          }}
        >
          {
            rebatesLinkQr.length ?
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  alignSelf: 'center',
                }}
                source={{ uri: rebatesLinkQr }}
              /> : null
          }
        </TouchableOpacity>
      </Overlay.View>
    )
    Overlay.show(overlayView)
  }

  render() {
    const { user, totalCountTK, totalCountBTC, invitationTotalCount } = this.props
    const prefixNo = user.prefixNo ? user.prefixNo : ''
    const recommendId = user.recommendId ? user.recommendId : ''
    const rebatesLink = recommendId.length ? (api.rebatesLink + prefixNo + recommendId) : ''

    const tkINum = totalCountTK ? BigNumber(totalCountTK).toFixed(8, 1) : 0
    const tkItem = (
      <View style={styles.textOutContainer}>
        <Text style={styles.textTitle}>
          已获得的收益TK
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.textInner}>
            {tkINum}
          </Text>
        </View>
      </View>
    )

    let btcItem = null
    if (user.levelName && user.levelName === common.user.level1) {
      const btcNum = totalCountBTC ? BigNumber(totalCountBTC).toFixed(8, 1) : 0
      btcItem = (
        <View style={styles.textOutContainer}>
          <Text style={styles.textTitle}>
          已获得的收益BTC
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.textInner}>
              {btcNum}
            </Text>
          </View>
        </View>
      )
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
              width: '100%',
            }}
            source={require('../../assets/VCG.png')}
            resizeMode="cover" // "cover" | "contain" | "stretch" | "repeat" | "center";
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
              color: common.placeholderColor,
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

          <View style={styles.textOutContainer}>
            <Text style={styles.textTitle}>
              已推荐好友
            </Text>
            <View style={styles.textContainer}>
              <Text style={styles.textInner}>
                {invitationTotalCount}
              </Text>
            </View>
          </View>

          {tkItem}

          {btcItem}

          <View style={{ height: 44 }} />

          <View
            style={{
              position: 'absolute',
              height: common.h234,
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    totalCount: store.rebates.totalCount,
    totalCountTK: store.rebates.totalCountTK,
    totalCountBTC: store.rebates.totalCountBTC,

    invitationTotalCount: store.invitation.totalCount,
  }
}

export default connect(
  mapStateToProps,
)(Rebates)
