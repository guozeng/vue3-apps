export default function () {
  return {
    minify: true,
    pages: [
      {
        entry: 'src/pc-main/index.js',
        filename: 'index.html',
        template: 'templates/index.html',
        inject: {
          data: {
            title: '加载中...',
            injectScript: `<script src="https://xgj-files.oss-cn-hangzhou.aliyuncs.com/uploads/xgjzt/sdk/1.0.4/xgjzt.umd.min.js"></script>`,
          },
        },
      },
    ],
  }
}
