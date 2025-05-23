//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::{wasm_bindgen_test, wasm_bindgen_test_configure};

use fibonacci_toy_rs_4_web::fibonacci_linear;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_fibonacci_linear() {
    assert!(fibonacci_linear(0) == "0");
    assert!(fibonacci_linear(1) == "1");
    assert!(fibonacci_linear(2) == "1");
    assert!(fibonacci_linear(3) == "2");
    assert!(fibonacci_linear(4) == "3");
    assert!(fibonacci_linear(5) == "5");
    assert!(fibonacci_linear(6) == "8");
    assert!(fibonacci_linear(30) == "832040");
}
