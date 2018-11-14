const path = require('path');
const dev = process.env.NODE_ENV === 'development';
const entry = dev ?
  {
    demo : './App.js'
  } :
  {
    'docs/demo' : './demo/App.js',
    'lib/blackout.min' : './src/blackout.js',
  };

const outputPath = dev ? 'docs' : './';

const config = {
  devtool: dev ? 'inline-source-map' : undefined,
  entry: entry,
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js'
  },

  devServer: {
    port: 5000,
    contentBase: path.resolve(__dirname, 'docs'),
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    hints: false
  }
};

module.exports = config;