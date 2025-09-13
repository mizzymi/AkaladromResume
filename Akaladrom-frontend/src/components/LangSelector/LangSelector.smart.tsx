import { useDispatch, useSelector } from "react-redux";
import { LangSelector } from "./LangSelector";
import type { LanguageCode } from "./LangSelector";
import type { UseSelectorType } from "../../types/UseSelectorType";
import { setLanguage } from "../../redux/slices/AppSlice";
import type { LanguageIdType } from "../../types/LanguageIdType";

/**
 * **DESCRIPTION:**
 *
 * Smart wrapper that connects `LangSelector` to Redux:
 * - Reads current language from `AppSlice.UserPreferences.Language`.
 * - Dispatches an action to update the language when the user picks one.
 *
 * It assumes a Redux action type string: `"AppSlice/UserPreferences/setLanguage"`.
 * If your action creator differs, replace the `dispatch({ type: ..., payload })` line accordingly.
 *
 * **EXAMPLE OF USE:**
 * @example
 * <LangSelectorSmart />
 */
export function LangSelectorSmart() {
  const dispatch = useDispatch();
  const language = useSelector(
    (state: UseSelectorType) => state.AppSlice.UserPreferences.Language
  ) as LanguageCode | string;

  const handleChange = (next: LanguageCode) => {
    dispatch(setLanguage(next as unknown as LanguageIdType));
  };

  return <LangSelector value={language as LanguageCode} onChange={handleChange} />;
}
