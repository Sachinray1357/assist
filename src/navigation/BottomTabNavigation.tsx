import { ChatScreen, HomeScreen2, Login, Settings, StarRating } from '../screens/index'
import { height, width } from '../styles/Dimension'

import Colors from '../assets/colors/Colors';
import Icons from '../constants/Icons';
import NavigationComponentName from '../constants/NavigationComponentName';
import React from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={NavigationComponentName.CHATSCREEN}
                component={ChatScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const BottomTabNavigation = () => {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    position: 'absolute',
                    justifyContent: 'center',
                    height: 60,
                    shadowColor: "red",
                    shadowOpacity: 5,
                    shadowRadius: 5,
                    elevation: 10,
                    shadowOffset: {
                        height: 1,
                        width: 1,
                    }
                },
                tabBarInactiveTintColor: 'black',
                tabBarActiveTintColor: 'pink',
                tabBarHideOnKeyboard: true,
                tabBarItemStyle: {
                    height: 60,
                    borderRadius: 10,
                    marginLeft: 10,
                    marginRight: 10
                },
            }}>

            <Tab.Screen
                name='Home2'
                component={HomeStack}
                options={({ route }) => ({
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            focused ?
                                <View style={{ width: width*0.12, height: 45, backgroundColor: Colors.headerColor, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                    <Icons.Ionicons name='chatbox' color={focused ? 'white' : Colors.headerColor} size={size} />
                                </View>
                                :
                                <Icons.Ionicons name="chatbox" color={focused ? 'white' : Colors.primaryBlackColor} size={size} />
                        )
                    },
                })}
            />
            <Tab.Screen
                name={NavigationComponentName.HOME}
                component={HomeScreen2}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            focused ?
                                <View style={{ width: width*0.12, height: 45, backgroundColor: Colors.headerColor, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                    <Icons.Ionicons name="home" color={focused ? 'white' : Colors.headerColor} size={size} />
                                </View>
                                :
                                <Icons.Ionicons name="home" color={focused ? 'white' : Colors.primaryBlackColor} size={size} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name={NavigationComponentName.SETTING}
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            focused ?
                                <View style={{ width: width*0.12, height: 45, backgroundColor: Colors.headerColor, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                    <Icons.Ionicons name="settings" color={focused ? 'white' : Colors.headerColor} size={size} />
                                </View>
                                :
                                <Icons.Ionicons name="settings" color={focused ? 'white' : Colors.primaryBlackColor} size={size} />
                        )
                    },
                }}
            />

        </Tab.Navigator>

    );
};

export default BottomTabNavigation;