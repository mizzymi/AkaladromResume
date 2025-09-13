import { render } from '@testing-library/react';
import { getProviderRenderWrapper } from './getProviderRenderWrapper';

/**
 * **DESCRIPTION:**
 * 
 * With this function you can render for test you component inside the all providers you need ton this project.
 * 
 * **PARAMETERS:**
 * 
 * @param component You need to pass the component you want to render to test with the providers.
 * 
 * **RETURNS:**
 * 
 * @returns return the store of the redux for see the state.
 * 
 * **EXAMPLE:**
 * 
 * @example
 * const store = renderWithProviders(<yourComponent>);
 */
export const renderWithProviders = (component: React.ReactElement) => {
    const { wrapper, store } = getProviderRenderWrapper();
    render(component, { wrapper });
    return store;
}
