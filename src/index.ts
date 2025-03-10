/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import { h, text, app } from 'hyperapp';

import {
  defaultIntInputState,
  IntInput,
  type IntInputState,
} from './int-input';

export type AppState = {
  calculating: boolean;
  input: IntInputState;
  output?: number;
};

const root = document.querySelector('#root');
if (!root) {
  throw new Error('Failed getting root of html document.');
}

app<AppState>({
  view: (state) =>
    h('main', { class: 'responsive' }, [
      h('h1', {}, text('Fibonacci Calculator')),
      IntInput(state.input),
    ]),
  init: {
    calculating: false,
    input: defaultIntInputState(),
    output: undefined,
  },
  node: root,
});
