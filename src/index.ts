/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import van from 'vanjs-core';
const { div, h1, main } = van.tags;

import type { State } from 'vanjs-core';
import { Algorithm, AlgorithmList } from './calculation/calculation-mode.ts';
import { startWorker } from './calculation/worker-util.ts';
import type {
  FromWorkerMessage,
  ToWorkerMessage,
} from './calculation/worker.ts';
import { Footer } from './components/footer.ts';
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

function onFinishedCalculation(worker: Worker) {
  worker.onmessage = (event) => {
    const workerResult: FromWorkerMessage = event.data;
    result.val = workerResult.result;
    duration.val = workerResult.duration;
    calculating.val = false;
    buttonClicked.val = false;
  };
}
onFinishedCalculation(worker);

function startCalculation(): void {
  if (input.val && !calculating.val) {
    n.val = input.val;
    calculating.val = true;
    const workerMessage: ToWorkerMessage = {
      n: n.val,
      algorithm: selected.val,
    };
    worker.postMessage(workerMessage);
  }
}

function cancelCalculation(): void {
  if (calculating.val) {
    worker.terminate();
    worker = startWorker();
    onFinishedCalculation(worker);
    calculating.val = false;
  }
}

const outputElement = FibonacciNumberOutput({
  result: van.derive(() => result.val ?? ''),
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
    div({ class: 'space' }),
    h1({ class: 'small' }, 'Fibonacci Calculator'),
    div({ class: 'space' }),
    NaturalInputWithSelectorAndGoButton({
      input: input,
      labelInput: 'Which n-th fibonacci?',
      buttonClicked: buttonClicked,
      selection: AlgorithmList,
      labelSelection: 'Algorithm',
      selected: selected,
      focusOnLoad: true,
      onGo: startCalculation,
      onCancel: cancelCalculation,
    }),
    div({ class: 'medium-space' }),
    spinnerElement,
    outputElement,
  ),
  Footer(),
);
