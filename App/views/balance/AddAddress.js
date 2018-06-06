import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import {
  updateForm,
  requestAddressAdd,
  requestAddressClearError,
} from '../../actions/addressAdd'
import { getVerificateCode } from '../../actions/user'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  titleContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    height: common.h40,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: common.borderColor,
    backgroundColor: common.navBgColor,
    justifyContent: 'center',
  },
  title: {
    marginLeft: common.margin10,
    fontSize: common.font14,
    color: common.textColor,
  },
  addressContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  remarkContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  addContainer: {
    marginTop: common.margin40,
  },
})

class AddAddress extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '添加地址',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: (
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Toast.fail('添加地址错误')
      this.props.dispatch(requestAddressClearError())
    }

    if (this.props.loading && !nextProps.loading) {
      Toast.fail('添加地址成功')
      Overlay.hide(this.overlayViewKey)
      this.props.navigation.goBack()
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(updateForm({
      address: '',
      remark: '',
      authCode: '',
    }))
  }

  handleChangeAddress = (address) => {
    const { dispatch, formState } = this.props
    dispatch(updateForm({
      ...formState,
      address,
    }))
  }

  handleRemarkAddress = (remark) => {
    const { dispatch, formState } = this.props
    dispatch(updateForm({
      ...formState,
      remark,
    }))
  }

  handleAuthCode = (authCode) => {
    const { dispatch, formState } = this.props
    dispatch(updateForm({
      ...formState,
      authCode,
    }))
  }

  confirmPress() {
    const { formState } = this.props
    if (!formState.address.length) {
      Toast.message('请填写提币地址')
      return
    }
    if (!formState.remark.length) {
      Toast.message('请填写备注')
      return
    }
    this.showOverlay()
  }

  addPress() {
    const { dispatch, formState, navigation } = this.props
    dispatch(requestAddressAdd({
      token_id: navigation.state.params.tokenId,
      withdrawaddr: formState.address,
      remark: formState.remark,
      code: formState.authCode,
    }))
  }

  showOverlay() {
    const { dispatch, user } = this.props
    const overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <TKViewCheckAuthorize
          mobile={user.mobile}
          onChangeText={this.handleAuthCode}
          codePress={(count) => {
            this.authCount = count
            dispatch(getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => this.addPress()}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  render() {
    const { navigation, formState, loading } = this.props

    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {navigation.state.params.title}
            </Text>
          </View>

          <TKInputItem
            viewStyle={styles.addressContainer}
            inputStyle={{
              fontSize: common.font14,
            }}
            placeholder="地址"
            value={formState.address}
            onChangeText={this.handleChangeAddress}
          />

          <TKInputItem
            viewStyle={styles.remarkContainer}
            inputStyle={{ fontSize: common.font14 }}
            placeholder="备注"
            value={formState.remark}
            onChangeText={this.handleRemarkAddress}
          />

          <TKButton
            style={styles.addContainer}
            onPress={() => this.confirmPress()}
            caption={'添加'}
            theme={'gray'}
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.addressAdd,
    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(AddAddress)
