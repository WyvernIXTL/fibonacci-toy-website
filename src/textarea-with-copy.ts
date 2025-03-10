/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type MaybeVNode, type VNode, h, text } from 'hyperapp';
import type { AppState } from '.';

export type TextAreaWithCopyState = {
  value: string;
  helper?: string;
  error?: string;
};

export function defaultTextAreaWithCopyState(): TextAreaWithCopyState {
  return {
    value: '',
    helper: undefined,
  };
}

export function TextAreaWithCopy(
  state: TextAreaWithCopyState,
): VNode<AppState> {
  let footer: MaybeVNode<AppState> = undefined;
  if (state.error) {
    footer = h('span', { class: 'error' }, text(state.error));
  } else if (state.helper) {
    footer = h('span', { class: 'helper' }, text(state.helper));
  }

  return h(
    'div',
    {
      class: `field textarea round border extra ${state.error ? 'invalid' : ''}`,
    },
    [
      h('textarea', {
        value: state.value,
      }),
      footer,
    ],
  );
}
