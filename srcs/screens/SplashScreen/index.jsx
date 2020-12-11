import React from 'react';
import { View, Text } from 'react-native';

// import Intl from '../../configs/Intl';

import Styles from './Styles';

const SplashScreen = () => (
  <View style={Styles.container}>
    <Text>Loading...</Text>
  </View>
);

SplashScreen.propTypes = {};

export default SplashScreen;
