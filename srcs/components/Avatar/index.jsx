import React from 'react';
import { Image } from 'react-native';
import Styles from './Styles';

const Avatar = ({ src }) => {
  return <Image style={Styles.userAvatar} source={src} />;
};

export default Avatar;
