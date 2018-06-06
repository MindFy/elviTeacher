import React, { Component } from 'react'
import { TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { common } from '../../constants/common'
import QRScannerView from './scan/QRScannerView'
import { updateForm } from '../../actions/withdraw'

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

  constructor(props) {
    super(props)
    this.didFindData = false
  }

  barcodeReceived(barCode) {
    if (this.didFindData) {
      return
    }
    this.didFindData = true
    const { dispatch, formState, navigation } = this.props
    dispatch(updateForm({
      ...formState,
      withdrawAddress: barCode.data,
    }))
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

function mapStateToProps(state) {
  return {
    ...state.withdraw,
  }
}

export default connect(
  mapStateToProps,
)(ScanBarCode)
