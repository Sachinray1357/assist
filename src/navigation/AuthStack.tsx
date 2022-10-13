import { ChatScreen, DuringCall, DuringCall2, HomeScreen2, Login, StarRating, WebrtcHome } from '../screens/index';

import BottomTabNavigation from './BottomTabNavigation';
import NavigationComponentName from '../constants/NavigationComponentName';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AuthStackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationComponentName.LOGIN}
        component={Login}
      />
      <Stack.Screen
        name={NavigationComponentName.WEBHOME}
        component={WebrtcHome}
      />
      <Stack.Screen
        name={NavigationComponentName.CHATSCREEN}
        component={ChatScreen}
      />
      <Stack.Screen
        name={NavigationComponentName.DURINGCALL2}
        component={DuringCall2}
      />
      <Stack.Screen
        name={NavigationComponentName.DURINGCALL}
        component={DuringCall}
      />
      <Stack.Screen
        name={NavigationComponentName.RATING}
        component={StarRating}
      />
      <Stack.Screen
        name='BottomTabNavigation'
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
}
