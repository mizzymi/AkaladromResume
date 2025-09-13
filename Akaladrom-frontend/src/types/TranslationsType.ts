import type { I18nType } from './I18nType';

/**
 * **DESCRIPTION:**
 * 
 * With this type we can refer to objects that have
 * diferent key names refereing to a transaltion keys
 * with the translations inside.
 */
export type TranslationsType = {
    [key: string] : I18nType;
};
