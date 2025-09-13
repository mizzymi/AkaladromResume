import { renderHook, act } from '@testing-library/react';
import { useTranslations } from '../useTranslations';
import { translations } from '../../../i18n/translations';
import { setLanguage } from '../../../redux/slices/AppSlice';
import { getProviderRenderWrapper } from '../../../test-utils/getProviderRenderWrapper';
import type { ProviderWrapperType } from '../../../types/ProviderWrapperType';
import type { ProviderStoreType } from '../../../types/ProviderStoreType';

describe('Test for useTranslations custom hook', () => {
  let store: ProviderStoreType;
  let wrapper: ProviderWrapperType;
  let result: { current: ReturnType<typeof useTranslations> };

  beforeEach(() => {
    const { wrapper: Wrapper, store: Store} = getProviderRenderWrapper();
    wrapper = Wrapper;
    store = Store;
    result = renderHook(() => useTranslations({}), {
      wrapper,
    }).result;
  });

  test('1.- the custom hook return the correct properties', () => {
    expect(result.current.t).toBeDefined();
  });

  test('2.- the custom hook return the correct translation with an existing translation ID', () => {
    let translationResult: string = '';

    act(() => {
      translationResult = result.current.t('example');
    });

    expect(translationResult).toBe(translations['example'].es);
  });

  test('3.- the custom hook return the correct error for an unexisting translation ID', () => {
    let translationResult: string = '';

    act(() => {
      translationResult = result.current.t('siiiiHombreeee');
    });

    expect(translationResult).toBe(translations['errorLocalizedIdNotFound'].es);
  });

  test('4.- the custom hook return the correct translation with an existing translation ID in diferent languages', () => {
    let translationResult: string = '';

    act(() => {
      store.dispatch(setLanguage('en'));
    });

    result = renderHook(() => useTranslations({}), {
      wrapper,
    }).result;

    act(() => {
      translationResult = result.current.t('example');
    });

    expect(translationResult).toBe(translations['example'].en);
  });
});
