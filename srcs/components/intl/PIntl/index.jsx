import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native-paper';
import TextIntl from '../TextIntl';

const PIntl = ({ id, style }) => (
  <Text style={style}>
    <TextIntl id={id} />
  </Text>
);

PIntl.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.shape({})
};

PIntl.defaultProps = {
  style: {},
};

export default PIntl;
