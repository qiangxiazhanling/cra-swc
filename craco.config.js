const path = require('path')
const proxy = require('./proxy.config')
const CracoSwcPlugin = require('craco-swc')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const smp = new (require('speed-measure-webpack-plugin'))()

module.exports = {
  devServer: {
    proxy
  },
  plugins: [
    {
      plugin: CracoSwcPlugin,
      options: {
        mode: 'usage',
        coreJs: 3,
        path: path.resolve(__dirname),
      }
    }
  ],
  webpack: smp.wrap({
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true,
          implementation: require('esbuild')
        })
      ]
      return webpackConfig
    }
  })
};
