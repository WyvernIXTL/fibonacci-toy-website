import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

export default defineConfig({
  html: {
    title: 'Fibonacci Toy Website',
  },
  plugins: [pluginCssMinimizer()],
  tools: {
    lightningcssLoader: false,
  },
  output: {
    assetPrefix: './static/',
  },
});
