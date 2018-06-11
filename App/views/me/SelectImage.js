import React, { Component } from 'react'
import {
  Text,
  Image,
} from 'react-native'
import {
  ActionSheet,
} from 'teaset'
import ImagePicker from 'rn-image-picker-d3j'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

export default class SelectImage extends Component {
  componentDidMount() { }

  showImagePicker() {
    const { imagePickerBlock } = this.props

    const items = [
      {
        title: '拍照',
        onPress: () => {
          ImagePicker.launchCamera({
            cameraType: 'back',
            allowsEditing: false,
          }, (response) => {
            if (response.uri && response.uri.length) {
              const uri = common.IsIOS ? response.uri : response.path
              // const uri = response.uri.replace('file://', '')
              imagePickerBlock(uri)
            }
          })
        },
      },
      {
        title: '从相册选择',
        onPress: () => {
          ImagePicker.launchImageLibrary({
            allowsEditing: false,
          }, (response) => {
            if (response.uri && response.uri.length) {
              const uri = common.IsIOS ? response.uri : response.path
              // const uri = response.uri.replace('file://', '')
              imagePickerBlock(uri)
            }
          })
        },
      },
    ]
    const cancelItem = { title: '取消' }
    ActionSheet.show(items, cancelItem)
  }

  render() {
    const { title, avatarSource, onPress } = this.props
    if (avatarSource) {
      return (
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => {
            onPress()
            this.showImagePicker()
          }}
        >
          <Image
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h120,
              backgroundColor: common.navBgColor,
              borderColor: common.borderColor,
              borderWidth: 1,
            }}
            source={{ uri: (common.IsIOS ? avatarSource : `file://${avatarSource}`) }}
          />
        </NextTouchableOpacity>
      )
    }
    return (
      <NextTouchableOpacity
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h120,
          backgroundColor: common.navBgColor,
          borderColor: common.borderColor,
          borderWidth: 1,
        }}
        activeOpacity={common.activeOpacity}
        onPress={() => {
          onPress()
          this.showImagePicker()
        }}
      >
        <Image
          style={{
            marginTop: common.margin28,
            width: common.w40,
            height: common.w40,
            alignSelf: 'center',
          }}
          source={require('../../assets/plus2.png')}
        />
        <Text
          style={{
            marginTop: common.margin20,
            color: common.placeholderColor,
            fontSize: common.font14,
            alignSelf: 'center',
          }}
        >{title}</Text>
      </NextTouchableOpacity>
    )
  }
}
