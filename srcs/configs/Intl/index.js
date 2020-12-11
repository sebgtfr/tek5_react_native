import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import French from './French';
import English from './English';

i18n.translations = {
  en: English,
  fr: French,
};

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export default i18n;
