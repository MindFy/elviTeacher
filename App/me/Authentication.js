import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from './Navigator'

export default class Authentication extends Component {
  constructor() {
    super()
    this.state = {
      authenticationState: -1, //-1普通状态，1成功，0失败
    }
  }
  componentDidMount() { }
  confirmPress(authenticationState) {
    this.setState({
      authenticationState: authenticationState,
    })
  }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle='身份认证'
          leftImagePress={() => this.props.navigation.goBack()} />
        {this.renderScrollView(this.state.authenticationState)}
      </View>
    )
  }

  /*  */
  renderScrollView(state) {
    switch (state) {
      case -1:
        return (
          <ScrollView>
            <View style={styles.inputViewStyle} >
              <TextInput style={styles.inputStyle}
                placeholder={'姓名'}
                placeholderTextColor={common.placeholderTextColor} />
            </View>

            <View style={styles.inputViewStyle} >
              <TextInput style={styles.inputStyle}
                placeholder={'身份证号'}
                placeholderTextColor={common.placeholderTextColor} />
            </View>

            <View style={[styles.inputViewStyle, {justifyContent: 'flex-start', height: common.loadPhotoViewH}]} >
              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <Image style={styles.loadPhotoImageStyle}
                  source={require('../assets/添加copy2.png')} />
              </TouchableOpacity>
              <Text style={styles.loadPhotoTextStyle} >请上传身份证正面照片</Text>
            </View>

            <View style={[styles.inputViewStyle, {justifyContent: 'flex-start', height: common.loadPhotoViewH}]} >

              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <Image style={styles.loadPhotoImageStyle}
                  source={require('../assets/添加copy2.png')} />
              </TouchableOpacity>
              <Text style={styles.loadPhotoTextStyle} >请上传身份证反面照片</Text>
            </View>

            <View style={[styles.inputViewStyle, {justifyContent: 'flex-start', height: common.loadPhotoViewH}]} >

              <TouchableOpacity activeOpacity={0.7} >
                <Image style={{
                  marginTop: 30,
                  alignSelf: 'center',
                  width: 40,
                  height: 40,
                }}
                  source={require('../assets/添加copy2.png')} />
              </TouchableOpacity>
              <Text style={{
                marginTop: 10,
                color: '#5F6786',
                alignSelf: 'center'
              }} >请上传手持身份证照片</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.confirmPress(0)} >
              <View style={{
                marginTop: 40,
                marginLeft: 10,
                marginRight: 10,
                height: 40,
                backgroundColor: 'rgb(38,42,65)',
                justifyContent: 'center',
              }} >
                <Text style={{
                  color: 'rgb(255,213,2)',
                  fontSize: 16,
                  alignSelf: 'center',
                }} >确认</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>
        )
      case 1:
        return (
          <ScrollView>
            <Image style={{
              marginTop: 120,
              alignSelf: 'center',
              width: 80,
              height: 80,
            }}
              source={require('../assets/成功.png')} />
            <Text style={{
              marginTop: 20,
              color: 'rgb(223,228,225)',
              alignSelf: 'center',
              fontSize: 20,
            }} >恭喜！身份认证成功！</Text>
          </ScrollView>
        )
      case 0:
        return (
          <ScrollView>
            <Image style={{
              marginTop: 120,
              alignSelf: 'center',
              width: 80,
              height: 80,
            }}
              source={require('../assets/失败.png')} />
            <Text style={{
              marginTop: 20,
              color: 'rgb(223,228,225)',
              alignSelf: 'center',
              fontSize: 16,
              textAlign: 'center',
            }} >抱歉！您的身份认证未通过审核！</Text>
            <Text style={{
              marginTop: 10,
              color: 'rgb(223,228,225)',
              alignSelf: 'center',
              fontSize: 16,
              textAlign: 'center',
            }} >失败原因：照片不清晰</Text>
            <TouchableOpacity style={{
              marginTop: 10,
            }}
              activeOpacity={0.7}
              onPress={() => this.confirmPress(1)} >
              <Text style={{
                color: 'rgb(255,213,2)',
                fontSize: 16,
                alignSelf: 'center',
              }} >再次认证</Text>
            </TouchableOpacity>
          </ScrollView>
        )
    }
  }
}