import React from 'react';
import { Button, View } from 'react-native';

import Intl from '../../configs/Intl';

import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import Styles from './Styles';

const Home = () => (
  <View style={Styles.container}>
    <FirebaseConsumer>
      {(firebase) => <Button onPress={() => firebase.signOut()} title={Intl.t('signOut')} />}
    </FirebaseConsumer>
  </View>
);

Home.propTypes = {};

export default Home;
