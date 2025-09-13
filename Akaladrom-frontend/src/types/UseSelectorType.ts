import type { AppSliceType } from './AppSliceType';

/**
 * **DESCRIPTION:**
 * 
 * With this type we can have the refernce for the properties
 * of the state usable on the selector.
 * 
 * **EXAMPLE OF USE:**
 * 
 * @example
 * const languageSelected = useSelector((state: UseSelectorType) => state.AppSlice.UserPreferences.Language);
 */
export type UseSelectorType = {
    AppSlice: AppSliceType,
}
