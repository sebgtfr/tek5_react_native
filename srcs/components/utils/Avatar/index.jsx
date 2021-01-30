import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';

import defaultAvatar from '../../../images/defaultAvatar.png';

const Avatar = ({ src, size, square }) =>
  square ? (
    <Image
      style={{ width: size, height: size }}
      source={typeof src === 'string' ? { uri: src } : src || defaultAvatar}
    />
  ) : (
    <PaperAvatar.Image
      size={size}
      source={typeof src === 'string' ? { uri: src } : src || defaultAvatar}
    />
  );

Avatar.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  size: PropTypes.number,
  square: PropTypes.bool,
};

Avatar.defaultProps = {
  size: 64,
  square: false,
};

export default Avatar;
