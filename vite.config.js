import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(
  {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname,'src')
        }
      ],
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue'
      ]
    },
    plugins: [
      vue(),
    ],
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      lib: {
        entry: './src/index.js',
        name: 'vue-uploader.js'
      }
    },
    define: {
      __VERSION__: '"0.7.6"',
      'process.env': {
        NODE_ENV: '"development"'
      }
    },
    server: {
      port: 3001
    }
  }
)
