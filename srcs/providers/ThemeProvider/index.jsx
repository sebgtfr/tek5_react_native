import React from 'react';
import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, LightName, DarkTheme, DarkName } from '../../configs/Themes';

export const ThemeContext = React.createContext({
  name: LightName,
  theme: LightTheme,
});

export const ThemeConsumer = ThemeContext.Consumer;

const ThemeProvider = ({ children }) => {
  const [name, setName] = React.useState(LightName);
  const preferenceCookieName = 'theme_preferences';

  React.useEffect(() => {
    AsyncStorage.getItem(preferenceCookieName).then(setName);
  }, []);

  const change = React.useCallback(
    (themeName) => {
      AsyncStorage.setItem(preferenceCookieName, themeName).then(() => setName(themeName));
    },
    [setName]
  );

  let theme;

  switch (name) {
    case DarkName:
      theme = DarkTheme;
      break;
    case LightName:
    default:
      theme = LightTheme;
      break;
  }

  const themeContext = React.useMemo(
    () => ({
      name,
      theme,
      change,
    }),
    [name, theme, change]
  );

  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ThemeProvider;
