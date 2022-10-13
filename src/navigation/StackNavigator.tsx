import { HomeScreen2, Login, StarRating } from '../screens/index';

import BottomTabNavigation from './BottomTabNavigation';
import NavigationComponentName from '../constants/NavigationComponentName';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen
        name={NavigationComponentName.HOME}
        component={HomeScreen2}
      /> */}
      {/* <Stack.Screen
        name={NavigationComponentName.LOGIN}
        component={Login}
      />
      <Stack.Screen
        name={NavigationComponentName.RATING}
        component={StarRating}
      /> */}
      <Stack.Screen
        name='BottomTabNavigation'
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
}
