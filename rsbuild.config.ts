import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  html: {
    title: 'Fibonacci Toy Website',
  },
  plugins: [pluginCssMinimizer()],
  tools: {
    lightningcssLoader: false,
  },
  output: {
    assetPrefix: '/fibonacci-toy-website/',
  },
});
