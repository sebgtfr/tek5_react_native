import React from 'react';

import { View } from 'react-native';

import { TextEdit } from '../../components/utils';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';
import { IntlConsumer } from '../../providers/IntlProvider';

import { ButtonIntl, SelectLocale } from '../../components/intl';
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
          <TextEdit
            label="name"
            value={firebase.user.displayName}
            onSubmit={() => undefined}
            missingLabel="name"
          />
          <IntlConsumer>
            {(intl) => (
              <TextEdit
                label="email"
                value={firebase.user.email}
                constraints={{
                  email: {
                    message: intl.t('form.error.invalid.email'),
                  },
                }}
                onSubmit={(email) => firebase.edit({ email })}
                missingLabel="email"
              />
            )}
          </IntlConsumer>
          <SelectLocale />
          <ButtonIntl uppercase title="button.signOut" onSubmit={() => firebase.signOut()} />
        </>
      )}
    </FirebaseConsumer>
  </View>
);

Profile.propTypes = {};

export default Profile;
