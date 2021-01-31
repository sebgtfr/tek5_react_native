import React from 'react';
import { View } from 'react-native';

import { TextEdit } from '../../components/utils';
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
          <TextEdit value={firebase.user.displayName} />
          <TextEdit value={firebase.user.email} />
          <ButtonIntl uppercase title="button.signOut" onSubmit={() => firebase.signOut()} />
        </>
      )}
    </FirebaseConsumer>
  </View>
);

Profile.propTypes = {};

export default Profile;
