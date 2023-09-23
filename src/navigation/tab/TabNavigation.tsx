import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavoriteScreen from '../../screens/favorite/FavoriteScreen';
import HomeIcon from '../../components/icons/navigationIcons/HomeIcon'
import FavoriteIcon from '../../components/icons/navigationIcons/FavoriteIcon'
import CartIcon from '../../components/icons/navigationIcons/CartIcon'
import SettingsIcon from '../../components/icons/navigationIcons/SettingsIcon'
import SettingsScreen from '../../screens/settings/SettingsScreen';
import CartScreen from '../../screens/cart/CartScreen';
import HomeStack from '../stack/HomeStack';
import HomeScreen from '../../screens/home/HomeScreen';
import SettingsStack from '../stack/SettingsStack';




const Tab = createBottomTabNavigator();


const TabNavigation = () => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: '8%',
                backgroundColor: '#212121',
                borderRadius: 50,
                marginHorizontal: '5%',
                marginBottom: '5%',
                position: 'absolute'
            },

        }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen}
                options={({ route }: any) => ({
                    tabBarIcon: ({ focused }) => {
                        return <HomeIcon color={focused ? '#FC8800' : '#FFFFFF'} />;
                    },
                })}
            />

            <Tab.Screen name='FavoriteScreen' component={FavoriteScreen}

                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <FavoriteIcon color={focused ? '#FC8800' : '#FFFFFF'} />
                        )
                    }
                }} />

            <Tab.Screen name='CartScreen' component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <CartIcon color={focused ? '#FC8800' : '#FFFFFF'} />
                        )
                    }
                }} />
            <Tab.Screen
                name='SettingsStack'
                component={SettingsStack}
                options={({ route }: any) => ({
                    tabBarIcon: ({ focused }) => {

                        return <SettingsIcon color={focused ? '#FC8800' : '#FFFFFF'} />;
                    },

                })}
            />


        </Tab.Navigator>
    )

}

export default TabNavigation

const styles = StyleSheet.create({})