/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FibonacciAlgorithm, fibonacciLinear } from './algorithms';

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

  let result: number | bigint;
  const startTime = performance.now();
  switch (algorithm) {
    case FibonacciAlgorithm.Linear:
      result = fibonacciLinear(n);
      break;
  }
  const endTime = performance.now();
  const duration = endTime - startTime;
  const resultString = result.toLocaleString('fullwide', {
    useGrouping: false,
  });
  self.postMessage({ result: resultString, duration: duration });
};
