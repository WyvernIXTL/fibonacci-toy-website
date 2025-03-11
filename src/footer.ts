/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type VNode, h, text } from 'hyperapp';
import type { AppState } from '.';

export function Footer(): VNode<AppState> {
  return h(
    'footer',
    { class: 'fixed' },
    h('nav', { class: 'center-align' }, [
      h('a', { href: 'https://github.com/WyvernIXTL/fibonacci-toy-website/' }, [
        h('i', { class: 'small-padding' }, text('gite')),
        h('span', { class: '' }, text('Source')),
      ]),
      h('span', { class: '' }, text('-')),
      h(
        'a',
        {
          href: 'https://media.githubusercontent.com/media/WyvernIXTL/fibonacci-toy-website/refs/heads/master/other/WEBSITE-LICENSES.txt',
        },
        [
          h('i', { class: 'small-padding' }, text('license')),
          h('span', { class: '' }, text('Licenses')),
        ],
      ),
    ]),
  );
}
