const pkg = require('../package');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode:'development',
  target: 'web',
  context: path.join(__dirname, '../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './spec/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'spec.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json','.tsx','.ts'],
    modules: ['node_modules'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    },{
      test: /\.css$/,
      include: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      })
    }, {
      test: /\.css$/,
      include: [
        path.join(__dirname, '../components'),
        path.join(__dirname, '../spec')
      ],
      use: ['style-loader', {
        loader: 'css-loader',
        query: {
          import: false,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          modules: true,
          sourceMap: true
        },
      }, {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.join(__dirname, './postcss.config.js')
          }
        }
      }]
    }]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'spec.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
