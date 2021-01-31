import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';
import MyItems from '../../../screens/MyItems';

import { TabBarIconHome, TabBarIconMyItems, TabBarIconProfile } from './TabBarIcon';

import { IntlConsumer } from '../../../providers/IntlProvider';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  inactiveTintColor: '#000000',
  activeTintColor: '#0000FF',
  activeBackgroundColor: '#FFFFFF',
  inactiveBackgroundColor: '#FFFFFF',
};

const AuthStack = () => (
  <IntlConsumer>
    {({ t }) => (
      <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: t('navigation.home'),
            tabBarIcon: TabBarIconHome,
          }}
        />
        <Tab.Screen
          name="MyItems"
          component={MyItems}
          options={{
            tabBarLabel: t('navigation.myItems'),
            tabBarIcon: TabBarIconMyItems,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: t('navigation.profile'),
            tabBarIcon: TabBarIconProfile,
          }}
        />
      </Tab.Navigator>
    )}
  </IntlConsumer>
);

AuthStack.propTypes = {};

export default AuthStack;
