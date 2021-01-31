import React from 'react';

import Switch from '../Switch';

import { ThemeConsumer } from '../../../providers/ThemeProvider';
import { LightName, DarkName } from '../../../configs/Themes';

const SwitchTheme = () => (
  <ThemeConsumer>
    {({ name, change }) => (
      <Switch
        value={name === DarkName}
        onValueChange={(value) => change(value ? DarkName : LightName)}
        leftText="theme.light"
        rightText="theme.dark"
      />
    )}
  </ThemeConsumer>
);

export default SwitchTheme;
