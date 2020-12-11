import React from 'react';
import { Button, View } from 'react-native';

import { IntlConsumer } from '../../providers/IntlProvider';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import Styles from './Styles';

const Home = () => (
  <View style={Styles.container}>
    <FirebaseConsumer>
      {(firebase) => (
        <IntlConsumer>
          {(intl) => <Button onPress={() => firebase.signOut()} title={intl.t('signOut')} />}
        </IntlConsumer>
      )}
    </FirebaseConsumer>
  </View>
);

Home.propTypes = {};

export default Home;
