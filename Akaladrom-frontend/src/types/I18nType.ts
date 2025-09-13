/**
 * **DESCRIPTION:**
 * 
 * With this type we can refer to objects that have
 * multiples strings dependenly of what language you want.
 * 
 * On this case we have:
 * 
 * * es: Spanish transaltion.
 * * en: English translation.
 */
export type I18nType = {
  /**
   * With this property we can refer to the string of the spanish translation.
   */
  es: string;
  /**
   * With this property we can refer to the string of the english translation.
   */
  en: string;
  /**
   * With this property we can refer to the string of the french translation.
   */
  fr: string;
  /**
   * With this property we can refer to the string of the german translation.
   */
  de: string;
  /**
   * With this property we can refer to the string of the italian translation.
   */
  it: string;
  /**
   * With this property we can refer to the string of the japanese translation.
   */
  ja: string;
  /**
   * With this property we can refer to the string of the simplified chinese translation.
   */
  zhHans: string;
  /**
   * With this property we can refer to the string of the simplified chinese translation.
   */
  pt: string;
  /**
   * With this property we can refer to the string of the russian translation.
   */
  ru: string;
  /**
   * With this property we can refer to the string of the korean translation.
   */
  ko: string;
  /**
   * With this property we can refer to the string of the tradicional chinese translation.
   */
  zhHant: string;
};
