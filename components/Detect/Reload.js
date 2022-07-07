import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Reload({load}) {
  return (
    <View style = {styles.reload}>
      <Ionicons onPress={load} name='md-refresh' size={24} style={{color: '#ff304f'}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    reload: {
        position: 'absolute',
        top: 20,
        right: 20
    }
})