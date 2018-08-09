const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';
const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
}

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: path.resolve(paths.src, 'main.tsx'),
  devtool: prod ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    // alias: {
    //   'react': 'inferno',
    //   'react-dom': 'inferno'
    // }
  },
  output: {
    path: paths.dist
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(paths.src, 'index.ejs')
  //   })
  // ]
};
