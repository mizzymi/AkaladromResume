import type { LanguageIdType } from './LanguageIdType';

/**
 * **DESCRIPTION:**
 * 
 * With this type we can know what is the structure
 * that have the state on the redux and can be used
 * easyly for the selectors for understand what 
 * properties the state has.
 */
export type AppSliceType = {
    /**
     * With this property we can know the preferences that
     * have the user when is using this application like
     * the language the user want to have.
     */
    UserPreferences: {
        /**
         * With this property we can know the language the user
         * selected to see the application with. This property
         * contains strings like 'es' for spanish or 'en' for
         * english.
         */
        Language: LanguageIdType;
    };
};
