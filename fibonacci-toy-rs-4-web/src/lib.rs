/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

mod utils;
use utils::set_panic_hook;

use num_bigint::{BigUint, ToBigUint};
use std::mem::replace;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {}

#[wasm_bindgen]
pub fn fibonacci_linear(n: u32) -> String {
    #[cfg(debug_assertions)]
    set_panic_hook();

    let mut a: BigUint = 1.to_biguint().unwrap();
    let mut b: BigUint = 1.to_biguint().unwrap();

    for _ in 2..n {
        let c = a + &b;
        a = replace(&mut b, c)
    }

    return format!("{}", b);
}
