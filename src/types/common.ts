/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * Abstraction to help with setter and getter for accessing structured states.
 */
export interface StateGetterSetter<T, L> {
  /**
   * A getter takes a state and returns parts of it.
   *
   * @param appState A higher state.
   * @returns A lower state that is withing the higher state.
   */
  getter: (appState: T) => L;

  /**
   * A setter takes a state ({@link appState}), copies it, modifies parts of the copy with {@link value} and then returns the copy.
   *
   * It is important that the input object is not the output object!
   * Hyperapp will not register a change of state if the objects match.
   *
   * @param appState A higher state that holds the state we wish to replace.
   * @param value The new state that is within {@link appState}.
   * @returns New higher state.
   */
  setter: (appState: T, value: L) => T;
}
