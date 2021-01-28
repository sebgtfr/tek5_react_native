import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  inactiveTintColor: '#000000',
  activeTintColor: '#0000FF',
  activeBackgroundColor: '#FFFFFF',
  inactiveBackgroundColor: '#FFFFFF',
};

const AuthStack = () => (
  <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

AuthStack.propTypes = {};

export default AuthStack;
