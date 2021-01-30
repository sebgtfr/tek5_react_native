import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native';
import TextIntl from '../TextIntl';

const PIntl = ({ id }) => (
  <Text>
    <TextIntl id={id} />
  </Text>
);

PIntl.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PIntl;
