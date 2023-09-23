import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoardingScreen from '../../screens/onboarding/OnBoardingScreen';
import RegisterScreen from '../../screens/authentication/RegisterScreen';
import LoginScreen from '../../screens/authentication/LoginScreen';
import ConfirmCodeScreen from '../../screens/authentication/ConfirmCodeScreen';

const Stack = createNativeStackNavigator();

const OnBoardStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      animation: 'slide_from_right',
      headerShown: false,

    }}
      initialRouteName='onBoardScreen'>

      <Stack.Screen name='onBoardScreen' component={OnBoardingScreen} />

      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />

      <Stack.Screen name='LoginScreen' component={LoginScreen} />

      <Stack.Screen name='ConfirmCodeScreen' component={ConfirmCodeScreen} />

    </Stack.Navigator>

  )
}

export default OnBoardStack

const styles = StyleSheet.create({})