import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import SelectToken from './SelectToken'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Cash extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '提现',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          <TouchableOpacity
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
  constructor(props) {
    super(props)
    const { dispatch } = props

    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    dispatch(actions.findAddress(schemas.findAddress()))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.selectTokenUpdate({
      selectedToken: common.selectedTokenDefault,
      tokenListSelected: false,
    }))
  }

  addAddressPress() {
    const { selectedToken } = this.props
    this.props.navigation.navigate('AddAddress', { selectedToken })
  }

  leftImagePress() {
    this.props.navigation.goBack()
  }

  renderRow(rd) {
    return (
      <View
        style={{
          marginTop: common.margin35,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h35,
          borderWidth: 1,
          borderRadius: 1,
          borderColor: common.borderColor,
          backgroundColor: common.navBgColor,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >{rd.withdrawaddr}</Text>
      </View>
    )
  }

  renderBottomView() {
    const { selectedToken, address } = this.props
    if (selectedToken !== common.selectedTokenDefault) {
      return (
        <View>
          <Text style={{
            marginTop: common.margin22,
            fontSize: common.font16,
            color: common.placeholderColor,
            alignSelf: 'center',
          }}
          >可用</Text>
          <Text style={{
            marginTop: common.margin10,
            fontSize: common.font30,
            alignSelf: 'center',
            color: 'white',
          }}
          >{`133${selectedToken.amount}`}</Text>
          <TextInput
            style={{
              marginTop: common.margin35,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h35,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="提现金额"
            placeholderTextColor={common.placeholderColor}
            keyboardType={'number-pad'}
          />

          <View
            style={{
              marginTop: common.margin5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
                alignSelf: 'center',
              }}
            >{`手续费：88${selectedToken.token.name}`}</Text>
            <Text
              style={{
                marginRight: common.margin10,
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
                alignSelf: 'center',
              }}
            >{`实际到账：88${selectedToken.token.name}`}</Text>
          </View>

          <ListView
            dataSource={this.dataSource(address)}
            renderRow={rd => this.renderRow(rd)}
            enableEmptySections
          />
          {
            selectedToken.id === 2 ?
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => this.addAddressPress()}
              >
                <View
                  style={{
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h35,
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: common.borderColor,
                    backgroundColor: common.navBgColor,
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: common.btnTextColor,
                      fontSize: common.font12,
                      alignSelf: 'center',
                    }}
                  >添加新地址</Text>
                </View>
              </TouchableOpacity> : null
          }

        </View>
      )
    }
    return null
  }
  render() {
    const { dispatch, selectedToken, asset, tokenListSelected } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        <ScrollView>
          <SelectToken
            asset={asset}
            selectedToken={selectedToken}
            tokenListSelected={tokenListSelected}
            dispatch={dispatch}
          />

          {this.renderBottomView()}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    asset: store.asset.asset,

    address: store.address.address,
    selectedToken: store.address.selectedToken,
    tokenListSelected: store.address.tokenListSelected,
  }
}

export default connect(
  mapStateToProps,
)(Cash)
