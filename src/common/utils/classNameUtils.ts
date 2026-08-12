import clsx, { ClassValue } from 'clsx';

/**
 * Merges classes using clsx.
 * @example
 * clsxMerge('nb-button', 'nb-button--filled')
 * // => 'nb-button nb-button--filled'
 * @param classes {ClassValue[]} - Array of classes to merge
 * @returns {string}
 */
export const clsxMerge = (...classes: ClassValue[]): string =>
  clsx(...classes);
