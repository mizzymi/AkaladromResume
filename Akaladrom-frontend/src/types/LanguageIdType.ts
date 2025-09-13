import type { I18nType } from './I18nType';

/**
 * **DESCRIPTION:**
 * 
 * With this type we can refer only for
 * the values of the languages like if you want
 * spanish you can set to 'es' or if you want 
 * an englis you can set 'en'. The values that can
 * have this type is equal to the key names of the
 * I18nType.
 * 
 */
export type LanguageIdType = keyof I18nType;
