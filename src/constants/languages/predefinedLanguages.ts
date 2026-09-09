import { isoLanguages } from './isoLanguages';
import type { TLanguage } from './types/TLanguage';

export const predefinedLanguages: TLanguage[] = isoLanguages;
export const predefinedLanguagesHash = isoLanguages.reduce(
  (hash, lang) => {
    hash[lang.id] = lang.name;
    return hash;
  },
  {} as Record<TLanguage['id'], TLanguage['name']>,
);

/* // DEBUG: Demo languages
 * export const predefinedLanguages: TLanguage[] = [
 *   {
 *     id: 'first',
 *     name: 'First language',
 *   },
 *   {
 *     id: 'second',
 *     name: 'Second language',
 *   },
 * ];
 */
