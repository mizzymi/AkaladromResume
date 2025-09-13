import type { WritableDraft } from 'immer';
import type { AppSliceType } from '../../../types/AppSliceType';
import type { ActionWithPayload } from '../../../types/ActionWithPayload';
import type { LanguageIdType } from '../../../types/LanguageIdType';

/**
 * **DESCRIPTION:**
 * 
 * With this action we can change the property of the language of the state.
 * 
 * **PARAMETERS:**
 * 
 * @param state With this property we need to pass the actual state of the redux,
 * this prop is needed only when you pass this reducer on the slice of the initialization.
 * @param action With this property we need to pass the action with payload with a payload typed
 * as LanguageIdType. When you dipatch the reducer you only need to pass the payload but now when
 * we need to pass the Action for the slice to create it properlly.
 */
export const setLanguage = (state: WritableDraft<AppSliceType>, action: ActionWithPayload<LanguageIdType>): void => {
    state.UserPreferences.Language = action.payload;
}
