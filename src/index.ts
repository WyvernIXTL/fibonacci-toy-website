/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import { type Action, app, h, text } from 'hyperapp';

import {
  FibonacciAlgorithm,
  fibonacciLinear,
  fibonacciLinearBigInt,
} from './algorithms';
import { FibonacciOutput, type FibonacciOutputState } from './fib-output';
import { IntInput, type IntInputState, defaultIntInputState } from './input';
import { defaultProgressState } from './progress';

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
      progress: { progressing: false },
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
      let result: number | bigint;
      const startTime = performance.now();
      switch (state.input.algorithm) {
        case FibonacciAlgorithm.Linear:
          result = fibonacciLinear(state.input.int);
          break;
        case FibonacciAlgorithm.LinearBigInt:
          result = fibonacciLinearBigInt(state.input.int);
          break;
      }
      const endTime = performance.now();
      const resultString = result.toLocaleString('fullwide', {
        useGrouping: false,
      });
      dispatch([
        WriteValidResult,
        { number: resultString, duration: endTime - startTime },
      ]);
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
