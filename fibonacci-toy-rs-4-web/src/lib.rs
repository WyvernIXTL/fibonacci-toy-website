/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

use std::mem::swap;

use wasm_bindgen::prelude::*;

use malachite::Natural;

mod utils;
use utils::set_panic_hook;

#[wasm_bindgen]
extern "C" {}

#[wasm_bindgen]
pub fn fibonacci_linear(n: u32) -> String {
    #[cfg(debug_assertions)]
    set_panic_hook();

    let mut a = Natural::from(1u32);
    let mut b = Natural::from(1u32);

    for _ in 2..n {
        a += &b;
        swap(&mut a, &mut b);
    }

    return format!("{}", b);
}
