/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type VNode, h } from 'hyperapp';
import type { AppState } from '.';

export type ProgressState = {
  progressing: boolean;
  explicit?: { current: number; max: number };
};

export function defaultProgressState(): ProgressState {
  return {
    progressing: false,
    explicit: undefined,
  };
}

export function Progress(
  state: ProgressState,
  alternative: VNode<AppState>,
): VNode<AppState> {
  if (!state.progressing) {
    return alternative;
  }

  if (!state.explicit) {
    return h('div', { class: 'center-align' }, [
      h('div', { class: 'large-space' }),
      h('progress', { class: 'circle large' }),
    ]);
  }

  return h('progress', {
    value: state.explicit.current,
    max: state.explicit.max,
  });
}
