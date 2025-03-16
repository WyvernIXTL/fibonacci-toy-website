/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import van from 'vanjs-core/debug';
const { button, div, pre, h1, main } = van.tags;

import type { State } from 'vanjs-core/debug';
import { Algorithm, AlgorithmList } from './calculation/calculation-mode.ts';
import { startWorker } from './calculation/worker-util.ts';
import type {
  FromWorkerMessage,
  ToWorkerMessage,
} from './calculation/worker.ts';
import { NaturalInputWithSelectorAndGoButton } from './components/input.ts';
import { FibonacciNumberOutput, Spinner } from './components/output.ts';

let worker: Worker = startWorker();

const input = van.state(undefined);
const buttonClicked = van.state(false);
const selected = van.state(Algorithm.LinearRs);

const calculating = van.state(false);
const result: State<undefined | string> = van.state(undefined);
const n = van.state(0);
const duration = van.state(0);

function attachSubscriberToWorker(worker: Worker) {
  worker.onmessage = (event) => {
    const workerResult: FromWorkerMessage = event.data;
    result.val = workerResult.result;
    duration.val = workerResult.duration;
    calculating.val = false;
    buttonClicked.val = false;
  };
}
attachSubscriberToWorker(worker);

van.derive(() => {
  if (buttonClicked.val && input.val && !calculating.val) {
    n.val = input.val;
    calculating.val = true;
    const workerMessage: ToWorkerMessage = {
      n: n.val,
      algorithm: selected.val,
    };
    worker.postMessage(workerMessage);
  }
});

van.derive(() => {
  if (!buttonClicked.val && calculating.val) {
    worker.terminate();
    worker = startWorker();
    attachSubscriberToWorker(worker);
    calculating.val = false;
  }
});

const resultString = van.derive(() => result.val ?? '');
const outputElement = FibonacciNumberOutput({
  result: resultString,
  n: n,
  calculatedInMs: duration,
});
const spinnerElement = Spinner();
van.derive(() => {
  spinnerElement.hidden = !calculating.val;
  outputElement.hidden = calculating.val || !result.val;
});

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
    spinnerElement,
    outputElement,
  ),
);
