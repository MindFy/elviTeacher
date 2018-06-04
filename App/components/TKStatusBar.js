import React from 'react'
import { View, StatusBar } from 'react-native'

export default function TKStatusBar() {
  return (
    <View style={{ height: 20, backgroundColor: '#171B29', alignItems: 'center' }}>
      <StatusBar barStyle={'light-content'} />
    </View>
  )
}
