import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { common } from '../../constants/common'
import QRScannerView from './scan/QRScannerView'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'
import Alert from '../../components/Alert'
import TKWAValidator from '../../utils/TKWAValidator'
import actions from '../../actions/index'

class ScanBarCode extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
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

  componentDidMount() {
    const { navigation, language, dispatch, loggedIn } = this.props
    navigation.setParams({
      title: transfer(language, 'withdraw_scanTitle'),
    })
    if(loggedIn) dispatch(actions.sync())
  }

  barcodeReceived(barCode) {
    if (this.didFindData) {
      return
    }
    this.didFindData = true
    const { navigation, language, requestPair } = this.props
    const { coin, didScan } = navigation.state.params
    const data = barCode.data
    var address = data
    let pos = address.indexOf(':')
    if(pos >= 0 && pos != (address.length - 1)){
      address = address.substring(pos + 1)
    }

    let item = coin
    if(requestPair && requestPair.coinIdDic[item] && requestPair.coinIdDic[item].contract.chain){
      item = requestPair.coinIdDic[item].contract.chain
    }

    const disMatch = (!TKWAValidator.validate(address, item) && !TKWAValidator.validate(address, item, 'testnet'))
    if (disMatch) {
      const params1 = transfer(language, 'withdrawal_address_correct_required_1')
      const params2 = transfer(language, 'withdrawal_address_correct_required_2')
      Alert.alert(
        transfer(language, 'withdraw_scanNote'),
        `${params1} ${coin} ${params2}`,
        [
          {
            text: transfer(language, 'login_submit'),
            onPress: () => {
              navigation.goBack()
            },
          },
        ],
      )
      return
    } else if (didScan) {
      didScan(address)
    }
    navigation.goBack()
  }

  render() {
    const { language } = this.props
    return (
      <QRScannerView
        hintText={transfer(language, 'withdraw_takeBarcode')}
        onScanResultReceived={barCode => this.barcodeReceived(barCode)}
        renderTopBarView={() => null}
        renderBottomMenuView={() => null}
        rectHeight={262}
        rectWidth={262}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.system.language,
    loggedIn: state.authorize.loggedIn,
    requestPair: state.home.requestPair,
  }
}

export default connect(mapStateToProps)(ScanBarCode)
