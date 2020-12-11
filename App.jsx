import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { LightTheme, DarkTheme } from './srcs/configs/Themes';

import MultiProvider from './srcs/components/MultiProvider';
import FirebaseProvider, { FirebaseConsumer } from './srcs/providers/FirebaseProvider';
import IntlProvider from './srcs/providers/IntlProvider';

// Navigation Stacks
import NotAuthStack from './srcs/components/navigations/NotAuthStack';
import AuthStack from './srcs/components/navigations/AuthStack';

import SplashScreen from './srcs/screens/SplashScreen';

const App = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <MultiProvider providers={[FirebaseProvider, IntlProvider]}>
          <FirebaseConsumer>
            {({ isLoading, isLogged }) => {
              if (isLoading) {
                return <SplashScreen />;
              }
              return isLogged ? <AuthStack /> : <NotAuthStack />;
            }}
          </FirebaseConsumer>
        </MultiProvider>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

App.propTypes = {};

export default App;
