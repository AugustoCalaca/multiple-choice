import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

import { GRAPHQL_PORT } from './src/common/config';

export default defineConfig({
  server: {
    port: GRAPHQL_PORT,
    hmr: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'koa',
      appPath: './src/index.ts',
      tsCompiler: 'swc',
    }),
  ],
});
