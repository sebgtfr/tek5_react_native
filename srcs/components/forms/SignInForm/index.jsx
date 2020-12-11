import React from 'react';

import { KeyboardAvoidingView, TextInput, Button } from 'react-native';

import { IntlConsumer } from '../../../providers/IntlProvider';
import { FirebaseConsumer } from '../../../providers/FirebaseProvider';

const SignInForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <KeyboardAvoidingView behavior="padding">
      <IntlConsumer>
        {(intl) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={setEmail}
              placeholder={intl.t('email')}
            />

            <TextInput
              returnKeyType="go"
              onChangeText={setPassword}
              placeholder={intl.t('password')}
              secureTextEntry
            />

            <FirebaseConsumer>
              {(firebase) => (
                <Button onPress={() => firebase.signIn(email, password)} title={intl.t('signIn')} />
              )}
            </FirebaseConsumer>
          </>
        )}
      </IntlConsumer>
    </KeyboardAvoidingView>
  );
};

SignInForm.propTypes = {};

export default SignInForm;
