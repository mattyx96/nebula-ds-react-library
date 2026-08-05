import {renderHook, act} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import {useBreakpoint} from '../useBreakpoint';

const setWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('useBreakpoint', () => {
  afterEach(() => {
    setWidth(1024);
  });

  const cases: Array<[number, string, boolean, boolean, boolean]> = [
    [320, 'xs', true, false, false],
    [640, 'sm', true, false, false],
    [768, 'md', false, false, true],
    [1024, 'lg', false, true, false],
    [1280, 'xl', false, true, false],
    [1536, '2xl', false, true, false],
  ];

  it.each(cases)(
    'width %ipx => current %s, isMobile %s, isDesktop %s, isTablet %s',
    (width, current, isMobile, isDesktop, isTablet) => {
      setWidth(width);
      const {result} = renderHook(() => useBreakpoint());
      expect(result.current.current).toBe(current);
      expect(result.current.isMobile).toBe(isMobile);
      expect(result.current.isDesktop).toBe(isDesktop);
      expect(result.current.isTablet).toBe(isTablet);
    }
  );

  it('updates on window resize', () => {
    setWidth(1024);
    const {result} = renderHook(() => useBreakpoint());
    expect(result.current.current).toBe('lg');

    act(() => {
      setWidth(320);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.current).toBe('xs');
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it('treats 2xl as desktop', () => {
    setWidth(2000);
    const {result} = renderHook(() => useBreakpoint());
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
  });
});
