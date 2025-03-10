import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

export default defineConfig({
  plugins: [pluginCssMinimizer()],
  tools: {
    lightningcssLoader: false,
  },
});
