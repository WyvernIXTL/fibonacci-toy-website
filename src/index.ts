/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import van from 'vanjs-core/debug';
const { button, div, pre, h1, main } = van.tags;

import { NaturalInputWithSelectorAndGoButton } from './components/input.ts';

const input = van.state(undefined);
const buttonClicked = van.state(false);
const algorithms = ['Linear Rs', 'Linear JS'];
const selected = van.state('Linear Rs');

van.add(
  document.body,
  main(
    { class: 'responsive' },
    h1('Hello World'),
    NaturalInputWithSelectorAndGoButton({
      input: input,
      labelInput: 'Which n-th fibonacci number?',
      buttonClicked: buttonClicked,
      selection: algorithms,
      labelSelection: 'Algorithm',
      selected: selected,
      focusOnLoad: true,
    }),
  ),
);
