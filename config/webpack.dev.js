const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
});

module.exports = webpackMerge(commonConfig, {

  metadata: METADATA,

  debug: true,
  devtool: 'cheap-module-source-map',

  output: {

    path: helpers.root('public'),

    filename: '[name].bundle.js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id].chunk.js'

  },

  plugins: [
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    })
  ],
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('public')
  }
});