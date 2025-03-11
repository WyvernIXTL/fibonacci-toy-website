/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import {
  type Action,
  type Dispatch,
  type Subscription,
  app,
  h,
  text,
} from 'hyperapp';

import { FibonacciOutput, type FibonacciOutputState } from './fib-output.ts';
import { Footer } from './footer.ts';
import { IntInput, type IntInputState, defaultIntInputState } from './input.ts';
import { defaultProgressState } from './progress.ts';
import type { FromWorkerMessage, ToWorkerMessage } from './worker.ts';

export type AppState = {
  calculating: boolean;
  input: IntInputState;
  output?: FibonacciOutputState;
};

function startWorker(): Worker {
  return new Worker(new URL('./worker', import.meta.url));
}

let worker: Worker = startWorker();

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
    input: {
      ...state.input,
      listenCancel: false,
    },
    output: {
      ...state.output,
      progress: defaultProgressState(),
      number: result.number,
      duration: result.duration,
      copied: false,
    },
  };
  return newState;
};

const WriteErrorResult: Action<AppState, string> = (state, errorMsg) => ({
  ...state,
  input: {
    ...state.input,
    listenCancel: false,
  },
  output: {
    ...state.output,
    progress: defaultProgressState(),
    error: errorMsg,
    copied: false,
  },
});

const HandleFibonacciCalculation: Action<AppState, Event> = (state) => [
  {
    ...state,
    input: {
      ...state.input,
      listenCancel: true,
    },
    output: {
      progress: { progressing: true },
      nthNumber: state.input.raw,
      copied: false,
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

const CancelCalculation: Action<AppState, Event> = () => {
  worker.terminate();
  worker = startWorker();
  return [WriteErrorResult, 'Canceled calculation.'];
};

const focusInput = () => {
  document.getElementById('number-input')?.focus();
};

const enterKeySubscriber: Subscription<AppState> = [
  (dispatch: Dispatch<AppState>) => {
    const handler = (ev: KeyboardEvent) => {
      const focusedInput = document.getElementById('number-input') ?? true;
      if (ev.key === 'Enter' && focusedInput) {
        dispatch(HandleFibonacciCalculation);
      }
    };
    addEventListener('keydown', handler);
    return () => removeEventListener('keydown', handler);
  },
  undefined,
];

const escapeKeySubscriber: Subscription<AppState> = [
  (dispatch: Dispatch<AppState>) => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        dispatch(CancelCalculation);
      }
    };
    addEventListener('keydown', handler);
    return () => removeEventListener('keydown', handler);
  },
  undefined,
];

app<AppState>({
  view: (state) =>
    h('div', {}, [
      h('main', { class: 'responsive' }, [
        h('div', { class: 'space' }),
        h('h1', { class: 'small' }, text('Fibonacci Calculator')),
        h('div', { class: 'space' }),
        IntInput(state.input, HandleFibonacciCalculation, CancelCalculation),
        h('div', { class: 'medium-space' }),
        state.output ? FibonacciOutput(state.output) : undefined,
      ]),
      Footer(),
    ]),
  init: [
    {
      calculating: false,
      input: defaultIntInputState(),
      output: undefined,
    },
    () => {
      requestAnimationFrame(focusInput);
    },
  ],
  subscriptions: (_state) => [enterKeySubscriber, escapeKeySubscriber],
  node: root,
});
