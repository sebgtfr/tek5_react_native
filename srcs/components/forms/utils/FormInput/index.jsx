import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from 'react-native-paper';
import { IntlConsumer } from '../../../../providers/IntlProvider';
import Styles from './Styles';

const FormInput = ({ label, keyboardType, returnKeyType, onChangeText, secureTextEntry }) => (
  <IntlConsumer>
    {(intl) => (
      <TextInput
        label={intl.t(`form.input.${label}`)}
        style={Styles.input}
        numberOfLines={1}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    )}
  </IntlConsumer>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
};

FormInput.defaultProps = {
  keyboardType: 'default',
  returnKeyType: 'default',
  secureTextEntry: false,
};

export default FormInput;
