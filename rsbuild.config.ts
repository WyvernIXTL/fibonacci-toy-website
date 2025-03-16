import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  html: {
    title: 'Fibonacci Toy Website',
    inject: 'body',
  },
  plugins: [
    pluginCssMinimizer({
      pluginOptions: {
        minimizerOptions: {
          preset: require.resolve('cssnano-preset-advanced'),
        },
      },
    }),
  ],
  tools: {
    lightningcssLoader: false,
  },
  output: {
    assetPrefix: '/fibonacci-toy-website/',
    inlineScripts: true,
    inlineStyles: true,
  },
});
