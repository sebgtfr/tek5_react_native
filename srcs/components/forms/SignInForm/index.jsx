import React from 'react';
import PropTypes from 'prop-types';

import { KeyboardAvoidingView, Text, TextInput, Button } from 'react-native';

import { validate } from 'validate.js';
import { IntlConsumer } from '../../../providers/IntlProvider';

const SignInForm = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

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
              placeholder={intl.t('form.input.email')}
            />
            {errors.email && <Text>{errors.email[0]}</Text>}
            <TextInput
              returnKeyType="go"
              onChangeText={setPassword}
              placeholder={intl.t('form.input.password')}
              secureTextEntry
            />
            {errors.password && <Text>{errors.password[0]}</Text>}
            <Button
              onPress={() => {
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
                const validatedErrors = validate({ email, password }, constraints);

                setErrors(validatedErrors || {});
                if (validatedErrors === undefined) {
                  onSubmit(email, password);
                }
              }}
              title={intl.t('form.submit.signIn')}
            />
          </>
        )}
      </IntlConsumer>
    </KeyboardAvoidingView>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
