import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';

export default {
  entry: './index.js',  // your entry point
  output: {
    filename: 'bundle.js',  // output file name
    path: path.resolve('dist')  // output directory
  },
  resolve: {
    extensions: ['.ts', '.js']  // resolve .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // transpile TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',  // if it's a Node.js backend project
  externals: [webpackNodeExternals()],  // exclude node_modules from bundling
};
