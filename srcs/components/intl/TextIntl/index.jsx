import React from 'react';
import PropTypes from 'prop-types';

import { IntlConsumer } from '../../../providers/IntlProvider';

const TextIntl = ({ id }) => <IntlConsumer>{(intl) => intl.t(id)}</IntlConsumer>;

TextIntl.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TextIntl;
