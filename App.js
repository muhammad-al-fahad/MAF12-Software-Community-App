import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';
import Detect from './components/Detect_Location';
import Home from './components/Home'
import Search from './components/Search_city'

const Stack = createStackNavigator();

export default function App(){
  return( 
  <NavigationContainer>
  <Stack.Navigator
    initialRouteName="DashBoard"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle :{
            fontWeight: 'bold',
            color:'black'
          },
        }}>
        <Stack.Screen 
        name="DashBoard" 
        component={Home} 
        options={{ title: 'DashBoard' }}
      />
      <Stack.Screen 
        name="Detect Your Location" 
        component={Detect} 
        options={{ title: 'Detect Your Location' }}
      />
     <Stack.Screen 
        name="Search Through City" 
        component={Search} 
        options={{ title: 'Search Through City'}}
      /> 
       
    </Stack.Navigator>
  </NavigationContainer>)
}