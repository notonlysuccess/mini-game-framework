var path = require('path');
var webpack = require('webpack');
var glob = require('glob')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'game': path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  resolve: {
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../src/game'),
      path.join(__dirname, '../vendor'),
      path.join(__dirname, '../node_modules')
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join(__dirname, '../game.json'), to: path.join(__dirname, '../dist/')},
      {from: path.join(__dirname, '../assets/**/*'), to: path.join(__dirname, '../dist/')}
    ])
  ]
};
