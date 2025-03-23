/*
 * Copyright 2025 Adam McKellar <dev@mckellar.eu>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import van, { type State } from 'vanjs-core';
const { button, div, i, textarea, progress, fieldset, label } = van.tags;

const TextAreaOutput = (props: {
  value: State<string>;
  helper: State<string | undefined>;
}) => {
  const copied = van.state(false);
  van.derive(() => {
    props.value.val;
    copied.val = false;
  });

  return [
    fieldset(
      {
        class: 'max',
      },
      textarea(
        {
          readOnly: true,
          disabled: true,
          class: 'left-rounded right-rounded max hard-wrap',
        },
        () => props.value.val,
      ),
      label({ class: 'helper' }, props.helper),
    ),
    div(
      { class: 'right-align' },
      button(
        {
          class: 'circle slow-ripple',
          onclick: () => {
            navigator.clipboard?.writeText(props.value.val);
            copied.val = true;
          },
        },
        i(() => (copied.val ? 'check' : 'content_copy')),
      ),
    ),
  ];
};

function timeStringFromMs(ms: number): string {
  const msRounded = Math.round(ms);
  const totalSeconds = Math.floor(msRounded / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = msRounded % 1000;

  return (
    (hours ? `${hours}h ` : '') +
    (minutes ? `${minutes}min ` : '') +
    (seconds ? `${seconds}s ` : '') +
    (milliseconds ? `${milliseconds}ms` : '')
  );
}

export const FibonacciNumberOutput = (props: {
  result: State<string>;
  n: State<number>;
  calculatedInMs: State<number>;
}) => {
  const label = van.derive(() => {
    let label = `${props.n.val}th number in fibonacci sequence`;
    const roundedDuration = Math.round(props.calculatedInMs.val);
    if (roundedDuration > 0) {
      label += `, calculated in ${timeStringFromMs(roundedDuration)}`;
    }
    return label;
  });

  return TextAreaOutput({ value: props.result, helper: label });
};

export const Spinner = () =>
  div(
    { class: 'center-align' },
    div({ class: 'large-space' }),
    progress({ class: 'large circle' }),
  );
