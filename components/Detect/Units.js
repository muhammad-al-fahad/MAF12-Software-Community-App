import { View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'

export default function Units({unitsSystem, setUnitsSystem}) {

  return (
    <View style = {styles.unitsSystem}>
      <Picker selectedValue={unitsSystem} onValueChange = {(item) => setUnitsSystem(item)} mode = 'dropdown'>
        <Picker.Item label = '°C' value = 'metric'/>
        <Picker.Item label = '°F' value = 'imperial'/>
        <Picker.Item label = '°K' value = 'standard'/>
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
    unitsSystem: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      position: 'absolute',
      top: 10,
      left: 20,
      height: 50,
      width: 100
    }
})