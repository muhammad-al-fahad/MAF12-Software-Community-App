import { Image, View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import moment from 'moment-timezone'

export default function WeatherInfo({unitsSystem, currentWeather, weatherData, timezone, timezone_offset, dtt}) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const {temp, dt, weather: [details]} = currentWeather
    const {icon, main, description} = details
    const {name} = weatherData
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    const [date1, setDate] = useState('');
    const [time, setTime] = useState('')

    useEffect(()=>{
     setInterval(()=>{
       const iMonth = moment(dt * 1000).tz(timezone).format('MM')
       const pMonth = parseInt(moment(dt * 1000).tz(timezone).format('MM'), 10)
       const Month = pMonth - 1;

       const iHour = parseInt(moment(dtt * 1000).tz(timezone).format('hh'), 10)

       const iTime = parseInt(moment(dtt * 1000).tz(timezone).format('mm'), 10)

       const pTime = iTime > 59? iHour + 1 : iHour

      setTime(pTime + ' : ' + moment(dtt * 1000).tz(timezone).format('mm') + '  ' + moment(dt * 1000).tz(timezone).format('a'));

      setDate(moment(dt * 1000).tz(timezone).format('dddd') + ', ' + moment(dt * 1000).tz(timezone).format('DD')+ ', ' + months[Month] + ', ' + moment(dt * 1000).tz(timezone).format('yyyy'))
      
     }, 1000)
    },[])

     
 
  return (
    <>
    <View>
    <View style={{flexDirection: 'row', marginTop: 30}}>
    <Text style = {styles.city}>{moment(dt * 1000).tz(timezone).format('dddd')}</Text>
    <Text style = {styles.cityone}>{name}</Text>
    </View>
    <Text style = {styles.time}>  Date:  {date1} </Text>
    <Text style = {styles.time}>  Time:  {time} </Text>

      {unitsSystem == 'metric'? (<Text style = {styles.textprimary}>{temp}° C</Text>) : unitsSystem == 'imperial'? (<Text style = {styles.textprimary}>{temp}° F</Text>) : (<Text style = {styles.textprimary}>{temp}° K</Text>)}
      </View>
      <View style={{flexDirection:'row'}}>
      <Image style = {styles.icon} source = {{uri: iconUrl}}/>     
      <Text style = {styles.textsecondary}>{main}</Text>
      <Text style = {styles.description}>{description}</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100,
        lineHeight: 34,
        marginLeft: 3,
        top: -100
    },
    description: {
        textTransform: 'capitalize',
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 34,
        marginLeft: 35,
        top: -70
    },
    textprimary: {
        color: 'darkred',
        fontFamily: 'Lato-light',
        fontSize: 50,
        marginLeft: 20,
        top: -20

    },
    textsecondary: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 34,
        marginLeft: 10,
        top: -70
    },
    city: {
       color: '#fff',
       fontSize: 30,
       fontFamily: 'Lato-Regular',
       fontWeight: 'bold',
       top: -80,
       marginLeft: 10
    },
    time: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        top: -70,
        marginLeft: 10
    },
    cityone: {
      color: '#fff',
       fontSize: 30,
       fontFamily: 'Lato-Regular',
       fontWeight: 'bold',
       top: -80,
       marginLeft: 50
    }
})