import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-native';

import { IntlConsumer } from '../../../providers/IntlProvider';

const ButtonIntl = ({ id, onPress }) => (
  <IntlConsumer>
    {(intl) => <Button onPress={onPress} title={intl.t(`button.${id}`)} />}
  </IntlConsumer>
);

ButtonIntl.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

ButtonIntl.defaultProps = {
  onPress: undefined,
};

export default ButtonIntl;
