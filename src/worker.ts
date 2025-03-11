/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// biome-ignore lint/correctness/useImportExtensions: <explanation>
import { fibonacci_linear } from '../fibonacci-toy-rs-4-web/pkg';
import { FibonacciAlgorithm, fibonacciLinear } from './algorithms.ts';

export type ToWorkerMessage = {
  n: number;
  algorithm: FibonacciAlgorithm;
};

export type FromWorkerMessage = {
  result: string;
  duration: number;
};

self.onmessage = (event) => {
  const data = event.data as ToWorkerMessage;
  const n = data.n;
  const algorithm = data.algorithm;

  let result: string;
  const startTime = performance.now();
  switch (algorithm) {
    case FibonacciAlgorithm.Linear:
      result = fibonacciLinear(n).toString(10);
      break;
    case FibonacciAlgorithm.LinearRs:
      result = fibonacci_linear(n);
      break;
    default:
      result = '';
  }
  const endTime = performance.now();
  const duration = endTime - startTime;
  self.postMessage({ result: result, duration: duration });
};
