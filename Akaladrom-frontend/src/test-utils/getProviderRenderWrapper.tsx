import { BrowserRouter } from 'react-router-dom';
import { AppStore } from '../redux/AppStore';
import { Provider } from 'react-redux';
import type { JSX } from 'react';

/**
 * **DESCRIPTION:**
 * 
 * With this interface we can represent the two properties that
 * thetest util functions returns that one is the wrapper and the
 * other is the property of the store for use it for test the state.
 */
interface GetProviderRenderWrapperReturn {
    /**
     * **DESCRIPTION:**
     * With this react component you can pass a component to render inside
     * this wrapper that is for have the store data for testing, this wrapper
     * is only for the test suits and for test.
     * 
     *  **RETURNS:**
     *  
     * @returns returns ta JSX element, it's a react component.
     * 
     * **EXAMPLE OF USE:**
     * 
     * @example
     * <wrapper>
     *  <yourComponent/>
     * <wrapper>
     */
    wrapper: ({ children }: {
        children: React.ReactNode;
    }) => JSX.Element;
    /**
     * With this properties you can access to the state on the tests
     * or you can run an action by the dispatch function that this property
     * have.
     */
    store: typeof AppStore
}

/**
 * **DESCRIPTION:**
 * 
 * With this method you can get the wrapper for hooks of the app and the store for the test
 * of the components or funcionality that uses or have the state of the redux.
 * 
 *  **RETURNS:**
 * 
 * @returns returns an object with the wrapper and the store.
 * 
 * **EXAMPLE OF USE:**
 * 
 * @example
 * const {wrapper, store} = getProviderRenderWrapper();
 */
export const getProviderRenderWrapper = (): GetProviderRenderWrapperReturn => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={AppStore}>
              <BrowserRouter>
                {children}
              </BrowserRouter>
        </Provider>
    );

    return {
        wrapper,
        store: AppStore,
    }
}
