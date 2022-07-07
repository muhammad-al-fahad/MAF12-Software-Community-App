import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'

export default function Reload({load}) {
  return (
    <View style = {styles.reload}>
      <EvilIcons name="search" size={40} color="gray"  onPress={load}/>
    </View>
  )
}

const styles = StyleSheet.create({
    reload: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})