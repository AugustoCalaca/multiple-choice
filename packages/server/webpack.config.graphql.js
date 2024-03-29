const path = require('path');

const webpack = require('webpack');

const WebpackNodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    server: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'graphql.js',
  },
  watch: true,
  target: 'node',
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      whitelist: [/@multiple-choice/],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
          loader: 'swc-loader',
        },
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'graphql.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
