/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import van from 'vanjs-core/debug';
const { span, nav, footer, a, i } = van.tags;

export const Footer = () =>
  footer(
    { class: 'fixed' },
    nav(
      { class: 'center-align' },
      a(
        {
          href: 'https://github.com/WyvernIXTL/fibonacci-toy-website/',
        },
        i({ class: 'small-padding' }, 'gite'),
        span('Source'),
      ),
      a(
        {
          href: './WEBSITE-LICENSES.txt',
        },
        i({ class: 'small-padding' }, 'license'),
        span('Licenses'),
      ),
    ),
  );
