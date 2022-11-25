import VitePluginCertificate from 'vite-plugin-mkcert'

export default () =>
  VitePluginCertificate({
    source: 'coding',
  })
