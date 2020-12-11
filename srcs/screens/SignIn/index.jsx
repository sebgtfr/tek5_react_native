import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, TouchableOpacity } from 'react-native';

import IntlText from '../../components/intl/TextIntl';

import SignInForm from '../../components/forms/SignInForm';

import Styles from './Styles';

const SignIn = ({ navigation }) => (
  <View style={Styles.container}>
    <SignInForm />
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text>
        <IntlText id="signUp" />
      </Text>
    </TouchableOpacity>
  </View>
);

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
