import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { Provider as PaperProvider } from 'react-native-paper';

import MultiProvider from './srcs/components/MultiProvider';
import FirebaseProvider, { FirebaseConsumer } from './srcs/providers/FirebaseProvider';
import IntlProvider from './srcs/providers/IntlProvider';
import ThemeProvider, { ThemeConsumer } from './srcs/providers/ThemeProvider';

// Navigation Stacks
import NotAuthStack from './srcs/components/navigations/NotAuthStack';
import AuthStack from './srcs/components/navigations/AuthStack';

import SplashScreen from './srcs/screens/SplashScreen';

const App = () => (
  <MultiProvider providers={[FirebaseProvider, IntlProvider, ThemeProvider]}>
    <ThemeConsumer>
      {({ theme }) => (
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <FirebaseConsumer>
              {({ isLoading, isLogged }) => {
                if (isLoading) {
                  return <SplashScreen />;
                }
                return isLogged ? <AuthStack /> : <NotAuthStack />;
              }}
            </FirebaseConsumer>
          </NavigationContainer>
        </PaperProvider>
        // eslint-disable-next-line prettier/prettier
    )}
    </ThemeConsumer>
  </MultiProvider>
);

// const App = () => {
//   const scheme = useColorScheme();

//   return (
//     <AppearanceProvider>
//       <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
//         <MultiProvider providers={[FirebaseProvider, IntlProvider]}>
//           <FirebaseConsumer>
//             {({ isLoading, isLogged }) => {
//               if (isLoading) {
//                 return <SplashScreen />;
//               }
//               return isLogged ? <AuthStack /> : <NotAuthStack />;
//             }}
//           </FirebaseConsumer>
//         </MultiProvider>
//       </NavigationContainer>
//     </AppearanceProvider>
//   );
// };

App.propTypes = {};

export default App;
