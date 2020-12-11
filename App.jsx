import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { LightTheme, DarkTheme } from './srcs/configs/Themes';

import FirebaseProvider, { FirebaseConsumer } from './srcs/providers/FirebaseProvider';

// Navigation Stacks
import NotAuthStack from './srcs/components/navigations/NotAuthStack';
import AuthStack from './srcs/components/navigations/AuthStack';

const App = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <FirebaseProvider>
          <FirebaseConsumer>
            {({ isLogged }) => (isLogged ? <AuthStack /> : <NotAuthStack />)}
          </FirebaseConsumer>
        </FirebaseProvider>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

App.propTypes = {};

export default App;
