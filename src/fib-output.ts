import type { VNode } from 'hyperapp';
import type { AppState } from '.';
import { Progress, type ProgressState, defaultProgressState } from './progress';
import { TextAreaWithCopy } from './textarea-with-copy';

export function timeStringFromSeconds(secs: number): string {
  const hours = Math.floor(secs / 60 / 60);
  const minutes = Math.floor((secs / 60) % 60);
  const seconds = Math.floor(secs % 60);

  return (
    (hours ? `${hours}h` : '') +
    (minutes ? `${minutes}min` : '') +
    (seconds ? `${seconds}s` : '')
  );
}

export type FibonacciOutputState = {
  progress: ProgressState;
  number?: number;
  nthNumber?: number;
  time?: number;
};

export function defaultFibonacciOutputState(): FibonacciOutputState {
  return {
    progress: defaultProgressState(),
    number: undefined,
    nthNumber: undefined,
    time: undefined,
  };
}

export function FibonacciOutput(state: FibonacciOutputState): VNode<AppState> {
  const nThNumberHelperPart = state.nthNumber
    ? `${state.nthNumber}th Number in Fibonacci Sequence`
    : '';
  const timeStringHelperPart = state.time
    ? `calculated in${timeStringFromSeconds(state.time)}`
    : '';
  const helper = `${nThNumberHelperPart}${nThNumberHelperPart && timeStringHelperPart ? ', ' : ''}${timeStringHelperPart}`;

  return Progress(
    state.progress,
    TextAreaWithCopy({ value: `${state.number}`, helper: helper }),
  );
}
