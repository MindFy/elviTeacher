import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native'
import NextTouchableOpacity from './NextTouchableOpacity'

const BUTTON_HEIGHT = 40
const DEFAULT_FONT_FAMILY = 'helvetica'
const COLOR_YELLOW = 'rgb(255,213,2)'
const COLOR_GRAY = 'rgb(38,43,65)'
const COLOR_BLACK = 'rgb(24,27,42)'
const COLOR_LIGHT_GRAY = 'rgb(97,105,137)'

const styles = StyleSheet.create({
  button: {
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 14,
  },
  icon: {
    height: BUTTON_HEIGHT,
    width: BUTTON_HEIGHT,
  },
})

class TKButton extends PureComponent {
  getTheme() {
    const { theme } = this.props
    let containerTheme
    let buttonTheme
    let captionTheme
    if (theme === 'yellow') {
      buttonTheme = {
        marginLeft: 38,
        marginRight: 38,
        backgroundColor: COLOR_YELLOW,
        height: BUTTON_HEIGHT,
      }
      captionTheme = {
        color: COLOR_BLACK,
        fontSize: 16,
      }
    } else if (theme === 'small') {
      captionTheme = {
        color: COLOR_YELLOW,
        fontSize: 12,
      }
    } else if (theme === 'gray') {
      buttonTheme = {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: COLOR_GRAY,
        height: BUTTON_HEIGHT,
      }
      captionTheme = { color: COLOR_YELLOW }
    } else if (theme === 'home-balance') {
      containerTheme = {
        flex: 1,
        backgroundColor: COLOR_GRAY,
        height: 2 * BUTTON_HEIGHT,
        justifyContent: 'center',
      }
      buttonTheme = {
        alignSelf: 'center',
      }
      captionTheme = {
        marginTop: 5,
        color: COLOR_YELLOW,
      }
    } else if (theme === 'balance') {
      buttonTheme = {
        alignSelf: 'center',
      }
      captionTheme = {
        marginTop: 10,
        color: COLOR_LIGHT_GRAY,
      }
    }
    return { containerTheme, buttonTheme, captionTheme }
  }

  render() {
    const { icon, onPress, caption, style, titleStyle } = this.props
    const { containerTheme, buttonTheme, captionTheme } = this.getTheme()

    let iconImage
    if (icon) {
      iconImage = (
        <Image source={icon} style={[styles.icon]} />
      )
    }

    const content = (
      <NextTouchableOpacity
        {...this.props}
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.button, buttonTheme, style]}
      >
        {iconImage}
        <Text
          style={[styles.caption, captionTheme, titleStyle]}
        >
          {caption}
        </Text>
      </NextTouchableOpacity>
    )

    if (containerTheme) {
      return (
        <View
          style={[containerTheme]}
        >
          {content}
        </View>
      )
    }
    return (content)
  }
}

module.exports = TKButton
