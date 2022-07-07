import { View, Text, StyleSheet,  TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Search from './Search_city'
import Detect from './Detect_Location'

export default function Reload({navigation}) {

  const  ImgURI = {uri: 'https://i.ytimg.com/vi/Gn2EmhwA7tQ/maxresdefault.jpg'}
  
  return (
    <View style = {styles.container}>
    <ImageBackground  style = {{...styles.Background, opacity: 1}} source={ImgURI} resizeMode = 'cover'>
    <Text style = {{color: '#fff', fontSize: 20,
fontFamily: 'Lato-Regular',
       fontWeight: 'bold', marginTop: 200, marginLeft: 50}}>Would You Like MAF Weather </Text>
    <TouchableOpacity
    style = {styles.button}
      onPress={() =>
        navigation.navigate('Search Through City', { Search })
      }
    >
    <Text style = {{fontSize: 13}}> Search Default Location </Text>
</TouchableOpacity>
    <TouchableOpacity
    style = {styles.button}
      onPress={() =>
        navigation.navigate('Detect Your Location', { Detect })
      }
    >
    <Text style = {{fontSize: 20}}> Detect Location</Text>
    </TouchableOpacity>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    height: 800,
    width: 360,
    },

    Background: {
    flex: 1,
    height: 800,
    width: 360,
    },

    button: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 20,
    width: 200,
    margin: 20,
    borderRadius: 10,
    marginLeft: 80,
    marginTop: 50,
  },
})