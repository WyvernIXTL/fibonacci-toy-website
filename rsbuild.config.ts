import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  html: {
    template: './src/index.html',
    title: 'Fibonacci Toy Website',
    inject: 'body',
    meta: {
      description: 'Calculate fibonacci numbers, fast, on the web!',
    },
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
    inlineScripts: true,
    inlineStyles: true,
  },
});
