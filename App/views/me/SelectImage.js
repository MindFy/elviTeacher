import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { common } from '../../constants/common'

const options = {
  title: 'Select Avatar',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

export default class SelectImage extends Component {
  componentDidMount() { }

  showImagePicker() {
    const { imagePickerBlock } = this.props
    ImagePicker.showImagePicker(options, (response) => {
      if (response.data && response.data.length) {
        imagePickerBlock(response)
      }
    })
  }

  render() {
    const { title, avatarSource } = this.props
    if (avatarSource) {
      return (
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.showImagePicker()}
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
            source={{ uri: avatarSource }}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h120,
          backgroundColor: common.navBgColor,
          borderColor: common.borderColor,
          borderWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: common.margin28,
            width: common.w40,
            height: common.w40,
            alignSelf: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => this.showImagePicker()}
        >
          <Image
            style={{
              width: common.w40,
              height: common.w40,
            }}
            source={require('../../assets/添加copy2.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: common.margin20,
            color: common.placeholderColor,
            fontSize: common.font14,
            alignSelf: 'center',
          }}
        >{title}</Text>
      </View>
    )
  }
}
