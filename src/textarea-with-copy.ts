import { type VNode, h, text } from 'hyperapp';
import type { AppState } from '.';

export type TextAreaWithCopyState = {
  value: string;
  helper?: string;
};

export function defaultTextAreaWithCopyState(): TextAreaWithCopyState {
  return {
    value: '',
    helper: undefined,
  };
}

export function TextAreaWithCopy(
  state: TextAreaWithCopyState,
): VNode<AppState> {
  return h('div', {}, [
    h('textarea', {}),
    state.helper
      ? h('span', { class: 'helper' }, text(state.helper))
      : undefined,
  ]);
}
