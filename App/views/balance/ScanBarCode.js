import React, { Component } from 'react'
import WAValidator from 'wallet-address-validator'
import { Image, Alert } from 'react-native'
import { common } from '../../constants/common'
import QRScannerView from './scan/QRScannerView'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

class ScanBarCode extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '扫一扫',
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
          <NextTouchableOpacity
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
              source={require('../../assets/arrow_left_left.png')}
            />
          </NextTouchableOpacity>
        ),
    }
  }

  constructor(props) {
    super(props)
    this.didFindData = false
  }

  barcodeReceived(barCode) {
    if (this.didFindData) {
      return
    }
    this.didFindData = true
    const { navigation } = this.props
    const { coin, didScan } = navigation.state.params
    const data = barCode.data
    const disMatch = !WAValidator.validate(data, coin) &&
    !WAValidator.validate(data, coin, 'testnet')
    if (disMatch) {
      Alert.alert(
        '提示',
        `请填写正确的${coin}提币地址！`,
        [
          {
            text: '确定',
            onPress: () => {
              navigation.goBack()
            },
          },
        ],
      )
      return
    } else if (didScan) {
      didScan(data)
    }
    navigation.goBack()
  }

  render() {
    return (
      <QRScannerView
        hintText="将条码放入框内，即可自动扫描"
        onScanResultReceived={barCode => this.barcodeReceived(barCode)}
        renderTopBarView={() => null}
        renderBottomMenuView={() => null}
        rectHeight={262}
        rectWidth={262}
      />
    )
  }
}

export default ScanBarCode
