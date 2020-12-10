import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { LightTheme, DarkTheme } from './srcs/configs/Themes';

// Navigation Stacks
import NotAuthRoutes from './srcs/components/navigations/NotAuthStack';

const App = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <NotAuthRoutes />
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default App;