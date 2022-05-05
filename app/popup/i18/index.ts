import { IObject } from '@popup/utils';

import en from './en';

export * from './interface';

export const translateByLanguage = (language: string) => {
  switch (language) {
    case 'en':
      return en;
    default:
      return en;
  }
};

export const languages = { en };

export const isoLanguages: IObject = {
  en: {
    name: 'English',
    nativeName: 'English',
  },
  vi: {
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
  },
};

export const languagesSupport = () =>
  Object.keys(languages).map((code) => ({
    ...isoLanguages[code],
    code,
  }));
