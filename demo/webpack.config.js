const path = require('path');
const dev = process.env.NODE_ENV === 'development';

const entry = dev 
  ? {
    demo : './App.js'
  }
  : {
    'docs/demo' : './App.js',
    'src/blackout.min' : '../src/blackout.js'
  };

const outputPath = dev ? '../docs/' : '../';

const config = {
  devtool: 'inline-source-map',
  entry: entry,
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js'
  },
  devServer: {
    port: 5000,
    contentBase: path.resolve(__dirname, '../docs/'),
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
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