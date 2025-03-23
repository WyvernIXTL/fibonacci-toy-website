<div align="center">

# `fibonacci-toy-website`

**Calculate fibonacci numbers, fast, on the web!**

</div>

[![Screenshot](./images/screenshot_v1-0-0-fs8.png)](https://fibrs.pages.dev/)

## Building

### Prerequisites

* [Rust](https://www.rust-lang.org/tools/install)
* [`wasm32-unknown-unknown`](https://doc.rust-lang.org/nightly/rustc/platform-support/wasm32-unknown-unknown.html)  
  Installable via `rustup`: `rustup target add wasm32-unknown-unknown`
* [`npm`](https://nodejs.org/en)
* [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/)  
  Installable via `npm`: `npm install -g wasm-pack`  
  Installable via `cargo`: `cargo install wasm-pack`

### Change

If you wish to deploy this webpage for yourself you'll likely need to change `assetPrefix` in [`./rsbuild.config.ts`](./rsbuild.config.ts).
See [rsbuild docs](https://rsbuild.dev/guide/basic/static-deploy) for more.

### Build

```
cd ./fibonacci-toy-rs-4-web
wasm-pack build --release
cd ..
npm ci
npm run build
```
