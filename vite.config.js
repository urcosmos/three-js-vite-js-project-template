import {
  defineConfig
} from 'vite';
import {
  ViteAliases
} from 'vite-aliases';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // resolve: {
  // alias: {
  //   '@': path.resolve(__dirname, './src')
  // }
  // },
  plugins: [
    ViteAliases(),
    legacy({
      targets: ['defaults', 'IE >= 11']
    })
  ],
  mode: 'production',
  base: './',
  build: {
    // cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          if (/woff|woff2|ttf|eot|otf/i.test(extType)) {
            extType = 'css';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      },
    },
    // target: 'es2017',
    // outDir: 'build'
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: true
  },
});