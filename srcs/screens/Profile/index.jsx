import React from 'react';
import { View } from 'react-native';

import { Text } from 'react-native-paper';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import { ButtonIntl } from '../../components/intl';
import { FormAvatar } from '../../components/forms/utils';

import Styles from './Styles';

const Profile = () => (
  <View style={Styles.container}>
    <FirebaseConsumer>
      {(firebase) => (
        <>
          <FormAvatar
            src={firebase.user.photoURL}
            size={128}
            type="uri"
            onChange={(photoURL) => firebase.edit({ photoURL })}
          />
          {firebase.user.displayName && <Text>{firebase.user.displayName}</Text>}
          <Text>{firebase.user.email}</Text>
          <ButtonIntl uppercase title="button.signOut" onSubmit={() => firebase.signOut()} />
        </>
      )}
    </FirebaseConsumer>
  </View>
);

Profile.propTypes = {};

export default Profile;
