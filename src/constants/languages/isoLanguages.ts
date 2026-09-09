import jsonLanguages from './ISO-639-1-language.json';
import type { TLanguage } from './types/TLanguage';

// type TISOLanguageCode = typeof jsonLanguages[number]['code'];

/* // Derive types (is it required?)
 * import { ArrayElement } from '@/lib/types/ts';
 * type TISOLanguages = typeof jsonLanguages;
 * type TISOLanguage = ArrayElement<TISOLanguages>;
 */

export const isoLanguages = jsonLanguages.map(
  ({ code, name }) => ({ id: code, name }) as TLanguage,
);
