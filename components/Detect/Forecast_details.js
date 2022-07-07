import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

export default function details({currentWeather, unitsSystem}) {
    const {feels_like: {day}, humidity, pressure, wind_speed} = currentWeather
    const wind_c = (wind_speed / (3600*1.61))*1000
    const wind_f = wind_speed / 1.61

  return (
    <View style = {styles.Details}>
        <View style = {styles.Row}>
            <View style = {{ ...styles.Box, justifyContent: 'center'}}>
              <View style = {styles.Row1}>
                <FontAwesome5 name = 'temperature-low' size={25} style={{color: '#ff304f'}}/>
                <View style = {styles.Items}>
                <Text style = {{color: 'white', fontSize:14, fontFamily: 'Lato-Regular', fontWeight: 'bold', marginTop: 10, marginRight: 20}}>Feels Like:</Text>
                {unitsSystem == 'metric'? (<Text style = {styles.textSecondary}>{day}° C</Text>) : unitsSystem == 'imperial'? (<Text style = {styles.textSecondary}>{day}° F</Text>) : (<Text style = {styles.textSecondary}>{day}° K</Text>)}
                </View>
              </View>
            </View>
            <View style = {{ ...styles.Box, justifyContent: 'center'}}>
              <View style = {styles.Row1}>
                <MaterialCommunityIcons name = 'water' size={30} style={{color: '#ff304f'}}/>
                <View style = {styles.Items}>
                <Text style = {{color: 'white', fontSize:14, fontFamily: 'Lato-Regular', fontWeight: 'bold', marginTop: 10}}>Humidity:</Text>
                <Text style = {styles.textSecondary}>{humidity} %</Text>
                </View>
              </View>
            </View>
      </View>
      <View style = {styles.Row}>
      <View style = {{ ...styles.Box, justifyContent: 'center'}}>
              <View style = {styles.Row1}>
                <MaterialCommunityIcons name = 'weather-windy' size={30} style={{color: '#ff304f'}}/>
                <View style = {styles.Items}>
                <Text style = {{color: 'white', fontSize:14, fontFamily: 'Lato-Regular', fontWeight: 'bold', marginTop: 10, marginRight: 20}}>Wind Speed:</Text>
                {unitsSystem == 'metric'? (<Text style = {styles.textSecondary}>{wind_c.toFixed(2)} x <View><Text style = {styles.Exponent}>10</Text><Text style={styles.Power}>-3</Text></View> m/s </Text>) : unitsSystem == 'imperial'? <Text style = {{...styles.textSecondary, marginRight: 30}}>{wind_f.toFixed(2)} m/h</Text> : <Text style = {{...styles.textSecondary, marginRight: 30}}>{wind_speed} Km/h</Text>}
                </View>
              </View>
            </View>
            <View style = {{ ...styles.Box, justifyContent: 'center'}}>
              <View style = {styles.Row1}>
                <MaterialCommunityIcons name = 'speedometer' size={30} style={{color: '#ff304f'}}/>
                <View style = {styles.Items}>
                <Text style = {{color: 'white', fontSize:14, fontFamily: 'Lato-Regular', fontWeight: 'bold', marginTop: 10, marginRight: 20}}>Pressure:</Text>
                <Text style = {styles.textSecondary}>{pressure} hPa</Text>
                </View>
              </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Details: {
        marginTop: 'auto',
        borderColor: '#dbdbdb',
        margin: 15
    },
    Row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Row1:{
      alignItems: 'center',
      top: -100
    },
    Box: {
        flex:1,
        padding: 20,
    },
    Items: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    textSecondary: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        flexDirection: 'row'
    },
    Power: {alignItems: 'flex-start', fontSize: 15, color: 'white',
        fontWeight: 'bold', marginTop : -28, marginLeft: 30},
    Exponent: {alignItems: 'flex-end', fontSize: 23, color: 'white',
        fontWeight: 'bold'},
})