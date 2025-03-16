/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import van from 'vanjs-core/debug';
const { button, div, pre, h1, main } = van.tags;

import { Algorithm, AlgorithmList } from './calculation/calculation-mode.ts';
import { NaturalInputWithSelectorAndGoButton } from './components/input.ts';
import { FibonacciNumberOutput, Spinner } from './components/output.ts';

const input = van.state(undefined);
const buttonClicked = van.state(false);
const selected = van.state(Algorithm.LinearRs);

const calculating = van.state(false);
const result = van.state(undefined);
const n = van.state(0);
const duration = van.state(0);

van.add(
  document.body,
  main(
    { class: 'responsive' },
    h1('Hello World'),
    NaturalInputWithSelectorAndGoButton({
      input: input,
      labelInput: 'Which n-th fibonacci number?',
      buttonClicked: buttonClicked,
      selection: AlgorithmList,
      labelSelection: 'Algorithm',
      selected: selected,
      focusOnLoad: true,
    }),
    div({ class: 'medium-space' }),
    () =>
      calculating.val
        ? Spinner()
        : result.val &&
          FibonacciNumberOutput({
            result: result.val,
            n: n.val,
            calculatedInMs: duration.val,
          }),
  ),
);
