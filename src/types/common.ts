/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { VNode } from 'hyperapp';

/**
 * A getter takes a state and returns parts of it.
 *
 * @param state A higher state.
 * @returns A lower state that is withing the higher state.
 */
export type Getter<State, SubState> = (state: State) => SubState;

/**
 * A setter takes a state ({@link state}), copies it, modifies parts of the copy with {@link newSubState} and then returns the copy.
 *
 * It is important that the input object is not the output object!
 * Hyperapp will not register a change of state if the objects match.
 *
 * @param state A higher state that holds the state we wish to replace.
 * @param newSubState The new state that is within {@link state}.
 * @returns New higher state.
 */
export type Setter<State, SubState> = (
  state: State,
  newSubState: SubState,
) => State;

/**
 * Abstraction to help with setter and getter for accessing structured states.
 */
export interface StateGetterSetter<State, SubState> {
  getter: Getter<State, SubState>;
  setter: Setter<State, SubState>;
}

export abstract class Component<State, SubState> {
  protected readonly set: Setter<State, SubState>;
  protected readonly get: Getter<State, SubState>;

  constructor(stateGetterSetter: StateGetterSetter<State, SubState>) {
    this.get = stateGetterSetter.getter;
    this.set = stateGetterSetter.setter;
  }

  /**
   * Renders the component via its state.
   *
   * @param state State of this component.
   */
  abstract render(state: SubState): VNode<State>;

  /**
   * Render component with app state.
   *
   * @param state State of app.
   * @returns Rendered component.
   */
  public view(state: State): VNode<State> {
    return this.render(this.get(state));
  }

  /**
   * Returns sub state of app state.
   *
   * @param state App state
   * @returns Sub state of said app state.
   */
  public state(state: State): SubState {
    return this.get(state);
  }
}

/**
 * Abstraction layer around const object being abused as enums.
 */
export interface ObjectEnum<Member> {
  members: Member[];
  isMember: (value: unknown) => value is Member;
}
