import React from 'react';
import { View } from 'react-native';

import SignUpForm from '../../components/forms/SignUpForm';

import Styles from './Styles';

const SignUp = () => (
  <View style={Styles.container}>
    <SignUpForm />
  </View>
);

SignUp.propTypes = {};

export default SignUp;
