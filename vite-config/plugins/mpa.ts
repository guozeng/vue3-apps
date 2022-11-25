import { createMpaPlugin } from 'vite-plugin-virtual-mpa'

export default () =>
  createMpaPlugin({
    pages: [
      {
        name: 'pc-main',
        /**
         * filename is optional, default is `${name}.html`, which is the relative path of `build.outDir`.
         */
        filename: 'index.html', // output into sites/fruits/apple.html at build time.
        entry: '/apps/pc-main/index.ts',
        data: {
          title: 'This is pc-main page',
        },
      },
      {
        name: 'h5-main',
        /**
         * filename is optional, default is `${name}.html`, which is the relative path of `build.outDir`.
         */
        filename: 'h5.html', // output into sites/fruits/apple.html at build time.
        entry: '/apps/h5-main/index.ts',
        data: {
          title: 'This is h5-main page',
        },
      },
    ],
  })
