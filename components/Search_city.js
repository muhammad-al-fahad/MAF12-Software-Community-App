import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, ImageBackground, Button} from 'react-native';
import * as Location from 'expo-location';
import SearchBar from './Search/Search';
import Detect from './Search/Detect'

export default function App() {
 
  const [errorMessage, setErrorMessage] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');
  const [cityName, setCityName] = useState('Delhi, IN');

const  WEATHER_API_KEY = 'd89d45a3a8ffa8c2f9dce1e80ff1533c'
const  ImgURI = {uri: 'https://i.ytimg.com/vi/Gn2EmhwA7tQ/maxresdefault.jpg'}
const  Weather_URL = 'https://api.openweathermap.org/data/2.5/weather?'

  async function load() {
    setWeatherData(null)
    try {
              const weatherUri = `${Weather_URL}q=${cityName}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
  
              const response = await fetch(weatherUri)
  
              const result = await response.json()
  
              if (response.ok) {
                  setWeatherData(result)
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

if (weatherData){
  const {coord: {lon, lat}} = weatherData
  return (
    <>
      <StatusBar style="auto" />
        <View style={styles.container}>
        <Detect lat = {lat} lon = {lon} setCityName = {setCityName} weatherData = {weatherData} reLoad = {load}/>
        </View>
        </>
  );
  }
 else if(errorMessage){
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
      <SearchBar load={load} setCityName={setCityName}/>
      <Text style = {{textAlign: 'center', color: 'black'}}>{errorMessage}</Text>
    </View>
  );
}
 else {
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
});