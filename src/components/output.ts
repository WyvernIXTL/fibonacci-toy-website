/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import van from 'vanjs-core/debug';
const { button, div, span, i, textarea, progress } = van.tags;

const TextAreaOutput = (props: { value: string; helper?: string }) => {
  const copied = van.state(false);

  return div(
    div(
      { class: 'field textarea round border extra' },
      textarea(
        { readOnly: true, style: 'word-break: break-all;' },
        props.value,
      ),
      props.helper && span({ class: 'helper' }, props.helper),
    ),
    div(
      { class: 'right-align' },
      button(
        {
          class: 'circle slow-ripple',
          onclick: () => {
            navigator.clipboard?.writeText(props.value);
            copied.val = true;
          },
        },
        i(() => (copied.val ? 'check' : 'content_copy')),
      ),
    ),
  );
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
  result: string;
  n: number;
  calculatedInMs: number;
}) => {
  let label = `${props.n}th number in fibonacci sequence`;
  const roundedDuration = Math.round(props.calculatedInMs);
  if (roundedDuration > 0) {
    label += `, calculated in ${timeStringFromMs(roundedDuration)}`;
  }

  return TextAreaOutput({ value: props.result, helper: label });
};

export const Spinner = () =>
  div(
    { class: 'center-align' },
    div({ class: 'large-space' }),
    progress({ class: 'large circle' }),
  );
