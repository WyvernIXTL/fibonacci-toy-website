/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Action } from 'hyperapp';
import { startWorker } from './calculation/worker-utils.ts';
import type { FromWorkerMessage, ToWorkerMessage } from './calculation/worker.ts';
import { NaturalInput, type NaturalInputState } from './components/input.ts';
import {
  FibonacciNumberOutput,
  type FibonacciNumberOutputState,
} from './components/output.ts';
import type { FibonacciAlgorithm } from './types/FibonacciAlgorithm.ts';

export type AppState = {
  calculating: boolean;
  input: NaturalInputState<FibonacciAlgorithm>;
  output: FibonacciNumberOutputState;
};

const worker = startWorker()

const input = new NaturalInput<AppState, FibonacciAlgorithm>({
  getter: (state) => state.input,
  setter: (state, value) => {
    state.input = value;
  },
  FibonacciAlgorithmList,

});

const WriteValidResult = (
  state: AppState,
  result: FromWorkerMessage,
): AppState => ({
  ...state,
  output: FibonacciNumberOutput.writeValid(
    FibonacciNumberOutput.defaultState(),
    {
      value: result.result,
      durationInMs: result.duration,
      nthNumber:
        state.input.naturalInputState === 'INIT'
          ? undefined
          : state.input.naturalInputState,
    },
  ),
});

export const WriteErrorResult = (state: AppState, errorMsg: string): AppState => ({
  ...state,
  output: FibonacciNumberOutput.writeError(
    FibonacciNumberOutput.defaultState(),
    errorMsg,
  ),
});

const StartCalculation = (state: AppState): AppState => ({
  ...state,
  calculating: true,
});

const StopCalculation = (state: AppState): AppState => ({
  ...state,
  calculating: false,
});

const StartFibonacciCalculation: Action<AppState, number> = (state, n) => [
  StartCalculation(state),
  (dispatch) => {
    worker.onmessage = (event) => {
      const { result, duration }: FromWorkerMessage = event.data;
      dispatch([WriteValidResult, { number: result, duration: duration }]);
    };
    const message: ToWorkerMessage = {
      n: n,
      algorithm: ,
    };
    worker.postMessage(message);
  },
];
