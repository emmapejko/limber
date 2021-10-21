const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'client/src');
const DIST_DIR = path.resolve(__dirname, 'client/dist');

module.exports = {
  devtool: 'eval-source-map',
  stats: {
    excludeModules: /node_modules/,
  },
  entry: {
    app: ['regenerator-runtime/runtime.js', path.resolve(SRC_DIR, 'index.jsx')],
  },
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};
