import { Image, View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import moment from 'moment-timezone'

export default function WeatherInfo({unitsSystem, currentWeather, index, timezone, timezone_offset}) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const {temp: {day}, weather: [details], dt} = currentWeather
    const {icon, main, description} = details
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    const [date1, setDate] = useState('');

    useEffect(()=>{
     setInterval(()=>{
      const date = new Date();
      const Day = moment(dt * 1000).tz(timezone).format('DD')
      const Days = Day;
      const Month = parseInt(moment(dt * 1000).tz(timezone).format('MM'), 10);
      const iMonth = Month - 1;
      const Year = moment(dt * 1000).tz(timezone).format('yyyy');
      
      setDate(moment(currentWeather.dt * 1000).format('dddd') + ', ' + Days + ', ' + months[iMonth] + ', ' + Year)
     }, 1000)
    },[])

    

     
 
  return (
    <>
    <View>
    <Text style = {styles.city}>{moment(dt * 1000).tz(timezone).format('dddd')}</Text>
    <Text style = {styles.time}>  Date:  {date1} </Text>
      {unitsSystem == 'metric'? (<Text style = {styles.textprimary}>{day}° C</Text>) : unitsSystem == 'imperial'? (<Text style = {styles.textprimary}>{day}° F</Text>) : (<Text style = {styles.textprimary}>{day}° K</Text>)}
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
        top: -90
    },
    description: {
        textTransform: 'capitalize',
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 34,
        marginLeft: 35,
        marginTop: -60
    },
    textprimary: {
        color: 'darkred',
        fontFamily: 'Lato-light',
        fontSize: 50,
        marginLeft: 20,
        top: 170

    },
    textsecondary: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 34,
        marginLeft: 10,
        marginTop: -60
    },
    city: {
       color: '#fff',
       fontSize: 30,
       fontFamily: 'Lato-Regular',
       fontWeight: 'bold',
       top: 80,
       marginLeft: 10,
    },
    time: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        top: 90,
        marginLeft: 10,
    }
})