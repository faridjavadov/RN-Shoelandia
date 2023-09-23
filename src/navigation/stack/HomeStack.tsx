import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/home/HomeScreen';
import DetailsScreen from '../../screens/home/DetailsScreen';
import TabNavigation from '../tab/TabNavigation';
import ViewMoreScreen from '../../screens/home/ViewMoreScreen';
import SearchScreen from '../../screens/home/SearchScreen';
import BrandScreen from '../../screens/home/BrandScreen';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,

    }}>
      <Stack.Screen name='TabNavigation' component={TabNavigation} />
      <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
      <Stack.Screen name='ViewMoreScreen' component={ViewMoreScreen} />
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='BrandScreen' component={BrandScreen} />

    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})