/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export const Algorithm = {
  // biome-ignore lint/style/useNamingConvention: This is a constant object.
  Linear: 'Linear Javascript',
  // biome-ignore lint/style/useNamingConvention: This is a constant object.
  LinearRs: 'Linear Rust',
} as const;

export type Algorithm = (typeof Algorithm)[keyof typeof Algorithm];

export const AlgorithmList = Object.values(Algorithm);

export function isAlgorithm(value: unknown): value is Algorithm {
  return AlgorithmList.includes(value as Algorithm);
}
