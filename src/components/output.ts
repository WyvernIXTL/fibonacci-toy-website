/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type Action, type VNode, h, text } from 'hyperapp';
import {
  Component,
  type StateGetterSetter,
  StateTransformer,
} from '../types/common.ts';

export type TextAreaWithCopyState = {
  value: string;
  footer: string;
  valid: boolean;
  copied: boolean;
};

export class TextAreaWithCopy<State> extends Component<
  State,
  TextAreaWithCopyState
> {
  readonly copyResultToClipboard: Action<State, Event> = (state, _event) => {
    const value = this.get(state).value;
    if (value) {
      navigator.clipboard?.writeText(value);
    }
    return this.set(state, { ...this.get(state), copied: true });
  };

  render(state: TextAreaWithCopyState): VNode<State> {
    return h('div', {}, [
      h(
        'div',
        {
          class: `field textarea round border extra ${state.valid || 'invalid'}`,
        },
        [
          h('textarea', {
            value: state.value,
            wrap: 'hard',
            readonly: 'true',
            style: { wordBreak: 'break-all' },
          }),
          h('span', { class: state.valid || 'error' }, text(state.footer)),
        ],
      ),
      state.valid &&
        h(
          'div',
          { class: 'right-align' },
          h(
            'button',
            {
              class: 'circle slow-ripple',
              onclick: this.copyResultToClipboard,
            },
            h('i', {}, state.copied ? text('check') : text('content_copy')),
          ),
        ),
    ]);
  }

  defaultState(): TextAreaWithCopyState {
    return {
      value: '',
      valid: true,
      footer: '',
      copied: false,
    };
  }
}

export function SpinnerCentered<State>(): VNode<State> {
  return h('div', { class: 'center-align' }, [
    h('div', { class: 'large-space' }),
    h('progress', { class: 'circle large' }),
  ]);
}

function timeStringFromMs(ms: number): string {
  const msRounded = Math.round(ms);
  const totalSeconds = Math.floor(msRounded / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = msRounded % 1000;

  return (
    (hours ? `${hours}h ` : '') +
    (minutes ? `${minutes}min ` : '') +
    (seconds ? `${seconds}s ` : '') +
    (milliseconds ? `${milliseconds}ms` : '')
  );
}

type FibonacciNumberOutputState = {
  target: TextAreaWithCopyState;
  durationInMs?: number;
  nthNumber?: number;
  error?: string;
};

export class FibonacciNumberOutput<State> extends StateTransformer<
  State,
  FibonacciNumberOutputState,
  TextAreaWithCopyState
> {
  private footer(state: FibonacciNumberOutputState): string {
    const nThNumberHelperPart = state.nthNumber
      ? `${state.nthNumber}th number in fibonacci sequence`
      : '';
    const timeStringHelperPart = state.durationInMs
      ? Math.round(state.durationInMs)
        ? `calculated in ${timeStringFromMs(state.durationInMs)}`
        : ''
      : '';
    return `${nThNumberHelperPart}${nThNumberHelperPart && timeStringHelperPart ? ', ' : ''}${timeStringHelperPart}`;
  }

  constructor(
    getterSetter: StateGetterSetter<State, FibonacciNumberOutputState>,
  ) {
    super(
      getterSetter,
      (getterSetter) => {
        return new TextAreaWithCopy(getterSetter);
      },
      (state) => {
        return {
          ...state,
          target: {
            ...state.target,
            footer: this.footer(state),
            valid: !state.error,
          },
        };
      },
    );
  }

  public defaultState(): FibonacciNumberOutputState {
    return {
      target: this.subComponent.defaultState(),
      durationInMs: undefined,
      nthNumber: undefined,
      error: undefined,
    };
  }
}
