import type { renderWithProviders } from '../test-utils/renderWithProviders';

/**
 * **DESCRIPTION:**
 * 
 * With this type you can have the references of the store that have this
 * frontend application for dispacth or for get the state of the redux
 * when you are testing the funcionality.
 */
export type ProviderStoreType = ReturnType<typeof renderWithProviders>;
