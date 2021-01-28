import React from 'react';
import { View, Text } from 'react-native';

import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import { TextIntl, ButtonIntl } from '../../components/intl';

import Styles from './Styles';

const Profile = () => (
  <View style={Styles.container}>
    <FirebaseConsumer>
      {(firebase) => (
        <>
          {firebase.user.displayName && <Text>{firebase.user.displayName}</Text>}
          <Text>{firebase.user.email}</Text>
          <ButtonIntl id="signOut" onPress={() => firebase.signOut()} />
        </>
      )}
    </FirebaseConsumer>
  </View>
);

Profile.propTypes = {};

export default Profile;
