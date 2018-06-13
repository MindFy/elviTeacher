import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  Clipboard,
  ScrollView,
  StyleSheet,
  CameraRoll,
  RefreshControl,
  Alert,
} from 'react-native'
import {
  Toast,
  Overlay,
  ActionSheet,
} from 'teaset'
import BigNumber from 'bignumber.js'
import { common } from '../../constants/common'
import * as actions from '../../actions/rebates'
import * as api from '../../services/api'
import * as schemas from '../../schemas/user'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  backBtn: {
    height: common.w40,
    width: common.w40,
    justifyContent: 'center',
  },
  backImage: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  headerImage: {
    height: common.h234,
    width: '100%',
  },
  headerShadow: {
    position: 'absolute',
    height: common.h234,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  uidTitle: {
    marginTop: common.margin15,
    marginLeft: common.margin10,
    color: common.placeholderColor,
    fontSize: common.font14,
  },
  prefixNoView: {
    marginTop: common.margin15,
    marginLeft: common.margin10,
    borderColor: common.borderColor,
    backgroundColor: common.navBgColor,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prefixNo: {
    marginLeft: common.margin10,
    color: common.textColor,
    fontSize: common.font14,
    alignSelf: 'center',
  },
  qrImage: {
    height: common.h15,
    width: common.h15,
  },
  copyBtn: {
    marginRight: common.margin10,
    alignSelf: 'center',
  },
  copy: {
    color: common.btnTextColor,
    fontSize: common.font14,
  },
  recommendLink: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginBottom: common.margin10,
    color: common.textColor,
    fontSize: common.font14,
    width: '80%',
    alignSelf: 'center',
  },
  recommendImageView: {
    marginTop: common.margin15,
    marginLeft: common.margin10,
    width: '25%',
    flexDirection: 'row',
  },
  recommendImage: {
    height: common.h15,
    width: common.h15,
  },
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
  tipStyle: {
    marginTop: common.margin15,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    fontSize: common.font14,
    color: common.placeholderColor,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayBtn: {
    backgroundColor: '#fff',
    borderRadius: common.radius6,
    height: '80%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
})

class Rebates extends Component {
  static navigationOptions(props) {
    return ({
      headerTitle: '超级返利',
      headerLeft: (
        <NextTouchableOpacity
          style={styles.backBtn}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.backImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    })
  }

  componentDidMount() {
    this.refreshData()
  }

  refreshData() {
    const { dispatch, loggedInResult } = this.props
    dispatch(actions.requestUser(schemas.findUser(loggedInResult.id)))
  }

  clipUID() {
    const { user } = this.props
    const { prefixNo, recommendId } = user
    if (recommendId.length) {
      Clipboard.setString(prefixNo + recommendId)
      Toast.success('复制成功')
    }
  }

  clipLink() {
    const { user } = this.props
    const { prefixNo, recommendId } = user
    let rebatesLink = ''
    if (recommendId.length) {
      rebatesLink = api.rebatesLink + prefixNo + recommendId
    }
    if (rebatesLink.length) {
      Clipboard.setString(rebatesLink)
      Toast.success('复制成功')
    }
  }

  _shareImage = () => {
    Alert.alert('暂时不用做')
  }

  _saveImage = (uri) => {
    CameraRoll.saveToCameraRoll(uri).then((() => {
      Toast.success('保存成功')
    })).catch(() => {
      Toast.fail('保存失败')
    })
  }

  _tapLinkQRImage = (uri) => {
    const items = [
      {
        title: '保存图片',

        onPress: () => {
          this._saveImage(uri)
        },
      },
    ]
    const cancelItem = { title: '取消', type: 'cancel' }
    ActionSheet.show(items, cancelItem)
  }

  showLinkQr() {
    const { user } = this.props
    const { prefixNo, recommendId } = user
    let rebatesLinkQr = ''
    if (recommendId.length) {
      rebatesLinkQr = api.rebatesLinkQr + prefixNo + recommendId
    }
    const overlayView = (
      <Overlay.View
        style={styles.overlay}
        modal={false}
        overlayOpacity={0}
        ref={(e) => { this.overlayView = e }}
      >
        <NextTouchableOpacity
          style={styles.overlayBtn}
          activeOpacity={1}
          onPress={() => {
            this._tapLinkQRImage(rebatesLinkQr)
          }}
        >
          {rebatesLinkQr.length ?
            <Image
              style={styles.overlayImage}
              source={{ uri: rebatesLinkQr }}
            /> : null}
        </NextTouchableOpacity>
      </Overlay.View>
    )
    Overlay.show(overlayView)
  }

  renderRefreshControl = () => {
    const { userLoading } = this.props
    return (
      <RefreshControl
        onRefresh={() => this.refreshData()}
        refreshing={userLoading}
      />
    )
  }

  render() {
    const {
      totalCountTK,
      totalCountBTC,
      invitationCount,
      user,
    } = this.props
    const { levelName, prefixNo, recommendId } = user
    let rebatesLink = ''
    if (recommendId.length) {
      rebatesLink = api.rebatesLink + prefixNo + recommendId
    }

    const tkINum = totalCountTK ? BigNumber(totalCountTK).toFixed(0, 1) : 0
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
    if (levelName === common.user.level1) {
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
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          refreshControl={this.renderRefreshControl()}
        >
          <Image
            style={styles.headerImage}
            source={require('../../assets/VCG.png')}
            resizeMode="cover"
          />

          <Text style={styles.uidTitle}>
            我的UID
          </Text>
          <View style={[styles.prefixNoView, {
            width: '60%',
            height: common.h40,
          }]}
          >
            <Text style={styles.prefixNo}>
              {`${prefixNo}${recommendId}`}
            </Text>
            <NextTouchableOpacity
              style={styles.copyBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => this.clipUID()}
            >
              <Text style={styles.copy}>复制</Text>
            </NextTouchableOpacity>
          </View>
          <Text style={styles.uidTitle}>推荐链接</Text>
          <View style={[styles.prefixNoView, {
            width: '85%',
          }]}
          >
            <Text style={styles.recommendLink}>
              {rebatesLink}
            </Text>
            <NextTouchableOpacity
              style={styles.copyBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => this.clipLink()}
            >
              <Text style={styles.copy}>复制</Text>
            </NextTouchableOpacity>
          </View>
          <NextTouchableOpacity
            style={styles.recommendImageView}
            activeOpacity={common.activeOpacity}
            onPress={() => this.showLinkQr()}
          >
            <Image
              style={styles.qrImage}
              source={require('../../assets/qrcode_yellow.png')}
            />
            <Text style={styles.prefixNo}>
              推荐二维码
            </Text>
          </NextTouchableOpacity>

          <View style={styles.textOutContainer}>
            <Text style={styles.textTitle}>
              已推荐好友
            </Text>
            <View style={styles.textContainer}>
              <Text style={styles.textInner}>
                {invitationCount}
              </Text>
            </View>
          </View>

          {tkItem}

          {btcItem}
          <Text style={styles.tipStyle}>
            若需了解更多返利详情，请前往币图官网-超级返利中查看
          </Text>
          <View style={{ height: 44 }} />
          <View style={styles.headerShadow} />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.rebates,
    loggedInResult: state.authorize.loggedInResult,
  }
}

export default connect(
  mapStateToProps,
)(Rebates)
