import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Switch as PaperSwitch } from 'react-native-paper';

import { PIntl } from '../../intl';

import Styles from './Styles';

const Switch = ({
  value,
  onValueChange,
  leftText,
  rightText,
  textStyle,
  leftTextStyle,
  rightTextStyle,
}) => (
  <View style={Styles.container}>
    <PIntl id={leftText} style={{ ...Styles.text, ...textStyle, ...leftTextStyle }} />
    <PaperSwitch value={value} onValueChange={onValueChange} />
    {rightText && (
      <PIntl id={rightText} style={{ ...Styles.text, ...textStyle, ...rightTextStyle }} />
    )}
  </View>
);

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string,
  textStyle: PropTypes.shape({}),
  leftTextStyle: PropTypes.shape({}),
  rightTextStyle: PropTypes.shape({}),
};

Switch.defaultProps = {
  rightText: undefined,
  textStyle: {},
  leftTextStyle: {},
  rightTextStyle: {},
};

export default Switch;
