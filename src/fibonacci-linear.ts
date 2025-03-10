/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export function fibonacciLinear(n: number): number | bigint {
  let a = 1;
  let b = 1;

  for (let i = 2; i < n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }

  return b;
}
