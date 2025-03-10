/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type VNode, h, text } from 'hyperapp';
import type { AppState } from '.';

export type TextAreaWithCopyState = {
  value: string;
  helper?: string;
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
  return h('div', {}, [
    h('textarea', {}),
    state.helper
      ? h('span', { class: 'helper' }, text(state.helper))
      : undefined,
  ]);
}
