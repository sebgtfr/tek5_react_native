/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';

import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intl from '../../configs/Intl';


export const IntlContext = React.createContext({
  locale: Localization.locale,
});

export const IntlConsumer = IntlContext.Consumer;

const IntlProvider = ({ children }) => {
  const preferenceIntlName = 'intl_preferences';

  const [locale, setLocale] = React.useState(Localization.locale.split('-')[0]);
  const languages = React.useMemo(() => Object.keys(Intl.translations), []);

  const changeLocale = React.useCallback((pLocale) => {
    if (languages.indexOf(pLocale) !== -1) {
      AsyncStorage.setItem(preferenceIntlName, pLocale).then(() => pLocale && setLocale(pLocale));
    }
  }, [languages]);

  Intl.locale = locale;

  React.useEffect(() => {
    AsyncStorage.getItem(preferenceIntlName).then((pLocale) => pLocale && setLocale(pLocale));
  }, []);

  const intlContext = React.useMemo(
    () => ({
      // Attributs
      locale,
      changeLocale,
      languages,
      t: Intl.t
    }),
    [locale, changeLocale, languages]
  );

  return <IntlContext.Provider value={intlContext}>{children}</IntlContext.Provider>;
};

IntlProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default IntlProvider;
