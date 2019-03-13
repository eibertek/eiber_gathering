const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src', 'index'),
  context: path.resolve(__dirname, '../src'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
    // {
    //   test: /.jsx?$/,
    //   include: [
    //     path.resolve(__dirname, '../src')
    //   ],
    //   exclude: [
    //     path.resolve(__dirname, 'node_modules'),
    //     path.resolve(__dirname, 'bower_components')
    //   ],
    //   loader: 'babel-loader',
    //   query: {
    //     presets: ['env', 'react']        
    //   }      
    // },
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' }
    ])
  ],  
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};