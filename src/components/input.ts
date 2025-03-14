/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  type Action,
  type Dispatch,
  type Subscription,
  type VNode,
  h,
  text,
} from 'hyperapp';
import {
  Component,
  type ObjectEnum,
  type StateGetterSetter,
} from '../types/common.ts';

class QuadraticSelection<State, Member> extends Component<State, Member> {
  public readonly objectEnum: ObjectEnum<Member>;

  constructor(
    getterSetter: StateGetterSetter<State, Member>,
    objectEnum: ObjectEnum<Member>,
  ) {
    super(getterSetter);
    this.objectEnum = objectEnum;
  }

  readonly updateSelected: Action<State, Event> = (state, event): State => {
    const newSelected = (event.target as HTMLSelectElement).value;
    if (this.objectEnum.isMember(newSelected)) {
      return this.set(state, newSelected);
    }
    throw new Error(
      `Failed updating the selection of this selector. Expected one of ${this.objectEnum.members} but got ${newSelected}`,
    );
  };

  render(state: Member): VNode<State> {
    const options: VNode<State>[] = [];
    for (const member in this.objectEnum.members) {
      options.push(
        h(
          'option',
          {
            selected: member === state ? 'selected' : undefined,
          },
          text(member),
        ),
      );
    }
    return h('div', { class: 'field border no-round' }, [
      h('select', { onchange: this.updateSelected }, options),
      h('label', {}, text('Algorithm')),
    ]);
  }
}

type NaturalInputLeftState = number | undefined | 'INIT';
function defaultNaturalInputLeftState(): NaturalInputLeftState {
  return 'INIT';
}

class NaturalInputLeft<State> extends Component<State, NaturalInputLeftState> {
  readonly onUpdate: Action<State>;
  readonly inputFieldId: string;

  constructor(
    getterSetter: StateGetterSetter<State, NaturalInputLeftState>,
    onUpdate: Action<State>,
    inputFieldId: string,
  ) {
    super(getterSetter);
    this.onUpdate = onUpdate;
    this.inputFieldId = inputFieldId;
  }

  readonly update: Action<State, Event> = (state, event) => {
    const input = (event.target as HTMLInputElement).value;
    const reg = /_*\-*\.*,*\s*/g;
    const prunedInput = input.replace(reg, '');
    const valid = prunedInput !== '';
    const newState = valid ? Number.parseInt(prunedInput, 10) : undefined;
    return this.onUpdate(this.set(state, newState), undefined);
  };

  render(state: NaturalInputLeftState): VNode<State> {
    const valid = state !== undefined;
    return h(
      'div',
      {
        class: `field border left-round max ${valid && 'invalid'}`,
      },
      [
        h('input', {
          type: 'number',
          oninput: this.update,
          value: valid ? state : '',
          id: this.inputFieldId,
        }),
        state !== undefined
          ? h('span', { class: 'helper' }, text('Which n-th fibonacci?'))
          : h('span', { class: 'error' }, text('Not an natural number!')),
      ],
    );
  }
}

type GoCancelButtonRightState = {
  cancel: boolean;
  disabled: boolean;
};
function defaultGoCancelButtonRightState(): GoCancelButtonRightState {
  return {
    cancel: false,
    disabled: false,
  };
}

class GoCancelButtonRight<State> extends Component<
  State,
  GoCancelButtonRightState
> {
  private readonly onGoAction: Action<State, Event>;
  private readonly onCancelAction: Action<State, Event>;

  private wrapEventActionAndSetCancel(
    action: Action<State, Event>,
    cancel: boolean,
  ): Action<State, Event> {
    return (state, event) => [
      state,
      [
        (dispatch, event) => {
          dispatch([action, event]);
        },
        event,
      ],
      (dispatch) => {
        dispatch([this.setCancel, cancel]);
      },
    ];
  }

  constructor(
    getterSetter: StateGetterSetter<State, GoCancelButtonRightState>,
    onGoAction: Action<State, Event>,
    onCancelAction: Action<State, Event>,
  ) {
    super(getterSetter);
    this.onGoAction = this.wrapEventActionAndSetCancel(onGoAction, true);
    this.onCancelAction = this.wrapEventActionAndSetCancel(
      onCancelAction,
      false,
    );
  }

  render(state: GoCancelButtonRightState): VNode<State> {
    return h(
      'button',
      {
        class: `border right-round large ${state ? 'error-text' : 'fill'}`,
        onclick: state ? this.onCancelAction : this.onGoAction,
      },
      state ? text('Cancel') : text('Go'),
    );
  }

  public readonly setCancel: Action<State, boolean> = (state, cancel) => {
    return this.set(state, { ...this.get(state), cancel: cancel });
  };
}

export interface NumberInputWithSelectorGoAndCancelButtonState<Member> {
  naturalInputState: NaturalInputLeftState;
  quadraticSelectorState: Member;
  goCancelButtonState: GoCancelButtonRightState;
}
export function defaultNumberInputWithSelectorGoAndCancelButtonState<Member>(
  defaultSelected: Member,
): NumberInputWithSelectorGoAndCancelButtonState<Member> {
  return {
    naturalInputState: defaultNaturalInputLeftState(),
    quadraticSelectorState: defaultSelected,
    goCancelButtonState: defaultGoCancelButtonRightState(),
  };
}
export class NumberInputWithSelectorGoAndCancelButton<
  State,
  Member,
> extends Component<
  State,
  NumberInputWithSelectorGoAndCancelButtonState<Member>
> {
  private readonly naturalInput: NaturalInputLeft<State>;
  private readonly quadraticSelector: QuadraticSelection<State, Member>;
  private readonly goCancelButton: GoCancelButtonRight<State>;
  private readonly inputFieldId: string;
  private readonly onGoButtonWithInputNumber: Action<State, Event>;
  private readonly onCancel: Action<State>;

  constructor(
    getterSetter: StateGetterSetter<
      State,
      NumberInputWithSelectorGoAndCancelButtonState<Member>
    >,
    selection: ObjectEnum<Member>,
    onGoAction: Action<State, number>,
    onCancelAction: Action<State>,
  ) {
    super(getterSetter);

    const naturalInputGetterSetter: StateGetterSetter<
      State,
      NaturalInputLeftState
    > = {
      getter: (state) => this.get(state).naturalInputState,
      setter: (state, newInput) =>
        this.set(state, {
          ...this.get(state),
          naturalInputState: newInput,
        }),
    };
    const disableGoButtonIfInputInvalid: Action<State> = (state) => {
      if (this.get(state).goCancelButtonState.cancel) {
        return state;
      }
      return this.set(state, {
        ...this.get(state),
        goCancelButtonState: {
          cancel: false,
          disabled: !this.get(state).naturalInputState,
        },
      });
    };
    this.inputFieldId = window.crypto.randomUUID();
    this.naturalInput = new NaturalInputLeft(
      naturalInputGetterSetter,
      disableGoButtonIfInputInvalid,
      this.inputFieldId,
    );

    const selectionGetterSetter: StateGetterSetter<State, Member> = {
      getter: (state) => this.get(state).quadraticSelectorState,
      setter: (state, newInput) =>
        this.set(state, {
          ...this.get(state),
          quadraticSelectorState: newInput,
        }),
    };
    this.quadraticSelector = new QuadraticSelection(
      selectionGetterSetter,
      selection,
    );

    const goCancelButtonGetterSetter: StateGetterSetter<
      State,
      GoCancelButtonRightState
    > = {
      getter: (state) => this.get(state).goCancelButtonState,
      setter: (state, newInput) =>
        this.set(state, {
          ...this.get(state),
          goCancelButtonState: newInput,
        }),
    };
    this.onGoButtonWithInputNumber = (state, _event) => [
      onGoAction,
      this.get(state).naturalInputState,
    ];
    this.onCancel = onCancelAction;
    this.goCancelButton = new GoCancelButtonRight(
      goCancelButtonGetterSetter,
      this.onGoButtonWithInputNumber,
      (_state, _event) => onCancelAction,
    );
  }

  render(
    state: NumberInputWithSelectorGoAndCancelButtonState<Member>,
  ): VNode<State> {
    return h('nav', { class: 'no-space' }, [
      this.naturalInput.render(state.naturalInputState),
      this.quadraticSelector.render(state.quadraticSelectorState),
      this.goCancelButton.render(state.goCancelButtonState),
    ]);
  }

  subscribers(): Subscription<State>[] {
    return [
      [
        (dispatch: Dispatch<State>) => {
          const handler = (ev: KeyboardEvent) => {
            const focusedInput =
              document.getElementById(this.inputFieldId) ?? true;
            if (ev.key === 'Enter' && focusedInput) {
              dispatch((state) =>
                this.get(state).goCancelButtonState.disabled
                  ? state
                  : this.onGoButtonWithInputNumber,
              );
            }
          };
          addEventListener('keydown', handler);
          return () => removeEventListener('keydown', handler);
        },
        undefined,
      ],
      [
        (dispatch: Dispatch<State>) => {
          const handler = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
              dispatch(this.onCancel);
            }
          };
          addEventListener('keydown', handler);
          return () => removeEventListener('keydown', handler);
        },
        undefined,
      ],
    ];
  }

  init() {
    return () => {
      requestAnimationFrame(() => {
        document.getElementById(this.inputFieldId)?.focus();
      });
    };
  }
}
