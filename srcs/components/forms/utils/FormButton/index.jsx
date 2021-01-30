import React from 'react';
import PropTypes from 'prop-types';

import { ButtonIntl } from '../../../intl';

const FormButton = ({ title, onSubmit, constraints, onError, mode, labelStyle, uppercase }) => (
  <ButtonIntl
    title={`form.submit.${title}`}
    onSubmit={onSubmit}
    constraints={constraints}
    onError={onError}
    mode={mode}
    labelStyle={labelStyle}
    uppercase={uppercase}
  />
);

FormButton.propTypes = {
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

FormButton.defaultProps = {
  constraints: null,
  onError: null,
  mode: 'contained',
  labelStyle: null,
  uppercase: true,
};

export default FormButton;
