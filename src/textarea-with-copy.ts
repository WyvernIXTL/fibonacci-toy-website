/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type Action, type MaybeVNode, type VNode, h, text } from 'hyperapp';
import type { AppState } from '.';

export type TextAreaWithCopyState = {
  value: string;
  helper?: string;
  error?: string;
  copied: boolean;
};

export function defaultTextAreaWithCopyState(): TextAreaWithCopyState {
  return {
    value: '',
    helper: undefined,
    copied: false,
  };
}

const copyResultToClipboard: Action<AppState, Event> = (state) => {
  if (state.output?.number) navigator.clipboard?.writeText(state.output.number);
  console.log('copy');
  return {
    ...state,
    output: {
      ...state.output,
      copied: true,
    },
  };
};

export function TextAreaWithCopy(
  state: TextAreaWithCopyState,
): VNode<AppState> {
  let footer: MaybeVNode<AppState> = undefined;
  if (state.error) {
    footer = h('span', { class: 'error' }, text(state.error));
  } else if (state.helper) {
    footer = h('span', { class: 'helper' }, text(state.helper));
  }

  return h('div', {}, [
    h(
      'div',
      {
        class: `field textarea round border extra ${state.error ? 'invalid' : ''}`,
      },
      [
        h('textarea', {
          value: state.value,
          wrap: 'hard',
          readonly: 'true',
          style: { wordBreak: 'break-all' },
        }),
        footer,
      ],
    ),
    state.error
      ? undefined
      : h(
          'div',
          { class: 'right-align' },
          h(
            'button',
            { class: 'circle slow-ripple', onclick: copyResultToClipboard },
            h('i', {}, state.copied ? text('check') : text('content_copy')),
          ),
        ),
  ]);
}
