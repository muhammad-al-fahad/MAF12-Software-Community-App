import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './Detect/Info';
import Units from './Detect/Units';
import Reload from './Detect/Reload'; 
import Details from './Detect/details';
import Forecast_Info from './Detect/Forecast_Info';
import Forecast_details from './Detect/Forecast_details'

export default function App() {
 
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

const  WEATHER_API_KEY = 'd89d45a3a8ffa8c2f9dce1e80ff1533c'
const  ImgURI = {uri: 'https://i.ytimg.com/vi/Gn2EmhwA7tQ/maxresdefault.jpg'}
const  Weather_URI = 'https://api.openweathermap.org/data/2.5/onecall?'

  async function load() {
    setCurrentWeather(null)
    try {
              let { status } = await Location.requestForegroundPermissionsAsync()
  
              if (status !== 'granted') {
                  setErrorMessage('Access to location is needed to run the app')
                  return
              }
              const location = await Location.getCurrentPositionAsync()
  
              const { latitude, longitude } = location.coords
  
              const weatherUrl = `${Weather_URI}lat=${latitude}&lon=${longitude}&exclude=current,alerts,minutely&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
  
              const response = await fetch(weatherUrl)
  
              const result = await response.json()
  
              if (response.ok) {
                  setCurrentWeather(result)
              } else {
                setErrorMessage(result.message)
              }
          } catch (error) {
              setErrorMessage(error.message)
          }
    }
  
      useEffect(()=>{
      load();
    },[unitsSystem])

if (currentWeather){
  return (
    <>
      <StatusBar style="auto" />
      <ScrollView horizontal={true} pagingEnabled showsHorizontalScrollIndicator = {false}>
      {currentWeather.hourly.map((currentWeather, index) =>( index == 0 && (
        <View key={index} style={styles.container}>
        <ImageBackground style = {{...styles.Background, opacity: 1}} source={ImgURI} resizeMode = 'cover'>
      <View style = {styles.main}>
        <Units unitsSystem = {unitsSystem} setUnitsSystem = {setUnitsSystem}/>
        <Reload load={load}/>
        <WeatherInfo currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
      <View style = {{borderBottomColor: 'rgba(255,0,0,0.5)', top: -100, borderBottomWidth: 2}}/>
      <Details currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </ImageBackground>
      </View>)
      ))
    }
      {currentWeather.daily.map((currentWeather, index) =>( index != 0 && (
      <View key={index} style={styles.container}>
        <ImageBackground style = {{...styles.Background, opacity: 1}} source={ImgURI} resizeMode = 'cover'>
      <View style = {styles.main}>
        <Units unitsSystem = {unitsSystem} setUnitsSystem = {setUnitsSystem}/>
        <Reload load={load}/>
        <Forecast_Info currentWeather={currentWeather} unitsSystem={unitsSystem} index={index}/>
      </View>
      <View style = {{borderBottomColor: 'rgba(255,0,0,0.5)', top: -100, borderBottomWidth: 2}}/>
      <Forecast_details currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </ImageBackground>
      </View> )
      ))
      }
      </ScrollView>
      </>
  );
  }
 else if(errorMessage){
  return (
    <View style={styles.container}>
      <Reload load={load}/>
      <Text style = {{textAlign: 'center', color: 'black'}}>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
  );
}else {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' style = {{color: '#ff304f'}}/>
      <StatusBar style="auto" />
    </View>
  );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 800,
    width: 360,
  },
  main: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  Background: {
    flex: 1,
    height: 800,
    width: 360,
  },

button: {
  backgroundColor: 'darkgreen',
  width: 150,
  padding: 10,
  height: 50,
  borderRadius: 50,
  borderWidth: 2,
  borderColor: 'rgba(255,0,0,0.2)',
  marginTop: 10,
  marginLeft: 150
},
text:{
  color: 'white',
  fontSize: 18
}
});