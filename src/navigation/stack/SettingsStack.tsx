import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/home/HomeScreen';
import DetailsScreen from '../../screens/home/DetailsScreen';
import TabNavigation from '../tab/TabNavigation';
import ViewMoreScreen from '../../screens/home/ViewMoreScreen';
import SearchScreen from '../../screens/home/SearchScreen';
import BrandScreen from '../../screens/home/BrandScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';



const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,


    }}>
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
     


    </Stack.Navigator>
  )
}

export default SettingsStack

const styles = StyleSheet.create({})