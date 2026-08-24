import type { Institution } from '@/content/site';

/**
 * The chip a third-party mark should sit on.
 *
 * Light by default: of the 26 marks we hold, 11 fall below 3:1 on the dark
 * surface because they are drawn in near-black, and on a light chip they read
 * in their own brand colour with no inversion. Dark only where the supplied
 * file is itself light artwork (`logoTheme: 'light'`), which would otherwise
 * disappear. See tokens.css `.logo-plate`.
 *
 * Deliberately NOT in BrandMark: that module is `'use client'`, and a function
 * exported from a client module is a serialized reference on the server, so
 * calling it during a server render throws.
 */
export function logoPlateClass(item: Institution) {
  return item.logoTheme === 'light' ? 'logo-plate logo-plate--dark' : 'logo-plate';
}
