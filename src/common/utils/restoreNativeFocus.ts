/**
 * Restores `HTMLElement.prototype.focus` to a plain method.
 *
 * Storybook's test/instrumenter addon redefines `focus` as an accessor whose
 * getter reads `this.ownerDocument`. Zag.js reads `HTMLElement.prototype.focus`
 * off the prototype (to track keyboard focus), which invokes that getter with
 * `this` bound to the prototype — throwing `TypeError: Illegal invocation` and
 * breaking any Zag-powered component in Storybook.
 *
 * When the descriptor is an accessor we swap it for the native implementation
 * (obtained from a pristine iframe document). In regular apps the property is
 * already a plain method, so this is a no-op.
 */
export function restoreNativeFocus(): void {
  if (typeof window === 'undefined') return;

  try {
    const proto = window.HTMLElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, 'focus');

    if (!descriptor || (!('get' in descriptor) && !('set' in descriptor))) return;

    const iframe = window.document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    window.document.documentElement.appendChild(iframe);

    const nativeFocus = (
      iframe.contentWindow as Window & {HTMLElement: typeof HTMLElement}
    )?.HTMLElement.prototype.focus;

    iframe.remove();

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
