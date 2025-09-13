import { type FC, type HTMLAttributes } from "react";
import type { I18nType } from "../../types/I18nType";
import "./LangSelector.css";

/**
 * **DESCRIPTION:**
 * 
 * Language code type derived from your I18nType keys.
 */
export type LanguageCode = keyof I18nType;

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * Public API for the presentational `LangSelector`.
 *
 * - `value` (required): Current selected language code.
 * - `onChange` (required): Callback fired when user selects a different language.
 * - `className` (optional): Extra classes for styling.
 * - `testId` (optional): Testing id.
 *
 * Also inherits standard HTML select attributes through `...selectProps`.
 */
interface LangSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
  className?: string;
  testId?: string;
}

/**
 * **DESCRIPTION:**
 *
 * `LangSelector` renders a minimal language dropdown. It is pure UI and
 * does not access Redux. Use the smart variant to connect it to your store.
 *
 * **EXAMPLE OF USE:**
 * @example
 * <LangSelector value="es" onChange={(l) => setLang(l)} />
 */
export const LangSelector: FC<LangSelectorProps> = ({
  value,
  onChange,
  className,
  testId,
  ...rest
}) => {
  return (
    <div className={["LangSelector", className].filter(Boolean).join(" ")} data-testid={testId ?? "LangSelector"} {...rest}>
      <select
        className="LangSelector__select"
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        aria-label="Language selector"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
        <option value="ja">日本語</option>
        <option value="zhHans">简体中文</option>
        <option value="pt">Português</option>
        <option value="ru">Русский</option>
        <option value="ko">한국어</option>
        <option value="zhHant">繁體中文</option>
      </select>
    </div>
  );
};
