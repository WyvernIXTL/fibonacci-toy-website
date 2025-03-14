/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Action } from 'hyperapp';
import type { FromWorkerMessage } from './calculation/worker.ts';
import type { NumberInputWithSelectorGoAndCancelButtonState } from './components/input.ts';
import {
  FibonacciNumberOutput,
  type FibonacciNumberOutputState,
  TextAreaWithCopy,
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
    ...FibonacciNumberOutput.defaultState(),
    durationInMs: result.duration,
    nthNumber:
      state.input.naturalInputState === 'INIT'
        ? undefined
        : state.input.naturalInputState,
    target: {
      ...TextAreaWithCopy.defaultState(),
      value: result.result,
    },
  },
});
