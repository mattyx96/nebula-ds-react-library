import {afterEach, describe, expect, it} from 'vitest';
import {restoreNativeFocus} from '../restoreNativeFocus';

describe('restoreNativeFocus', () => {
  const nativeFocus = HTMLElement.prototype.focus;

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'focus', {
      configurable: true,
      writable: true,
      value: nativeFocus,
    });
  });

  it('is a no-op when focus is already a plain method', () => {
    restoreNativeFocus();

    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus');
    expect(descriptor?.get).toBeUndefined();
    expect(typeof descriptor?.value).toBe('function');
  });

  it('replaces an accessor with a plain method from the same realm', () => {
    const nativeFocus = HTMLElement.prototype.focus;
    Object.defineProperty(HTMLElement.prototype, 'focus', {
      configurable: true,
      get() {
        void (this as HTMLElement).ownerDocument;
        return nativeFocus;
      },
    });

    restoreNativeFocus();

    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus');
    expect(descriptor?.get).toBeUndefined();
    expect(descriptor?.set).toBeUndefined();
    expect(descriptor?.value).toBe(nativeFocus);
    expect(() => HTMLElement.prototype.focus).not.toThrow();
  });
});
