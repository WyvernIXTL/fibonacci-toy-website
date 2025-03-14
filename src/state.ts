/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Action } from 'hyperapp';
import type { FromWorkerMessage } from './calculation/worker.ts';
import type { NumberInputWithSelectorGoAndCancelButtonState } from './components/input.ts';
import {
  type FibonacciNumberOutputState,
  defaultFibonacciNumberOutputState,
  defaultTextAreaWithCopyState,
} from './components/output.ts';
import type { FibonacciAlgorithm } from './types/FibonacciAlgorithm.ts';

export type AppState = {
  calculating: boolean;
  input: NumberInputWithSelectorGoAndCancelButtonState<FibonacciAlgorithm>;
  output: FibonacciNumberOutputState;
};

const WriteValidResult: Action<AppState, FromWorkerMessage> = (
  state,
  result,
) => ({
  ...state,
  output: {
    ...defaultFibonacciNumberOutputState(),
    durationInMs: result.duration,
    nthNumber:
      state.input.naturalInputState === 'INIT'
        ? undefined
        : state.input.naturalInputState,
    target: {
      ...defaultTextAreaWithCopyState(),
      value: result.result,
    },
  },
});

const WriteErrorResult: Action<AppState, string> = (state, errorMsg) => ({
  ...state,
  output: {
    ...defaultFibonacciNumberOutputState(),
    error: errorMsg,
  },
});

const StartCalculation: Action<AppState> = (state) => ({
  ...state,
  calculating: true,
  input: {
    ...state.input,
  },
});

const StartFibonacciCalculation: Action<AppState, number> = (state) => [
  {
    calculating: true,
  },
];
