import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SignIn from '../../../screens/SignIn';
import SignUp from '../../../screens/SignUp';

const Stack = createStackNavigator();

const NotAuthStack = () => (
  <Stack.Navigator initialRouteName="SignIn" screenOptions={{ title: 'EMercure' }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

NotAuthStack.propTypes = {};

export default NotAuthStack;
