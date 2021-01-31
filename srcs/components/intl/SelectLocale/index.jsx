import React from 'react';

import { Menu, Button } from 'react-native-paper';

import { IntlConsumer } from '../../../providers/IntlProvider';
import { ThemeConsumer } from '../../../providers/ThemeProvider';

const SelectLocalAnchor = (locale, show) => <Button onPress={show}>{locale}</Button>;

const SelectLocale = () => {
  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => setVisible(true), []);
  const hide = React.useCallback(() => setVisible(false), []);

  return (
    <IntlConsumer>
      {({ locale, languages, changeLocale }) => (
        <ThemeConsumer>
          {({
            theme: {
              colors: { accent },
            },
          }) => (
            <Menu visible={visible} onDismiss={hide} anchor={SelectLocalAnchor(locale, show)}>
              {languages.map((language) => (
                <Menu.Item
                  key={language}
                  title={language.toUpperCase()}
                  onPress={() => changeLocale(language)}
                  style={language === locale ? { backgroundColor: accent } : {}}
                />
              ))}
            </Menu>
          )}
        </ThemeConsumer>
      )}
    </IntlConsumer>
  );
};

SelectLocale.propTypes = {};

export default SelectLocale;
