import { useSelector } from 'react-redux';
import { translations } from '../../i18n/translations';
import type { I18nType } from '../../types/I18nType';
import type { UseSelectorType } from '../../types/UseSelectorType';

/**
 * **DESCRIPTION:**
 * 
 * With this interface we can represent the return of the
 * custom hook of the useTranslation, that this custom
 * hook will return only one property that is the function
 * called t that this function is used for get the translations
 * by a translation tag.
 */
interface UseTranslationsReturn {
  /**
   * **DESCRIPTION:**
   * 
   * With this function you can get the translated text transalated
   * on the language that is selected on the state by passing the
   * translation tag.
   * 
   * **PARAMETERS:**
   * 
   * @param stringIdentifier On this property you need to pass the
   * translation tag of the file of translations.ts that you want
   * to get the translation for.
   * 
   * **RETURNS:**
   * 
   * @returns returns the text trasnlated on the language selected on
   * the state.
   * 
   * **EXAMPLE OF USE:**
   * 
   * @example
   * const { t } = useTranslations({});
   * const textTranslated: string = t('exampleTag');
   */
  t: (stringIdentifier: I18nType | string) => string
}

/**
 * **DESCRIPTION:**
 * 
 * With this interface we can define the properties that useTranslation
 * hook need but for now it need no properties.
 */
interface UseTranslationsProps {

}

/**
 * **DESCRIPTION:**
 * 
 * With this customhook you can get a function called t that is used for
 * the translations.
 * 
 * **RETURNS:**
 * 
 * @returns return an object that contains the porperty called t that is the funcion.
 * 
 * **EXAMPLE OF USE:**
 * 
 * @example
 * const { t } = useTranslations({});
 * const textTranslated: string = t('exampleTag');
 */
export const useTranslations = ({} : UseTranslationsProps): UseTranslationsReturn => {

  const languageSelected = useSelector((state: UseSelectorType) => state.AppSlice.UserPreferences.Language);

  const t = (stringIdentifier: I18nType | string): string => {
    if (typeof stringIdentifier === 'string') {
      if (translations[stringIdentifier] != undefined) {
        return translations[stringIdentifier][languageSelected];
      } else return translations.errorLocalizedIdNotFound[languageSelected];
    } else {
      return stringIdentifier[languageSelected];
    }
  }

  return {
    t
  }
}
