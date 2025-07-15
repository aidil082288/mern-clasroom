const path = require('path');
const webpack = require('webpack');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: 'browser',
  mode: 'development', // ✅ Tambahkan ini agar warning hilang
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(CURRENT_WORKING_DIR, 'client/main.js'),
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
    assetModuleFilename: 'assets/[hash][ext][query]', // default path untuk asset/resource
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/, // 🔥 Fix untuk masalah strict ESM
        resolve: {
          fullySpecified: false, // ⛔️ Izinkan import tanpa ekstensi .js
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx'], // ⏩ Mempermudah import modul tanpa ekstensi
  },
};

module.exports = config;