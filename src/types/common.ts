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

/**
 * Component that is directly rendered from app state.
 */
export abstract class StatelessComponent<AppState> {
  /**
   * Render component with app state.
   *
   * @param state State of app.
   * @returns Rendered component.
   */
  abstract view(state: AppState): VNode<AppState>;
}

/**
 * Component that has it's own state.
 *
 * The state is stored in app state and can be accessed via the app state
 * and this components getter and setter.
 */
export abstract class Component<
  AppState,
  SubState,
> extends StatelessComponent<AppState> {
  protected readonly set: Setter<AppState, SubState>;
  protected readonly get: Getter<AppState, SubState>;

  constructor(stateGetterSetter: StateGetterSetter<AppState, SubState>) {
    super();
    this.get = stateGetterSetter.getter;
    this.set = stateGetterSetter.setter;
  }

  /**
   * Renders the component via its state.
   *
   * @param state State of this component.
   */
  abstract render(state: SubState): VNode<AppState>;

  public view(state: AppState): VNode<AppState> {
    return this.render(this.get(state));
  }

  /**
   * Returns a default state for the component.
   */
  abstract defaultState(): SubState;

  /**
   * Returns sub state of app state.
   *
   * @param state App state
   * @returns Sub state of said app state.
   */
  public state(state: AppState): SubState {
    return this.get(state);
  }
}

/**
 * Component that holds one other component
 * and acts as derivation function for its state to its sub components state.
 */
export abstract class StateTransformer<
  AppState,
  Source extends { target: Target },
  Target,
> extends Component<AppState, Source> {
  public readonly subComponent: Component<AppState, Target>;
  public readonly transform: (state: Source) => Source;

  constructor(
    getterSetter: StateGetterSetter<AppState, Source>,
    subComponentConstructor: (
      getterSetter: StateGetterSetter<AppState, Target>,
    ) => Component<AppState, Target>,
    transform: (state: Source) => Source,
  ) {
    super(getterSetter);
    this.transform = transform;
    const subComponentGetterSetter: StateGetterSetter<AppState, Target> = {
      getter: (state) => this.transform(this.get(state)).target,
      setter: (state) => this.set(state, this.transform(this.get(state))),
    };
    this.subComponent = subComponentConstructor(subComponentGetterSetter);
  }

  public render(state: Source): VNode<AppState> {
    return this.subComponent.render(this.transform(state).target);
  }
}

/**
 * Abstraction layer around const object being abused as enums.
 */
export interface ObjectEnum<Member> {
  members: Member[];
  isMember: (value: unknown) => value is Member;
}
