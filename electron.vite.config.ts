import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import VueRouter from 'vue-router/vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  main: {
    input: resolve('src/main/index.ts'),
  },
  preload: {
    input: resolve('src/preload/index.ts'),
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [
      VueRouter({
        routesFolder: [
          {
            src: 'src/renderer/src/views',
          },
        ],
        dts: 'src/renderer/typed-router.d.ts',
      }),
      Vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.startsWith('mdui-'),
          },
        },
      }),
    ],
  },
});
