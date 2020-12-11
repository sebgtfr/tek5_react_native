import React from 'react';

import { View, Text } from 'react-native';

import SignUpForm from '../../components/forms/SignUpForm';

import { IntlConsumer } from '../../providers/IntlProvider';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import Styles from './Styles';

const SignUp = () => {
  const [error, setError] = React.useState(null);

  return (
    <View style={Styles.container}>
      <IntlConsumer>
        {(intl) => (
          <FirebaseConsumer>
            {(firebase) => (
              <SignUpForm
                onSubmit={(email, password) =>
                  firebase
                    .signUp(email, password)
                    .catch(() => setError(intl.t('form.error.signUp')))}
              />
            )}
          </FirebaseConsumer>
        )}
      </IntlConsumer>
      {error && <Text>{error}</Text>}
    </View>
  );
};

SignUp.propTypes = {};

export default SignUp;
