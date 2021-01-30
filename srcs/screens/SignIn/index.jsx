import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native-paper';
import { View } from 'react-native';

import { ButtonIntl } from '../../components/intl';

import SignInForm from '../../components/forms/SignInForm';

import { IntlConsumer } from '../../providers/IntlProvider';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import Styles from './Styles';

const SignIn = ({ navigation }) => {
  const [error, setError] = React.useState(null);

  const signIn = React.useCallback(
    (intl, firebase, email, password) =>
      firebase.signIn(email, password).catch(() => setError(intl.t('form.error.signIn'))),
    []
  );

  return (
    <View style={Styles.container}>
      <IntlConsumer>
        {(intl) => (
          <FirebaseConsumer>
            {(firebase) => (
              <SignInForm onSubmit={(email, password) => signIn(intl, firebase, email, password)} />
            )}
          </FirebaseConsumer>
        )}
      </IntlConsumer>
      {error && <Text>{error}</Text>}
      <ButtonIntl
        title="link.signUp"
        mode="text"
        onSubmit={() => navigation.navigate('SignUp')}
        labelStyle={Styles.navButtonText}
      />
    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
