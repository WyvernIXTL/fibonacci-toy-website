import { type VNode, h } from 'hyperapp';
import type { AppState } from '.';

export type ProgressState = {
  progressing: boolean;
  explicit?: { current: number; max: number };
};

export function defaultProgressState(): ProgressState {
  return {
    progressing: false,
    explicit: undefined,
  };
}

export function Progress(
  state: ProgressState,
  alternative: VNode<AppState>,
): VNode<AppState> {
  if (!state.progressing) {
    return alternative;
  }

  if (!state.explicit) {
    return h('progress', { class: 'circle large' });
  }

  return h('progress', {
    value: state.explicit.current,
    max: state.explicit.max,
  });
}
