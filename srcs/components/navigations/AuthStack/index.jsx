import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';
import MyItems from '../../../screens/MyItems';

import { TabBarIconHome, TabBarIconMyItems, TabBarIconProfile } from './TabBarIcon';

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
      name="MyItems"
      component={MyItems}
      options={{
        tabBarLabel: 'MyItems',
        tabBarIcon: TabBarIconMyItems,
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
