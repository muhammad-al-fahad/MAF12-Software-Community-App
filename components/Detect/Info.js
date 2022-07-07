import { Image, View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import moment from 'moment-timezone'

export default function WeatherInfo({unitsSystem, currentWeather}) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const {temp, dt, weather: [details]} = currentWeather
    const {icon, main, description} = details
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    const [date1, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(()=>{
     setInterval(()=>{
      const date = new Date();
      const Day = date.getDay();
      const Days = date.getDate();
      const Month = date.getMonth();
      const Year = date.getFullYear();
      const Hour = date.getHours();
      const Minute = date.getMinutes();
      const Second = date.getSeconds();
      const timeFormat = Hour > 12 ? Hour % 12: Hour;
      const timeChange = Hour > 12 ? 'PM' : 'AM';
      setTime((timeFormat < 10 ? '0'+ timeFormat:timeFormat) + ':' + (Minute < 10 ? '0'+ Minute:Minute) + ':' + (Second < 10 ? '0'+ Second:Second) + ' ' + timeChange);
      setDate(moment(dt * 1000).format('dddd') + ', ' + (Days < 10? '0' + Days : Days) + ', ' + months[Month] + ', ' + Year)
     }, 1000)
    },[])

     
 
  return (
    <>
    <View>
    <Text style = {styles.city}>{moment(dt * 1000).format('dddd')}</Text>
    <Text style = {styles.time}>  Date:  {date1} </Text>
    <Text style = {styles.time}>  Time: {time}</Text>
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
        top: -130
    },
    description: {
        textTransform: 'capitalize',
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 34,
        marginLeft: 35,
        top: -100
    },
    textprimary: {
        color: 'darkred',
        fontFamily: 'Lato-light',
        fontSize: 50,
        marginLeft: 20,
        top: 110

    },
    textsecondary: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 34,
        marginLeft: 10,
        top: -100
    },
    city: {
       color: '#fff',
       fontSize: 30,
       fontFamily: 'Lato-Regular',
       fontWeight: 'bold',
       top: 80,
       marginLeft: 10
    },
    time: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        top: 90,
        marginLeft: 10
    }
})