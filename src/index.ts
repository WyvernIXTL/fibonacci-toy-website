/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import { h, text, app } from 'hyperapp';

type AppState = {
  count: number;
};

const root = document.querySelector('#root');
if (!root) {
  throw new Error('Failed getting root of html document.');
}

function addToCounter(state: AppState, amount: number): AppState {
  return { ...state, count: state.count + amount };
}

app<AppState>({
  view: (state) =>
    h('main', { class: 'responsive' }, [
      h('h1', {}, text('Hello world')),
      h('nav', { class: 'no-space' }, [
        h(
          'button',
          {
            class: 'border left-round fill small',
            onclick: [addToCounter, -1],
          },
          h('span', {}, text('decrement')),
        ),
        h(
          'button',
          { class: 'border no-round small', disabled: false },
          h('span', {}, h('bold', {}, text(`${state.count}`))),
        ),
        h(
          'button',
          {
            class: 'border right-round fill small',
            onclick: [addToCounter, 1],
          },
          h('span', {}, text('increment')),
        ),
      ]),
    ]),
  init: { count: 0 },
  node: root,
});
