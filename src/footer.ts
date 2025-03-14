/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type VNode, h, text } from 'hyperapp';
import type { AppState } from './index.ts';

export function Footer(): VNode<AppState> {
  return h(
    'footer',
    { class: 'fixed' },
    h('nav', { class: 'center-align' }, [
      h(
        'a',
        {
          href: 'https://github.com/WyvernIXTL/fibonacci-toy-website/',
        },
        [
          h('i', { class: 'small-padding' }, text('gite')),
          h('span', {}, text('Source')),
        ],
      ),
      h(
        'a',
        {
          href: './WEBSITE-LICENSES.txt',
        },
        [
          h('i', { class: 'small-padding' }, text('license')),
          h('span', {}, text('Licenses')),
        ],
      ),
    ]),
  );
}
