/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'beercss';
import 'material-dynamic-colors';
import van from 'vanjs-core/debug';
const { button, div, pre, h1, main } = van.tags;

van.add(document.body, main({ class: 'responsive' }, h1('Hello World')));
