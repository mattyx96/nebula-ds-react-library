import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
import {expect, vi} from 'vitest';
import {TestingLibraryMatchers} from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {
  }
}

vi.mock('./src/hook/useBreakpoint.ts', () => ({
  useBreakpoint: vi.fn(),
}));

expect.extend(matchers);
