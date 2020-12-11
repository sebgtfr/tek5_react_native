import React from 'react';
import PropTypes from 'prop-types';

const MultiProvider = ({ children, providers }) => {
  let content = children;

  providers.forEach((provider) => {
    content = React.createElement(provider, null, content);
  });

  return content;
};

MultiProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  providers: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default MultiProvider;
