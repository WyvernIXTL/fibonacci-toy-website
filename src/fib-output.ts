/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { VNode } from 'hyperapp';
import type { AppState } from '.';
import { Progress, type ProgressState, defaultProgressState } from './progress';
import { TextAreaWithCopy } from './textarea-with-copy';

export function timeStringFromMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return (
    (hours ? `${hours}h` : '') +
    (minutes ? `${minutes}min` : '') +
    (seconds ? `${seconds}s` : '') +
    (milliseconds ? `${milliseconds}ms` : '')
  );
}

export type FibonacciOutputState = {
  progress: ProgressState;
  number?: string;
  nthNumber?: string;
  duration?: number;
  error?: string;
};

export function defaultFibonacciOutputState(): FibonacciOutputState {
  return {
    progress: defaultProgressState(),
    number: undefined,
    nthNumber: undefined,
    duration: undefined,
    error: undefined,
  };
}

export function FibonacciOutput(state: FibonacciOutputState): VNode<AppState> {
  const nThNumberHelperPart = state.nthNumber
    ? `${state.nthNumber}th number in fibonacci sequence`
    : '';
  const timeStringHelperPart = state.duration
    ? `calculated in ${timeStringFromMs(state.duration)}`
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
