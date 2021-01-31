import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-native-paper';

import { validate } from 'validate.js';
import TextIntl from '../TextIntl';

import Styles from './Styles';

const ButtonIntl = ({ title, onSubmit, constraints, onError, mode, labelStyle, uppercase }) => (
  <Button
    style={Styles.button}
    mode={mode}
    labelStyle={labelStyle}
    uppercase={uppercase}
    onPress={() => {
      const validatedErrors =
        constraints !== null
          ? validate(constraints.fields, constraints.rules, { fullMessages: false })
          : undefined;

      if (onError !== null) {
        onError(validatedErrors || {});
      }
      if (validatedErrors === undefined) {
        onSubmit();
      }
    }}
  >
    <TextIntl id={title} />
  </Button>
);

ButtonIntl.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  constraints: PropTypes.shape({
    rules: PropTypes.shape({}).isRequired,
    fields: PropTypes.shape({}).isRequired,
  }),
  onError: PropTypes.func,
  mode: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  uppercase: PropTypes.bool,
};

ButtonIntl.defaultProps = {
  constraints: null,
  onError: null,
  mode: 'contained',
  labelStyle: null,
  uppercase: false,
};

export default ButtonIntl;
