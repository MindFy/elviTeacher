import React, { PureComponent } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import NextTouchableOpacity from './NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 27,
    height: 27,
    margin: 8,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    margin: 8,
  },
})

class NavigationItem extends PureComponent {
  render() {
    const icon = this.props.icon &&
      <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />

    const title = this.props.title &&
      <Text style={[styles.title, this.props.iconStyle]}>{this.props.title}</Text>
    return (
      <NextTouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
        delay={200}
      >
        {icon}
        {title}
      </NextTouchableOpacity>
    )
  }
}

export default NavigationItem
