import { Image, View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import moment from 'moment-timezone'

export default function WeatherInfo({unitsSystem, currentWeather, index}) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const {temp: {day}, weather: [details]} = currentWeather
    const {icon, main, description} = details
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    const [date1, setDate] = useState('');

    useEffect(()=>{
     setInterval(()=>{
      const date = new Date();
      const Days = date.getDate() + index;
      const Month = date.getMonth();
      const Next = Days > 30 && (Month == 6 || Month == 4 || Month == 9 || Month == 11)? Month + 1 
      : Days > 31 && (Month == 1 || Month == 3 || Month == 5 || Month == 7 || Month == 8 || Month == 10 || Month == 12)? Month + 1 
      : Days > 28 && Month == 2 && Year % 4 ? Month + 1 
      : Days > 29 && Month == 2 ? Month + 1 : Month;
      const Year = date.getFullYear();
      
      setDate(moment(currentWeather.dt * 1000).format('dddd') + ', ' + (Days < 10? '0' + Days : Days) + ', ' + months[Next] + ', ' + Year)
     }, 1000)
    },[])

    

     
 
  return (
    <>
    <View>
    <Text style = {styles.city}>{moment(currentWeather.dt * 1000).format('dddd')}</Text>
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
        marginTop: -100
    },
    textprimary: {
        color: 'darkred',
        fontFamily: 'Lato-light',
        fontSize: 50,
        marginLeft: 20,
        top: 130

    },
    textsecondary: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 34,
        marginLeft: 10,
        marginTop: -100
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