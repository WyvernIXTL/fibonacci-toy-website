/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import van from 'vanjs-core/debug';
const { button, div, span, i, textarea } = van.tags;

export const TextAreaOutput = (props: { value: string; helper?: string }) => {
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
