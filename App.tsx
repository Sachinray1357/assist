import React, { Suspense, useEffect } from 'react';

import AuthStackNavigation from './src/navigation/AuthStack';
import Loader from './src/components/Loader';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { View } from 'react-native';

const RootStack = React.lazy(() => import('./src/navigation/AuthStack'));

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Suspense fallback={<Loader />}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Suspense>
  )
}

export default App