const path = require('path');
console.log(path.resolve(__dirname));
const config = {
  entry: {
    demo: './App.js',
    blackout: './blackout.js' 
  },
  output: {
    path: path.resolve(__dirname.replace('demo',''), 'docs'),
    filename: '[name].js'
  },
  devServer: {
    port: 5000,
    contentBase: '../docs',
    inline: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ["@babel/preset-env","@babel/preset-react"]
      }
    },
    {
      test: /\.s?css$/,
      loader: ['style-loader','css-loader','sass-loader']
    }
   ]
 },
 node: {
    fs: 'empty',
  }
};

module.exports = config;
