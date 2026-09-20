import { localesList } from '@/i18n/types';

import jsonLanguages from './ISO-639-1-language.json';
import type { TLanguageId } from './types';

const allLanguageCodes = jsonLanguages.map(({ code }) => code as TLanguageId);
const allPossibleLanguageCodesNonUniqueList = [
  ...allLanguageCodes,
  ...localesList,
];
export const allPossibleLanguageCodesSet = new Set(
  allPossibleLanguageCodesNonUniqueList,
);
