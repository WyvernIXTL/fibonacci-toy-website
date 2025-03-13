/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export const FibonacciAlgorithm = {
  // biome-ignore lint/style/useNamingConvention: This is a constant object.
  Linear: 'Linear Javascript',
  // biome-ignore lint/style/useNamingConvention: This is a constant object.
  LinearRs: 'Linear Rust',
} as const;

export type FibonacciAlgorithm =
  (typeof FibonacciAlgorithm)[keyof typeof FibonacciAlgorithm];

export const FibonacciAlgorithmList = Object.values(FibonacciAlgorithm);

export function isFibonacciAlgorithm(
  value: unknown,
): value is FibonacciAlgorithm {
  return FibonacciAlgorithmList.includes(value as FibonacciAlgorithm);
}
