/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import van from 'vanjs-core';
const { span, nav, footer, a, i } = van.tags;

export const Footer = () =>
  footer(
    {
      class:
        'footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10',
    },
    nav(
      { class: 'grid grid-flow-col gap-4' },
      a(
        {
          href: 'https://github.com/WyvernIXTL/fibonacci-toy-website/',
          class: 'link link-hover',
        },
        i({ class: 'small-padding' }, 'gite'),
        span('Source'),
      ),
      a(
        {
          href: './WEBSITE-LICENSES.txt',
          class: 'link link-hover',
        },
        i({ class: 'small-padding' }, 'license'),
        span('Licenses'),
      ),
    ),
  );
