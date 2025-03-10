import { h, text, type Action, type VNode } from 'hyperapp';
import type { AppState } from '.';

export type IntInputState = {
  raw: string;
  int?: number;
  valid: boolean;
};

export function defaultIntInputState(): IntInputState {
  return {
    raw: '',
    int: undefined,
    valid: true,
  };
}

const NewInput: Action<AppState, Event> = (state, event) => {
  const input = (event.target as HTMLInputElement).value;
  const valid = input !== '';
  const int = valid ? Number.parseInt(input, 10) : undefined;
  return {
    ...state,
    input: {
      ...state.input,
      raw: input,
      valid: valid,
      int: int,
    },
  };
};

export const IntInput = (state: IntInputState): VNode<AppState> => {
  return h('div', { class: `field border ${state.valid ? '' : 'invalid'}` }, [
    h('input', { type: 'number', oninput: NewInput, value: state.raw }),
    state.valid
      ? h('span', { class: 'helper' }, text('Which fibonacci?'))
      : h('span', { class: 'error' }, text('Not an natural number!')),
  ]);
};
