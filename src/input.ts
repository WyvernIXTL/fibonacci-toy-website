/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type Action, type VNode, h, text } from 'hyperapp';
import type { AppState } from '.';
import { FibonacciAlgorithm } from './algorithms';

export type IntInputState = {
  raw: string;
  int?: number;
  valid: boolean;
  algorithm: FibonacciAlgorithm;
};

export function defaultIntInputState(): IntInputState {
  return {
    raw: '',
    int: undefined,
    valid: true,
    algorithm: FibonacciAlgorithm.Linear,
  };
}

const NewInput: Action<AppState, Event> = (state, event) => {
  const input = (event.target as HTMLInputElement).value;
  const valid = input !== '';
  const int = valid ? Number.parseInt(input, 10) : undefined;
  return {
    ...state,
    input: {
      ...state.input,
      raw: input,
      valid: valid,
      int: int,
    },
  };
};

const NewAlgorithmSelected: Action<AppState, FibonacciAlgorithm> = (
  state,
  selected,
) => {
  return {
    ...state,
    input: {
      ...state.input,
      algorithm: selected,
    },
  };
};

function AlgorithmSelector(
  currentAlgorithm: FibonacciAlgorithm,
): VNode<AppState> {
  const options: VNode<AppState>[] = [];
  let i = 0;
  for (const key in FibonacciAlgorithm) {
    const algorithm =
      FibonacciAlgorithm[key as keyof typeof FibonacciAlgorithm];
    options.push(
      h(
        'option',
        {
          selected: algorithm === currentAlgorithm ? 'selected' : undefined,
          onclick: [NewAlgorithmSelected, algorithm],
        },
        text(algorithm),
      ),
    );
    i++;
  }
  return h('div', { class: 'field border no-round' }, [
    h('select', {}, options),
    h('label', {}, text('Algorithm')),
  ]);
}

export const IntInput = (
  state: IntInputState,
  actionOnGo: Action<AppState, Event>,
): VNode<AppState> => {
  return h('nav', { class: 'no-space' }, [
    h(
      'div',
      {
        class: `field border left-round max ${state.valid ? '' : 'invalid'}`,
      },
      [
        h('input', {
          type: 'number',
          oninput: NewInput,
          value: state.raw,
        }),
        state.valid
          ? h('span', { class: 'helper' }, text('Which fibonacci?'))
          : h('span', { class: 'error' }, text('Not an natural number!')),
      ],
    ),
    AlgorithmSelector(state.algorithm),
    h(
      'button',
      { class: 'border right-round large fill', onclick: actionOnGo },
      text('Go'),
    ),
  ]);
};
