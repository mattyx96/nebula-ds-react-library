/**
 * Restores `HTMLElement.prototype.focus` to a plain method.
 *
 * Storybook's runtime redefines `focus` as an accessor whose getter reads
 * `this.ownerDocument`. Reading it off the prototype (as Zag.js and Storybook's
 * own focus tracking do) invokes the getter with `this` bound to the prototype,
 * throwing `TypeError: Illegal invocation`.
 *
 * When the descriptor is an accessor we call its getter with a detached,
 * same-realm element to recover the underlying focus implementation, then swap
 * the accessor for that plain method. Using a same-realm element (rather than
 * an iframe) is important: DOM methods are realm-branded, so a function from a
 * different iframe realm would reject calls with local elements. In regular
 * apps the property is already a plain method, so this is a no-op.
 */
export function restoreNativeFocus(): void {
  if (typeof window === 'undefined') return;

  try {
    const proto = window.HTMLElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, 'focus');

    if (!descriptor || (!('get' in descriptor) && !('set' in descriptor))) return;

    const probe = window.document.createElement('div');
    const nativeFocus = descriptor.get ? descriptor.get.call(probe) : null;
    probe.remove();

    if (typeof nativeFocus === 'function') {
      Object.defineProperty(proto, 'focus', {
        configurable: true,
        writable: true,
        value: nativeFocus,
      });
    }
  } catch {
    // Best-effort; never break the app if the environment forbids patching.
  }
}
