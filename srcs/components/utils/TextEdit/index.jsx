import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Text } from 'react-native-paper';

const TextEdit = ({ value }) =>
  value && (
    <View>
      <Text>{value}</Text>
    </View>
  );

TextEdit.propTypes = {
  value: PropTypes.string,
};

TextEdit.defaultProps = {
  value: null,
};

export default TextEdit;
