import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
import {expect} from 'vitest';
import {TestingLibraryMatchers} from '@testing-library/jest-dom/matchers';

// jsdom does not implement ResizeObserver/IntersectionObserver.
// Zag.js (via @floating-ui/dom) auto-resizes the menu positioner, so stub them out.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = globalThis.ResizeObserver ?? ResizeObserverStub;
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver ?? IntersectionObserverStub;

// jsdom does not implement Element.prototype.scrollTo, which Zag's select
// (and menu highlight scrolling) calls. Stub it out.
Element.prototype.scrollTo =
  Element.prototype.scrollTo ??
  function scrollTo() {
    /* no-op */
  };

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {
  }
}

expect.extend(matchers);
