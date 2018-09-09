const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    runtimeChunk: { name: 'vendor' },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /\.jsx?$/,
          chunks: 'all',
          minChunks: 2,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { compact: false },
      },
      {
        test: /\.(pcss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')({
                  addModulesDirectories: [path.resolve(__dirname, '../src/styles'), 'node_modules'],
                }),
                require('autoprefixer'),
                require('postcss-nested')(),
                require('postcss-cssnext')({
                  warnForDuplicates: false,
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['public/dist'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
    }),
  ],
};
