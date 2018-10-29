const config = {
  entry: {
    'docs/demo': './App.js',
    'src/blackout.min': '../src/blackout.js'
  },
  output: {
    path: __dirname.replace('demo',''),
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
