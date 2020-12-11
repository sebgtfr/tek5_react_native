import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, TouchableOpacity } from 'react-native';

import IntlText from '../../components/intl/TextIntl';

import SignInForm from '../../components/forms/SignInForm';

import { IntlConsumer } from '../../providers/IntlProvider';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import Styles from './Styles';

const SignIn = ({ navigation }) => {
  const [error, setError] = React.useState(null);

  return (
    <View style={Styles.container}>
      <IntlConsumer>
        {(intl) => (
          <FirebaseConsumer>
            {(firebase) => (
              <SignInForm
                onSubmit={(email, password) =>
                  firebase
                    .signIn(email, password)
                    .catch(() => setError(intl.t('form.error.signIn')))}
              />
            )}
          </FirebaseConsumer>
        )}
      </IntlConsumer>
      {error && <Text>{error}</Text>}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>
          <IntlText id="link.signUp" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
