const webpack = require('webpack');

const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'Angular + Webpack starter kit',
  baseUrl: '/'
};

const vendors = [
  'angular',
  'angular-ui-router',
];


module.exports = {
  metadata: METADATA,
  entry: {
    app: './src/app',
    vendor: vendors,
  },

  resolve: {
    extensions: ['', '.js'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules'],


  },

  module: {
    noParse: [
      /angular\/angular.js/
    ],
    loaders: [
      {
        test: /\.jade$/,
        loader: 'jade',
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel?presets=es2015',
        exclude: [/\/node_modules\//, /\.(spec|e2e)\.js$/]
      }
    ]

  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'].reverse()
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.jade',
      chunksSortMode: 'dependency'
    })

  ],

};