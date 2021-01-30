import React from 'react';
import PropTypes from 'prop-types';

import { KeyboardAvoidingView, Text } from 'react-native';

import { FormInput, FormButton } from '../utils';

import { IntlContext } from '../../../providers/IntlProvider';
import Styles from './Styles';

const SignInForm = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const intl = React.useContext(IntlContext);

  const constraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: intl.t('form.error.missing.email'),
      },
      email: {
        message: intl.t('form.error.invalid.email'),
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: intl.t('form.error.missing.password'),
      },
    },
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <FormInput
        label="email"
        value={email}
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={setEmail}
      />
      {errors.email && <Text>{errors.email[0]}</Text>}
      <FormInput
        label="password"
        value={password}
        returnKeyType="go"
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text>{errors.password[0]}</Text>}
      <FormButton
        title="signIn"
        onSubmit={() => onSubmit(email, password)}
        constraints={{ fields: { email, password }, rules: constraints }}
        onError={setErrors}
        labelStyle={Styles.signInButtonLabel}
      />
    </KeyboardAvoidingView>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
