import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';
import Map from '../../../screens/Map';

import { TabBarIconHome, TabBarIconMap, TabBarIconProfile } from './TabBarIcon';

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
        tabBarIcon: TabBarIconHome,
      }}
    />
    <Tab.Screen
      name="Map"
      component={Map}
      options={{
        tabBarLabel: 'Map',
        tabBarIcon: TabBarIconMap,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: TabBarIconProfile,
      }}
    />
  </Tab.Navigator>
);

AuthStack.propTypes = {};

export default AuthStack;
