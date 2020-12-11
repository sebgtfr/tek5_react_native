import React from 'react';

import { KeyboardAvoidingView, TextInput, Button } from 'react-native';

import Intl from '../../../configs/Intl';

import { FirebaseConsumer } from '../../../providers/FirebaseProvider';

const SignUpForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <KeyboardAvoidingView behavior="padding">
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={setEmail}
        placeholder={Intl.t('email')}
      />

      <TextInput
        returnKeyType="go"
        onChangeText={setPassword}
        placeholder={Intl.t('password')}
        secureTextEntry
      />

      <FirebaseConsumer>
        {(firebase) => (
          <Button onPress={() => firebase.signUp(email, password)} title={Intl.t('signUp')} />
        )}
      </FirebaseConsumer>
    </KeyboardAvoidingView>
  );
};

SignUpForm.propTypes = {};

export default SignUpForm;
