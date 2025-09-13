import { createSlice } from '@reduxjs/toolkit';
import { AppSliceInitialState } from '../../constants/AppSliceInitialState';
import * as Reducers from '../reducers';

/**
 * **DESCRIPTION:**
 * 
 * With this slice we have all the global properties of the state
 * of redux for all the application. this is used for get the actions
 * that we can call and the reducers, for set it up on the appstore.
 */
export const AppSliceInstance = createSlice({
    name: 'AppSlice',
    initialState: AppSliceInitialState,
    reducers: Reducers,
});

export const {
    setLanguage,
} = AppSliceInstance.actions;

/**
 * **DESCRIPTION:**
 * 
 * With this slice we can set it up on a AppStore for
 * use and have the actions and properties of the slice
 * on the state.
 */
export const AppSlice = AppSliceInstance.reducer;
