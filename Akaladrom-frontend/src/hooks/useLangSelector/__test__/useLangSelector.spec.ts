import { useLangSelector } from '../useLangSelector';
import { renderHook } from '@testing-library/react';
import { getProviderRenderWrapper } from '../../../test-utils/getProviderRenderWrapper';
import type { ProviderWrapperType } from '../../../types/ProviderWrapperType';
import type { ProviderStoreType } from '../../../types/ProviderStoreType';

describe('Test for useLangSelector custom hook', () => {
    let store: ProviderStoreType;
    let wrapper: ProviderWrapperType;
    let result: { current: ReturnType<typeof useLangSelector> };

    beforeEach(() => {
        const { wrapper: Wrapper, store: Store } = getProviderRenderWrapper();
        wrapper = Wrapper;
        store = Store;
        result = renderHook(() => useLangSelector({}), {
            wrapper,
        }).result;
    });

    test('1.- the custom hook return the correct properties', () => {
        expect(result.current).toBeDefined();
    });
});
