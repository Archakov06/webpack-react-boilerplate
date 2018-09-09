const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
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
          'style-loader',
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
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  devServer: {
    publicPath: '/public',
    port: 3333,
    contentBase: path.resolve(__dirname, './public'),
    host: 'localhost',
    stats: 'minimal',
    historyApiFallback: true,
    noInfo: false,
    hot: true,
  },
};
