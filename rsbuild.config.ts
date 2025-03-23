import { defineConfig } from '@rsbuild/core';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  html: {
    template: './src/index.html',
    title: 'Fibonacci Toy Website',
    // inject: 'body',
    meta: {
      description: 'Calculate fibonacci numbers, fast, on the web!',
    },
  },
  plugins: [],
  tools: {
    lightningcssLoader: true,
  },
  output: {
    // inlineScripts: true,
    // inlineStyles: true,
  },
});
