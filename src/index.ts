/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import { type Action, app, h, text } from 'hyperapp';

const worker = new Worker(new URL('./worker.ts', import.meta.url));
import { FibonacciOutput, type FibonacciOutputState } from './fib-output';
import { IntInput, type IntInputState, defaultIntInputState } from './input';
import { defaultProgressState } from './progress';
import type { FromWorkerMessage, ToWorkerMessage } from './worker';

export type AppState = {
  calculating: boolean;
  input: IntInputState;
  output?: FibonacciOutputState;
};

const root = document.querySelector('#root');
if (!root) {
  throw new Error('Failed getting root of html document.');
}

const WriteValidResult: Action<
  AppState,
  { number: string; duration: number }
> = (state, result) => {
  const newState = {
    ...state,
    output: {
      ...state.output,
      progress: defaultProgressState(),
      number: result.number,
      duration: result.duration,
    },
  };
  return newState;
};

const WriteErrorResult: Action<AppState, string> = (state, errorMsg) => ({
  ...state,
  output: {
    ...state.output,
    progress: defaultProgressState(),
    error: errorMsg,
  },
});

const HandleFibonacciCalculation: Action<AppState, Event> = (state) => [
  {
    ...state,
    output: {
      progress: { progressing: true },
      nthNumber: state.input.raw,
    },
  },
  (dispatch) => {
    if (state.input.int) {
      worker.onmessage = (event) => {
        const { result, duration }: FromWorkerMessage = event.data;
        dispatch([WriteValidResult, { number: result, duration: duration }]);
      };
      const message: ToWorkerMessage = {
        n: state.input.int,
        algorithm: state.input.algorithm,
      };
      worker.postMessage(message);
    } else {
      dispatch([WriteErrorResult, 'Input invalid.']);
    }
  },
];

app<AppState>({
  view: (state) =>
    h('main', { class: 'responsive' }, [
      h('h1', {}, text('Fibonacci Calculator')),
      IntInput(state.input, HandleFibonacciCalculation),
      h('div', { class: 'medium-space' }),
      state.output ? FibonacciOutput(state.output) : undefined,
    ]),
  init: {
    calculating: false,
    input: defaultIntInputState(),
    output: undefined,
  },
  node: root,
});
