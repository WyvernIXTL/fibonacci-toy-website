/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { VNode } from 'hyperapp';
import type { AppState } from '.';
import { Progress, type ProgressState, defaultProgressState } from './progress';
import { TextAreaWithCopy } from './textarea-with-copy';

export function timeStringFromSeconds(secs: number): string {
  const hours = Math.floor(secs / 60 / 60);
  const minutes = Math.floor((secs / 60) % 60);
  const seconds = Math.floor(secs % 60);

  return (
    (hours ? `${hours}h` : '') +
    (minutes ? `${minutes}min` : '') +
    (seconds ? `${seconds}s` : '')
  );
}

export type FibonacciOutputState = {
  progress: ProgressState;
  number?: string;
  nthNumber?: string;
  time?: number;
  error?: string;
};

export function defaultFibonacciOutputState(): FibonacciOutputState {
  return {
    progress: defaultProgressState(),
    number: undefined,
    nthNumber: undefined,
    time: undefined,
    error: undefined,
  };
}

export function FibonacciOutput(state: FibonacciOutputState): VNode<AppState> {
  const nThNumberHelperPart = state.nthNumber
    ? `${state.nthNumber}th Number in Fibonacci Sequence`
    : '';
  const timeStringHelperPart = state.time
    ? `calculated in${timeStringFromSeconds(state.time)}`
    : '';
  const helper = `${nThNumberHelperPart}${nThNumberHelperPart && timeStringHelperPart ? ', ' : ''}${timeStringHelperPart}`;

  return Progress(
    state.progress,
    TextAreaWithCopy({
      value: `${state.number ?? ''}`,
      helper: helper,
      error: state.error,
    }),
  );
}
