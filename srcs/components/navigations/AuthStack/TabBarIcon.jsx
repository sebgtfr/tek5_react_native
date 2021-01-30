import React from 'react';
import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabBarIconPropTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

// HOME
export const TabBarIconHome = ({ color, size }) => (
  <MaterialCommunityIcons name="home" color={color} size={size} />
);

TabBarIconHome.propTypes = TabBarIconPropTypes;
// !HOME

// MAP
export const TabBarIconMap = ({ color, size }) => (
  <MaterialCommunityIcons name="map" color={color} size={size} />
);

TabBarIconMap.propTypes = TabBarIconPropTypes;
// !MAP

// PROFILE
export const TabBarIconProfile = ({ color, size }) => (
  <MaterialCommunityIcons name="account" color={color} size={size} />
);

TabBarIconProfile.propTypes = TabBarIconPropTypes;
// !PROFILE
