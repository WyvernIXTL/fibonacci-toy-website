/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export const CalculationMode = {
  // biome-ignore lint/style/useNamingConvention: This is a constant object.
  Linear: 'Linear Javascript',
  // biome-ignore lint/style/useNamingConvention: This is a constant object.
  LinearRs: 'Linear Rust',
} as const;

export type CalculationMode =
  (typeof CalculationMode)[keyof typeof CalculationMode];

export const CalculationModeList = Object.values(CalculationMode);

export function isCalculationMode(value: unknown): value is CalculationMode {
  return CalculationModeList.includes(value as CalculationMode);
}
