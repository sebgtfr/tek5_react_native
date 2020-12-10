import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Home from '../../../screens/Home';

//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = () =>
(
    <Stack.Navigator initialRouteName="Home" screenOptions={{ title: 'EMercure' }}>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
);

export default AuthStack;