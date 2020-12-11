/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';

import * as Localization from 'expo-localization';
import Intl from '../../configs/Intl';

export const IntlContext = React.createContext({
  locale: Localization.locale,
});

export const IntlConsumer = IntlContext.Consumer;

const IntlProvider = ({ children }) => {
  const [locale, setLocale] = React.useState(Localization.locale);

  const changeLocal = React.useCallback((_locale) => {
    if (Object.keys(Intl.translations).indexOf(_locale) !== -1) {
      setLocale(_locale);
    }
  }, []);

  Intl.locale = locale;

  const intlContext = React.useMemo(
    () => ({
      // Attributs
      locale,
      changeLocal,
      t: Intl.t
    }),
    [changeLocal, locale]
  );

  return <IntlContext.Provider value={intlContext}>{children}</IntlContext.Provider>;
};

IntlProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default IntlProvider;
