/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type Action, type VNode, h, text } from 'hyperapp';
import { Component } from '../types/common.ts';

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
