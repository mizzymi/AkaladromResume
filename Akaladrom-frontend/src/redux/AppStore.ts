import { configureStore } from '@reduxjs/toolkit';
import * as Slices from './slices';

/**
 * **Description:**
 * 
 * With this contant you can have all the slices with
 * their slices properties for the it's states and theis
 * reducers for the calls for the state. This is the root
 * of the state of the aplication containing all the states
 * that are inside the slices, a slice is for store some values
 * of a thematic like UI or general etc... and the state works like
 * global properties of the app that the components can get via
 * selector and set via dispatch the reducer that this properti have
 * (AppStore).
 */
export const AppStore = configureStore({
  reducer: {
    ...Slices
  },
});
