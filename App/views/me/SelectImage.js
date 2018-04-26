import React, { Component } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'rn-image-picker-d3j'
import { common } from '../../constants/common'

const options = {
  title: '请选择一张图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
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
        console.log('resp---》', response)
        
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
      <TouchableOpacity
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
        onPress={() => this.showImagePicker()}
      >
        <Image
          style={{
            marginTop: common.margin28,
            width: common.w40,
            height: common.w40,
            alignSelf: 'center',
          }}
          source={require('../../assets/添加copy2.png')}
        />
        <Text
          style={{
            marginTop: common.margin20,
            color: common.placeholderColor,
            fontSize: common.font14,
            alignSelf: 'center',
          }}
        >{title}</Text>
      </TouchableOpacity>
    )
  }
}
